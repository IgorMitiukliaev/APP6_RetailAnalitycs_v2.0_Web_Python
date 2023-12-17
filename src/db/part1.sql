-- CREATE DATABASE retail_analytics;
DROP TABLE IF EXISTS personal_data CASCADE;
DROP TABLE IF EXISTS cards CASCADE;
DROP TABLE IF EXISTS stores CASCADE;
DROP TABLE IF EXISTS checks CASCADE;
DROP TABLE IF EXISTS groups_sku CASCADE;
DROP TABLE IF EXISTS sku CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
CREATE TABLE IF NOT EXISTS personal_data (
	Customer_ID serial primary key not null,
	Customer_Name varchar(255) not null,
	Customer_Surname varchar(255) not null,
	Customer_Primary_Email varchar(255),
	Customer_Primary_Phone varchar(15)
);
CREATE TABLE IF NOT EXISTS cards (
	Customer_Card_ID serial primary key not null,
	Customer_ID serial not null,
	CONSTRAINT fk_customer FOREIGN KEY (Customer_ID) REFERENCES personal_data(Customer_ID) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS groups_sku (
	Group_ID serial primary key not null,
	Group_Name varchar(255) not null
);
CREATE TABLE IF NOT EXISTS sku (
	SKU_ID serial primary key not null,
	SKU_Name varchar(255) not null,
	Group_ID serial not null,
	CONSTRAINT fk_group_id FOREIGN KEY (Group_ID) REFERENCES groups_sku(Group_ID) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS stores (
	Transaction_Store_ID serial not null,
	SKU_ID serial,
	SKU_Purchase_Price decimal,
	SKU_Retail_Price decimal,
	CONSTRAINT fk_sku_id FOREIGN KEY (SKU_ID) REFERENCES sku(SKU_ID) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS transactions (
	Transaction_ID serial primary key not null,
	Customer_Card_ID serial not null,
	Transaction_Summ decimal not null,
	Transaction_DateTime timestamp not null,
	Transaction_Store_ID serial not null,
	CONSTRAINT fk_customer_card_id FOREIGN KEY (Customer_Card_ID) REFERENCES cards(Customer_Card_ID) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS checks(
	Check_ID serial primary key not null,
	Transaction_ID serial not null,
	SKU_ID serial not null,
	SKU_Amount decimal not null,
	SKU_Summ decimal not null,
	SKU_Summ_Paid decimal not null,
	SKU_Discount decimal not null,
	CONSTRAINT fk_transaction_id FOREIGN KEY (Transaction_ID) REFERENCES transactions(Transaction_ID) ON DELETE CASCADE,
	CONSTRAINT fk_sku_id FOREIGN KEY (SKU_ID) REFERENCES sku(SKU_ID) ON DELETE CASCADE
);
CREATE TEMPORARY TABLE IF NOT EXISTS checks_tmp(
	Transaction_ID serial not null,
	SKU_ID serial not null,
	SKU_Amount decimal not null,
	SKU_Summ decimal not null,
	SKU_Summ_Paid decimal not null,
	SKU_Discount decimal not null
);
set datestyle to SQL,
	DMY;
copy personal_data
from E'/var/lib/postgresql/Personal_Data.tsv' delimiter E'\t';
copy cards
from E'/var/lib/postgresql/Cards.tsv' delimiter E'\t';
copy groups_sku
from E'/var/lib/postgresql/Groups_SKU.tsv' delimiter E'\t';
copy sku
from E'/var/lib/postgresql/SKU.tsv' delimiter E'\t';
copy stores
from E'/var/lib/postgresql/Stores.tsv' delimiter E'\t';
copy transactions
from E'/var/lib/postgresql/Transactions.tsv' delimiter E'\t';
copy checks_tmp
from E'/var/lib/postgresql/Checks.tsv' delimiter E'\t';
INSERT INTO checks (
		Transaction_ID,
		SKU_ID,
		SKU_Amount,
		SKU_Summ,
		SKU_Summ_Paid,
		SKU_Discount
	)
select Transaction_ID,
	SKU_ID,
	SKU_Amount,
	SKU_Summ,
	SKU_Summ_Paid,
	SKU_Discount
from checks_tmp;
CREATE OR REPLACE FUNCTION "reset_sequence" (tablename text, columnname text, sequence_name text) 
    RETURNS "pg_catalog"."void" AS 
    $body$  
      DECLARE 
      BEGIN 
      EXECUTE 'SELECT setval( ''' || sequence_name  || ''', ' || '(SELECT MAX(' || columnname || 
          ') FROM ' || tablename || ')' || ')';
      END;  
    $body$  LANGUAGE 'plpgsql';
    
SELECT table_name || '_' || column_name || '_seq', 
    reset_sequence(table_name, column_name, table_name || '_' || column_name || '_seq') 
FROM information_schema.columns where column_default like 'nextval%';