DROP VIEW IF EXISTS clients;
DROP VIEW IF EXISTS customers;
CREATE OR REPLACE VIEW customers AS WITH t AS (
        SELECT DISTINCT cards.customer_id AS Customer_ID,
            COUNT(transactions.transaction_datetime) OVER (PARTITION BY Customer_ID) Customer_Visit_Count,
            AVG(transactions.transaction_summ) OVER (PARTITION BY Customer_ID) Customer_Average_Check,
            interval_to_days(
                NOW() - MAX(transactions.transaction_datetime) OVER (PARTITION BY Customer_ID)
            ) AS Period_since_last_transaction,
            interval_to_days(
                (
                    MAX(transactions.transaction_datetime) OVER (PARTITION BY Customer_ID)
                ) - (
                    MIN(transactions.transaction_datetime) OVER (PARTITION BY Customer_ID)
                )
            ) Period_between_transactions
        FROM cards
            JOIN transactions USING (customer_card_id)
        ORDER BY customer_id
    ),
    stores_by_customer AS (
        SELECT DISTINCT customer_id,
            CASE
                WHEN tr_1 = tr_2
                AND tr_1 = tr_3 THEN tr_1
                ELSE NTH_VALUE(transaction_store_id, 1) OVER (
                    PARTITION BY customer_id
                    ORDER BY tr_1_date DESC
                )
            END AS Customer_Primary_Store
        FROM (
                SELECT DISTINCT COUNT(transaction_id) OVER (PARTITION BY customer_id, transaction_store_id) as Count_by_store,
                    cards.customer_id,
                    transactions.transaction_store_id,
                    COUNT(transaction_id) OVER (PARTITION BY customer_id, transaction_store_id) * 10000 / COUNT(transaction_id) OVER (PARTITION BY customer_id) AS Share_by_store,
                    NTH_VALUE(transaction_store_id, 1) OVER (
                        PARTITION BY customer_id
                        ORDER BY transaction_datetime DESC RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
                    ) AS tr_1,
                    NTH_VALUE(transaction_store_id, 2) OVER (
                        PARTITION BY customer_id
                        ORDER BY transaction_datetime DESC RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
                    ) AS tr_2,
                    NTH_VALUE(transaction_store_id, 3) OVER (
                        PARTITION BY customer_id
                        ORDER BY transaction_datetime DESC RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
                    ) AS tr_3,
                    NTH_VALUE(transaction_datetime, 1) OVER (
                        PARTITION BY customer_id,
                        transaction_store_id
                        ORDER BY transaction_datetime DESC RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
                    ) AS tr_1_date
                FROM cards
                    JOIN transactions USING (customer_card_id)
                ORDER BY customer_id,
                    Share_by_store DESC,
                    tr_1_date DESC
            ) tmp
    ),
    viz_f AS (
        SELECT Customer_ID,
            Period_since_last_transaction AS pslt,
            CASE
                WHEN Customer_Visit_Count = 1 THEN 1
                ELSE Period_between_transactions / (Customer_Visit_Count -1)
            END AS Customer_Frequency
        FROM t
    ),
    churn AS (
        SELECT Customer_ID,
            pslt / Customer_Frequency AS Customer_Churn_Rate
        FROM viz_f
    ),
    dt AS (
        SELECT t.Customer_ID,
            t.Customer_Average_Check,
            Customer_Churn_Rate,
            ROW_NUMBER() OVER (
                ORDER BY t.Customer_Average_Check DESC
            ) AS Check_Rating,
            CASE
                WHEN ROW_NUMBER() OVER (
                    ORDER BY t.Customer_Average_Check DESC
                ) * 1000 / (
                    SELECT COUNT (DISTINCT Customer_ID)
                    FROM t
                ) < 100 THEN 'High'
                WHEN ROW_NUMBER() OVER (
                    ORDER BY t.Customer_Average_Check DESC
                ) * 1000 / (
                    SELECT COUNT (DISTINCT Customer_ID)
                    FROM t
                ) < 350 THEN 'Medium'
                ELSE 'Low'
            END AS Customer_Average_Check_Segment,
            CASE
                WHEN ROW_NUMBER() OVER (
                    ORDER BY viz_f.Customer_Frequency ASC
                ) * 1000 / (
                    SELECT COUNT (DISTINCT Customer_ID)
                    FROM t
                ) < 100 THEN 'High'
                WHEN ROW_NUMBER() OVER (
                    ORDER BY viz_f.Customer_Frequency ASC
                ) * 1000 / (
                    SELECT COUNT (DISTINCT Customer_ID)
                    FROM t
                ) < 350 THEN 'Medium'
                ELSE 'Low'
            END AS Customer_Frequency_Segment,
            CASE
                WHEN Customer_Churn_Rate > 5 THEN 'High'
                WHEN (
                    Customer_Churn_Rate > 2
                    AND Customer_Churn_Rate <= 5
                ) THEN 'Medium'
                ELSE 'Low'
            END AS Customer_Churn_Segment,
            Period_between_transactions,
            Period_since_last_transaction,
            Customer_Visit_Count,
            Customer_Frequency,
            Customer_Primary_Store
        FROM t
            JOIN viz_f USING (Customer_ID)
            JOIN churn USING (Customer_ID)
            JOIN stores_by_customer USING (Customer_ID)
        ORDER BY t.Customer_ID
    )
SELECT Customer_ID,
    Customer_Average_Check,
    Customer_Average_Check_Segment,
    Customer_Frequency,
    Customer_Frequency_Segment,
    Period_since_last_transaction AS Customer_Inactive_Period,
    Customer_Churn_Rate,
    Customer_Churn_Segment,
    determine_segment(
        dt.Customer_Average_Check_Segment,
        dt.Customer_Frequency_Segment,
        dt.Customer_Churn_Segment
    ) AS Customer_Segment,
    Customer_Primary_Store
FROM dt;