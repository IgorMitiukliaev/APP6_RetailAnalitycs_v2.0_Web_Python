DROP FUNCTION IF EXISTS personal_offers_by_visits_frequency;
CREATE OR REPLACE FUNCTION personal_offers_by_visits_frequency(
        FirstDate date,
        LastDate date,
        AddedNumberOfTransactions int,
        MaxChurnIndex int,
        MaximumShareTransactions int,
        AllowableMarginShare int
    ) RETURNS TABLE(
        Customer_ID int,
        Start_Date timestamp,
        End_Date timestamp,
        Required_Transactions_Count int,
        Group_Name varchar(255),
        Offer_Discount_Depth float
    ) AS $$
select t1.customer_id,
    t1.FirstDate,
    t1.LastDate,
    t1.Required_Transactions_Count,
    t1.group_name,
    t1.Offer_Discount_Depth
from (
        select distinct on (personal_data.customer_id) personal_data.customer_id as customer_id,
            FirstDate,
            LastDate,
            round(
                (LastDate - FirstDate) / customers.customer_frequency
            ) + AddedNumberOfTransactions as Required_Transactions_Count,
            groups_sku.group_name as group_name,
            groups.group_affinity_index as group_affinity_index,
            groups.group_minimum_discount as Offer_Discount_Depth
        from personal_data
            left join customers on customers.customer_id = personal_data.customer_id
            left join groups on groups.customer_id = personal_data.customer_id
            left join groups_sku on groups_sku.group_id = groups.group_id
        where groups.group_churn_rate <= MaxChurnIndex
            and groups.group_discount_share < MaximumShareTransactions
            and round(groups.group_minimum_discount * 0.2) * 5 < AllowableMarginShare * groups.group_margin
        order by personal_data.customer_id,
            groups.group_affinity_index desc
    ) as t1 $$ LANGUAGE SQL;
-- SELECT *
-- from personal_offers_by_average_check(1, '2010-01-01', '2022-12-31', 100, 3, 2, 1, 10);
-- SELECT *
-- from personal_offers_by_average_check(
-- 		2,
-- 		'2010-01-01',
-- 		'2022-12-31',
-- 		50,
-- 		1.2,
-- 		50,
-- 		2,
-- 		70
-- 	);