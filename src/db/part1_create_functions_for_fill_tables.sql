CREATE OR REPLACE PROCEDURE import_table(file_name varchar(255),
                                         table_name varchar(64),
                                         delimiter varchar(1))
LANGUAGE plpgsql
AS $$
DECLARE
    dir varchar(255) := (SELECT setting AS directory
                         FROM pg_settings
                         WHERE name = 'data_directory') || '/' || file_name;
BEGIN
    EXECUTE format('copy %s from %L with csv delimiter %L header', quote_ident(table_name), dir, delimiter);
END $$;

CREATE OR REPLACE PROCEDURE import_personal_data_from_csv(file_name varchar(255), delimiter varchar(1)) LANGUAGE plpgsql AS $$
BEGIN
    CALL import_table(file_name, 'personal_data', delimiter);
END $$;

CREATE OR REPLACE PROCEDURE import_personal_data_from_tsv(file_name varchar(255)) LANGUAGE plpgsql AS $$
BEGIN
    CALL import_table(file_name, 'personal_data', '	');
END $$;

CREATE OR REPLACE PROCEDURE import_cards_from_csv(file_name varchar(255), delimiter varchar(1)) LANGUAGE plpgsql AS $$
BEGIN
    CALL import_table(file_name, 'cards', delimiter);
END $$;

CREATE OR REPLACE PROCEDURE import_cards_from_tsv(file_name varchar(255)) LANGUAGE plpgsql AS $$
BEGIN
    CALL import_table(file_name, 'cards', '	');
END $$;

CREATE OR REPLACE PROCEDURE import_groups_sku_csv(file_name varchar(255), delimiter varchar(1)) LANGUAGE plpgsql AS $$
BEGIN
    CALL import_table(file_name, 'groups_sku', delimiter);
END $$;

CREATE OR REPLACE PROCEDURE import_groups_sku_tsv(file_name varchar(255)) LANGUAGE plpgsql AS $$
BEGIN
    CALL import_table(file_name, 'groups_sku', '	');
END $$;

CREATE OR REPLACE PROCEDURE import_sku_csv(file_name varchar(255), delimiter varchar(1)) LANGUAGE plpgsql AS $$
BEGIN
    CALL import_table(file_name, 'sku', delimiter);
END $$;

CREATE OR REPLACE PROCEDURE import_sku_tsv(file_name varchar(255)) LANGUAGE plpgsql AS $$
BEGIN
    CALL import_table(file_name, 'sku', '	');
END $$;

CREATE OR REPLACE PROCEDURE import_stores_csv(file_name varchar(255), delimiter varchar(1)) LANGUAGE plpgsql AS $$
BEGIN
    CALL import_table(file_name, 'stores', delimiter);
END $$;

CREATE OR REPLACE PROCEDURE import_stores_tsv(file_name varchar(255)) LANGUAGE plpgsql AS $$
BEGIN
    CALL import_table(file_name, 'stores', '	');
END $$;

CREATE OR REPLACE PROCEDURE import_transactions_csv(file_name varchar(255), delimiter varchar(1)) LANGUAGE plpgsql AS $$
BEGIN
    CALL import_table(file_name, 'transactions', delimiter);
END $$;

CREATE OR REPLACE PROCEDURE import_transactions_tsv(file_name varchar(255)) LANGUAGE plpgsql AS $$
BEGIN
    CALL import_table(file_name, 'transactions', '	');
END $$;

CREATE OR REPLACE PROCEDURE import_checks_csv(file_name varchar(255), delimiter varchar(1)) LANGUAGE plpgsql AS $$
BEGIN
    CALL import_table(file_name, 'checks', delimiter);
END $$;

CREATE OR REPLACE PROCEDURE import_checks_tsv(file_name varchar(255)) LANGUAGE plpgsql AS $$
BEGIN
    CALL import_table(file_name, 'checks', '	');
END $$;

CREATE OR REPLACE PROCEDURE export_table(file_name varchar(255),
                                         table_name varchar(255),
                                         delimiter varchar(1))
LANGUAGE plpgsql
AS $$
DECLARE
    dir varchar(255) := (SELECT setting AS directory
                         FROM pg_settings
                         WHERE name = 'data_directory') || '/' || file_name;
BEGIN
    EXECUTE format('copy %s to %L with csv delimiter %L header', quote_ident(table_name), dir, delimiter);
END $$;

CREATE OR REPLACE PROCEDURE export_personal_data_from_csv(file_name varchar(255), delimiter varchar(1)) LANGUAGE plpgsql AS $$
BEGIN
    CALL export_table(file_name, 'personal_data', delimiter);
END $$;

CREATE OR REPLACE PROCEDURE export_personal_data_from_tsv(file_name varchar(255)) LANGUAGE plpgsql AS $$
BEGIN
    CALL export_table(file_name, 'personal_data', '	');
END $$;

CREATE OR REPLACE PROCEDURE export_cards_from_csv(file_name varchar(255), delimiter varchar(1)) LANGUAGE plpgsql AS $$
BEGIN
    CALL export_table(file_name, 'cards', delimiter);
END $$;

CREATE OR REPLACE PROCEDURE export_cards_from_tsv(file_name varchar(255)) LANGUAGE plpgsql AS $$
BEGIN
    CALL export_table(file_name, 'cards', '	');
END $$;

CREATE OR REPLACE PROCEDURE export_groups_sku_csv(file_name varchar(255), delimiter varchar(1)) LANGUAGE plpgsql AS $$
BEGIN
    CALL export_table(file_name, 'groups_sku', delimiter);
END $$;

CREATE OR REPLACE PROCEDURE export_groups_sku_tsv(file_name varchar(255)) LANGUAGE plpgsql AS $$
BEGIN
    CALL export_table(file_name, 'groups_sku', '	');
END $$;

CREATE OR REPLACE PROCEDURE export_sku_csv(file_name varchar(255), delimiter varchar(1)) LANGUAGE plpgsql AS $$
BEGIN
    CALL export_table(file_name, 'sku', delimiter);
END $$;

CREATE OR REPLACE PROCEDURE export_sku_tsv(file_name varchar(255)) LANGUAGE plpgsql AS $$
BEGIN
    CALL export_table(file_name, 'sku', '	');
END $$;

CREATE OR REPLACE PROCEDURE export_stores_csv(file_name varchar(255), delimiter varchar(1)) LANGUAGE plpgsql AS $$
BEGIN
    CALL export_table(file_name, 'stores', delimiter);
END $$;

CREATE OR REPLACE PROCEDURE export_stores_tsv(file_name varchar(255)) LANGUAGE plpgsql AS $$
BEGIN
    CALL export_table(file_name, 'stores', '	');
END $$;

CREATE OR REPLACE PROCEDURE export_transactions_csv(file_name varchar(255), delimiter varchar(1)) LANGUAGE plpgsql AS $$
BEGIN
    CALL export_table(file_name, 'transactions', delimiter);
END $$;

CREATE OR REPLACE PROCEDURE export_transactions_tsv(file_name varchar(255)) LANGUAGE plpgsql AS $$
BEGIN
    CALL export_table(file_name, 'transactions', '	');
END $$;

CREATE OR REPLACE PROCEDURE export_checks_csv(file_name varchar(255), delimiter varchar(1)) LANGUAGE plpgsql AS $$
BEGIN
    CALL export_table(file_name, 'checks', delimiter);
END $$;

CREATE OR REPLACE PROCEDURE export_checks_tsv(file_name varchar(255)) LANGUAGE plpgsql AS $$
BEGIN
    CALL export_table(file_name, 'checks', '	');
END $$;
