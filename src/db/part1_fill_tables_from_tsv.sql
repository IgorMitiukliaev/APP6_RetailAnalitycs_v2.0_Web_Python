TRUNCATE TABLE personal_data CASCADE;
TRUNCATE TABLE cards CASCADE;
TRUNCATE TABLE stores CASCADE;
TRUNCATE TABLE checks CASCADE;
TRUNCATE TABLE Groups_SKU CASCADE;
TRUNCATE TABLE SKU CASCADE;
TRUNCATE TABLE transactions CASCADE;
--
CALL import_personal_data_from_tsv('Personal_Data.tsv');
CALL import_cards_from_tsv('Cards.tsv');
CALL import_groups_sku_tsv('Groups_SKU.tsv');
CALL import_sku_tsv('SKU.tsv');
CALL import_stores_tsv('Stores.tsv');
CALL import_transactions_tsv('Transactions.tsv');
CALL import_checks_tsv('Checks.tsv');
--
CREATE INDEX tr_1 on transactions(transaction_id, customer_card_id) ;
CREATE INDEX ch_1 on checks(transaction_id, sku_id);
CREATE INDEX sku_1 on sku(sku_id, group_id);
CREATE INDEX crd_1 on cards(customer_card_id, customer_id);
CREATE INDEX str_1 on stores(transaction_store_id, sku_id);