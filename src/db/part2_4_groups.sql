DROP VIEW IF EXISTS groups CASCADE;
CREATE OR REPLACE VIEW groups AS WITH all_data AS(
        select customer_id,
            group_id,
            transaction_datetime,
            transaction_id
        from checks
            JOIN transactions using (transaction_id)
            join cards using (customer_card_id)
            JOIN sku using (sku_id)
    ),
    prev_tr AS (
        SELECT customer_id,
            group_id,
            transaction_datetime,
            transaction_id,
            ABS(
                interval_to_days(
                    transaction_datetime - LAG(transaction_datetime) OVER (
                        PARTITION BY customer_id,
                        group_id
                        ORDER BY customer_id,
                            group_id,
                            transaction_datetime
                    )
                ) - Group_Frequency
            ) / group_frequency AS gr_transaction_deviation
        from checks
            JOIN transactions using (transaction_id)
            join cards using (customer_card_id)
            JOIN sku using (sku_id)
            JOIN periods USING (customer_id, group_id)
        ORDER BY 1,
            2,
            3
    ),
    avg_prev_tr AS (
        SELECT customer_id,
            group_id,
            AVG (gr_transaction_deviation) AS Group_Stability_Index
        FROM prev_tr
        GROUP BY customer_id,
            group_id
        ORDER BY 1,
            2
    ),
    margin_data AS (
        SELECT DISTINCT customer_id,
            group_id,
            transaction_datetime,
            transaction_id,
            sku_purchase_price * sku_amount AS sku_cost,
            sku_summ_paid,
            ROW_NUMBER() OVER (
                PARTITION BY customer_id,
                group_id
                ORDER BY transaction_datetime DESC
            ) rn,
            CASE
                WHEN sku_discount > 0 THEN 1
                ELSE 0
            END AS with_discount
        FROM checks
            JOIN transactions using (transaction_id)
            JOIN cards using (customer_card_id)
            JOIN sku using (sku_id)
            JOIN stores USING (transaction_store_id, sku_id)
        ORDER BY 1,
            2,
            3
    ),
    margin_by_group AS (
        SELECT DISTINCT customer_id,
            group_id,
            SUM (
                CASE
                    WHEN (
                        SELECT m_type
                        FROM margin_parameters
                    ) = 'default' THEN (
                        SELECT SUM(sku_summ_paid - sku_cost) OVER (PARTITION BY customer_id, group_id)
                    )
                    WHEN (
                        SELECT m_type
                        FROM margin_parameters
                    ) = 'periods' THEN (
                        SELECT SUM(sku_summ_paid - sku_cost) FILTER (
                                WHERE interval_to_days (current_date - transaction_datetime) <= (
                                        SELECT parameter
                                        FROM margin_parameters
                                    )
                            ) OVER (PARTITION BY customer_id, group_id)
                    )
                    WHEN (
                        SELECT m_type
                        FROM margin_parameters
                    ) = 'transactions' THEN (
                        SELECT SUM(sku_summ_paid - sku_cost) FILTER (
                                WHERE rn <= (
                                        SELECT parameter
                                        FROM margin_parameters
                                    )
                            ) OVER (
                                PARTITION BY customer_id,
                                group_id
                            )
                    )
                END
            ) AS Group_Margin,
            SUM (with_discount) AS count_with_discount
        FROM margin_data
        GROUP BY customer_id,
            group_id
    ),
    ct AS(
        select customer_id,
            group_id,
            count(distinct transaction_id) AS trans_in_interval
        from (
                select gr_period.customer_id,
                    gr_period.group_id,
                    all_data.transaction_id
                from (
                        select customer_id,
                            group_id,
                            min(transaction_datetime) as first_date,
                            max(transaction_datetime) as last_date
                        from all_data
                        group by 1,
                            2
                    ) as gr_period
                    join all_data on gr_period.customer_id = all_data.customer_id
                    and gr_period.first_date <= all_data.transaction_datetime
                    and gr_period.last_date >= all_data.transaction_datetime
            ) tr_period
        group by 1,
            2
    ),
    data_table AS (
        SELECT DISTINCT customer_id,
            group_id,
            Group_Margin,
            count_with_discount / group_purchase::numeric AS share_with_discount,
            MIN(Group_Min_Discount) OVER (PARTITION BY customer_id, group_id) AS Group_Minimum_Discount,
            SUM (Group_Summ) OVER (PARTITION BY customer_id, group_id) AS Total_Group_Summ,
            SUM (group_summ_paid) OVER (PARTITION BY customer_id, group_id) AS Total_Group_Summ_Paid,
            group_cost,
            group_summ,
            group_summ_paid,
            group_purchase,
            group_frequency,
            trans_in_interval,
            interval_to_days(CURRENT_DATE - last_group_purchase_date) AS days_since_last_group_purchase,
            Group_Stability_Index
        FROM checks
            JOIN transactions USING (transaction_id)
            JOIN cards USING (customer_card_id)
            JOIN personal_data USING (customer_id)
            JOIN sku USING (sku_id)
            JOIN purchase_history USING (customer_id, group_id)
            JOIN ct USING (customer_id, group_id)
            LEFT JOIN periods USING (customer_id, group_id)
            JOIN avg_prev_tr USING (customer_id, group_id)
            JOIN margin_by_group USING (customer_id, group_id)
        ORDER BY 1,
            2
    )
SELECT DISTINCT customer_id AS Customer_ID,
    group_id AS Group_ID,
    group_purchase / trans_in_interval::numeric AS Group_Affinity_Index,
    COALESCE (
        CASE
            WHEN group_purchase = 1 THEN 0
            ELSE days_since_last_group_purchase / group_frequency
        END,
        0
    ) AS Group_Churn_Rate,
    COALESCE (Group_Stability_Index, 0) AS Group_Stability_Index,
    Group_Margin,
    share_with_discount AS Group_Discount_Share,
    Group_Minimum_Discount,
    Total_Group_Summ_Paid / Total_Group_Summ AS Group_Average_Discount
FROM data_table
ORDER BY 1,
    2;