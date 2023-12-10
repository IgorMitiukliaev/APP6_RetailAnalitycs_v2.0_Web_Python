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
	Customer_Name varchar not null,
	Customer_Surname varchar not null,
	Customer_Primary_Email varchar not null,
	Customer_Primary_Phone decimal(10) not null
);

CREATE TABLE IF NOT EXISTS cards (
	Customer_Card_ID serial primary key not null,
	Customer_ID serial references personal_data(Customer_ID) not null
);

CREATE TABLE IF NOT EXISTS groups_sku (
	Group_ID serial primary key not null,
	Group_Name varchar not null
);

CREATE TABLE IF NOT EXISTS sku (
	SKU_ID serial primary key not null,
	SKU_Name varchar not null,
	Group_ID serial references groups_sku(Group_ID) not null
);

CREATE TABLE IF NOT EXISTS stores (
	Transaction_Store_ID serial not null,
	SKU_ID serial references sku(SKU_ID),
	SKU_Purchase_Price decimal not null,
	SKU_Retail_Price decimal not null
);

CREATE TABLE IF NOT EXISTS transactions (
	Transaction_ID serial primary key not null,
	Customer_Card_ID serial references cards(Customer_Card_ID) not null,
	Transaction_Summ decimal not null,
	Transaction_DateTime timestamp not null,
	Transaction_Store_ID serial not null
);

CREATE TABLE IF NOT EXISTS checks(
	Transaction_ID serial references transactions(Transaction_ID) not null,
	SKU_ID serial references sku(SKU_ID) not null,
	SKU_Amount decimal not null,
	SKU_Summ decimal not null,
	SKU_Summ_Paid decimal not null,
	SKU_Discount decimal not null
	
);