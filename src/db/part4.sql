DROP FUNCTION IF EXISTS personal_offers_by_average_check;
CREATE OR REPLACE FUNCTION personal_offers_by_average_check (
		variant int,
		first_date date,
		last_date date,
		count_transactions int,
		coeff numeric,
		churn_rate numeric,
		discount_share int,
		margin_share numeric
	) RETURNS TABLE (
		customer_id_ int,
		required_check_measure numeric,
		group_name varchar,
		offer_discount_depth numeric
	) AS $$
DECLARE cur CURSOR FOR WITH data_for_average_ch AS(
		SELECT *
		FROM (
				SELECT cr.customer_id,
					tr.transaction_datetime,
					tr.transaction_id,
					ch.sku_summ_paid,
					ROW_NUMBER() OVER(
						PARTITION BY cr.customer_id
						ORDER BY tr.transaction_datetime DESC
					) AS num_transaction
				FROM checks ch
					JOIN transactions tr ON ch.transaction_id = tr.transaction_id
					JOIN cards cr on tr.customer_card_id = cr.customer_card_id
			) ch
		WHERE (
				variant = 1
				AND date_trunc('day', transaction_datetime) BETWEEN first_date AND last_date
			)
			OR (
				variant = 2
				AND num_transaction <= count_transactions
			)
	),
	target_average_ch AS(
		SELECT customer_id,
			coeff * SUM(sku_summ_paid) / COUNT(DISTINCT transaction_id) AS required_check_measure
		FROM data_for_average_ch
		GROUP BY customer_id
	),
	data_for_find_group AS (
		SELECT tc.customer_id,
			tc.required_check_measure,
			gr.group_id,
			gr.group_affinity_index,
			gr.group_margin * margin_share * 0.01 AS margin,
			gr.group_minimum_discount * 100 AS group_minimum_discount,
			CASE
				WHEN gr.Group_Churn_Rate < churn_rate THEN true
				ELSE false
			END AS churn_rate_ok,
			CASE
				WHEN gr.Group_Discount_Share < discount_share THEN true
				ELSE false
			END AS group_discount_share_ok
		FROM target_average_ch tc
			JOIN groups gr ON tc.customer_id = gr.customer_id
	)
SELECT *
FROM data_for_find_group
	JOIN groups_sku ON data_for_find_group.group_id = groups_sku.group_id
ORDER BY customer_id,
	group_affinity_index DESC;
current_id int := 0;
group_find bool := false;
BEGIN FOR rec IN cur LOOP IF current_id <> rec.customer_id
OR (
	current_id = rec.customer_id
	AND NOT group_find
) THEN IF current_id <> rec.customer_id THEN group_find = false;
END IF;
IF rec.churn_rate_ok
AND rec.group_discount_share_ok
AND NOT group_find THEN offer_discount_depth = 5 + (
	rec.group_minimum_discount - rec.group_minimum_discount % 5
);
IF offer_discount_depth < rec.margin THEN customer_id_ = rec.customer_id;
required_check_measure = rec.required_check_measure;
group_name = rec.group_name;
group_find = true;
RETURN NEXT;
END IF;
END IF;
END IF;
current_id = rec.customer_id;
END LOOP;
END $$ LANGUAGE plpgsql;
--
-- SELECT * from personal_offers_by_average_check(1, '2010-01-01', '2022-12-31', 100, 3, 2, 1, 10);
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