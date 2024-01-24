--
DROP FUNCTION IF EXISTS cross_selling_offer;
CREATE OR REPLACE FUNCTION cross_selling_offer (
        number_of_groups int,
        maximum_churn_index numeric,
        maximum_consumption_stability_index numeric,
        maximum_SKU_share numeric,
        allowable_margin_share numeric
    ) RETURNS TABLE (
        Customer_ID int,
        SKU_Name varchar,
        Offer_Discount_Depth decimal
    ) AS $$ BEGIN RETURN QUERY
SELECT ttt.Customer_ID,
    sku.SKU_Name,
    CEIL(group_min_discount * 20) * 5 AS Offer_Discount_Depth
FROM (
        SELECT customers.customer_id,
            transaction_store_id,
            sku_id,
            group_id,
            (
                (
                    allowable_margin_share * (sku_retail_price - sku_purchase_price)
                ) / sku_retail_price
            ) Offer_Discount_Depth
        FROM (
                SELECT sku_id,
                    group_id,
                    transaction_store_id
                FROM (
                        SELECT sku_id,
                            group_id,
                            transaction_store_id,
                            ROW_NUMBER() OVER (
                                PARTITION BY (transaction_store_id, group_id)
                                ORDER BY sku_retail_price - sku_purchase_price
                            ) r_n
                        FROM stores
                            JOIN sku USING (sku_id)
                        ORDER BY transaction_store_id,
                            group_id,
                            r_n
                    ) t
                WHERE r_n <= number_of_groups
            ) sku_max_margin
            JOIN customers ON transaction_store_id = customer_primary_store
            JOIN groups USING (customer_id, group_id)
            JOIN -- Определение доли SKU в группе.
            (
                SELECT sku_id,
                    group_id,
                    count_t_sku / count_t_group::decimal sku_share_in_group
                FROM (
                        SELECT sku_id,
                            COUNT (DISTINCT transaction_id) AS count_t_sku
                        FROM checks
                        GROUP BY sku_id
                    ) t1
                    JOIN sku USING (sku_id)
                    JOIN (
                        SELECT group_id,
                            COUNT (DISTINCT transaction_id) count_t_group
                        FROM checks
                            JOIN sku USING (sku_id)
                        GROUP BY group_id
                    ) t2 USING (group_id)
            ) sku_share USING (sku_id, group_id)
            JOIN stores USING (sku_id, transaction_store_id)
        WHERE sku_share_in_group < maximum_SKU_share
            AND group_churn_rate <= maximum_churn_index
            AND group_stability_index < maximum_consumption_stability_index
    ) ttt
    JOIN sku USING (sku_id)
    JOIN periods ON ttt.customer_id = periods.customer_id
    AND ttt.group_id = periods.group_id
WHERE ttt.Offer_Discount_Depth <= CEIL(group_min_discount * 20) / 20
ORDER BY ttt.customer_id,
    ttt.group_id;
END;
$$ LANGUAGE 'plpgsql';
-- SELECT *
-- FROM cross_selling_offer(2, 10, 2, 2, 0.25);