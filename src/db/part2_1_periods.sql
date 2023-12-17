CREATE OR REPLACE VIEW periods AS WITH periods_data AS(
		SELECT DISTINCT cards.customer_id,
			sku.group_id,
			checks.transaction_id,
			sku.sku_id,
			transactions.transaction_datetime,
			checks.SKU_Discount,
			checks.SKU_Summ,
			MIN (checks.SKU_Discount) OVER (PARTITION BY customer_id, group_id) / checks.SKU_Summ AS Min_Discount
		FROM checks
			JOIN sku ON checks.sku_id = sku.sku_id
			JOIN transactions ON checks.transaction_id = transactions.transaction_id
			JOIN cards ON transactions.customer_card_id = cards.customer_card_id
		ORDER BY cards.customer_id,
			sku.group_id
	)
SELECT DISTINCT customer_id,
	group_id,
	MIN(transaction_datetime) OVER (PARTITION BY customer_id, group_id) AS First_Group_Purchase_Date,
	MAX(transaction_datetime) OVER (PARTITION BY customer_id, group_id) AS Last_Group_Purchase_Date,
	COUNT(transaction_id) OVER (PARTITION BY customer_id, group_id) AS Group_Purchase,
	(
		1 + interval_to_days(
			(
				MAX(transaction_datetime) OVER (PARTITION BY customer_id, group_id)
			) - (
				MIN(transaction_datetime) OVER (PARTITION BY customer_id, group_id)
			)
		)
	) / COUNT(transaction_id) OVER (PARTITION BY customer_id, group_id) AS Group_Frequency,
	MIN(Min_Discount) OVER (PARTITION BY customer_id, group_id) AS Group_Min_Discount
FROM periods_data
ORDER BY customer_id,
	group_id;