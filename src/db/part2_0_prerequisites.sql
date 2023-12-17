DROP FUNCTION IF EXISTS interval_to_days CASCADE;
CREATE OR REPLACE FUNCTION interval_to_days(a INTERVAL) RETURNS numeric AS $$
DECLARE res numeric;
BEGIN res = EXTRACT(
    EPOCH
    FROM a
) / 60 / 60 / 24;
RETURN res;
END;
$$ LANGUAGE plpgsql;
--
DROP FUNCTION IF EXISTS determine_segment CASCADE;
CREATE OR REPLACE FUNCTION determine_segment(a_ch_s varchar, f_s varchar, c_s varchar) RETURNS integer AS $$
DECLARE res numeric;
BEGIN res = (
    SELECT Segment_ID
    FROM customer_segmentation
    WHERE Average_Check_Segment = a_ch_s
        AND Frequency_Segment = f_s
        AND Churn_Segment = c_s
);
RETURN res;
END;
$$ LANGUAGE plpgsql;
--
DROP VIEW IF EXISTS groups;
DROP VIEW IF EXISTS s2;
DROP VIEW IF EXISTS s1;
DROP TABLE IF EXISTS margin_parameters CASCADE;
CREATE TABLE IF NOT EXISTS margin_parameters (
    m_type varchar CHECK (m_type IN ('default', 'periods', 'transactions')) default 'default',
    parameter int default 0
);
--
CREATE OR REPLACE PROCEDURE set_margin_parameters(margin_type varchar, parameter int default 0) LANGUAGE plpgsql AS $BODY$ BEGIN TRUNCATE TABLE margin_parameters;
IF margin_type = 'default' THEN
INSERT INTO margin_parameters(m_type)
VALUES (margin_type);
ELSE
INSERT INTO margin_parameters(m_type, parameter)
VALUES (margin_type, parameter);
END IF;
END;
$BODY$;
--
--
CREATE OR REPLACE FUNCTION get_min_date(c_id int, g_id int) RETURNS timestamp LANGUAGE plpgsql AS $BODY$
DECLARE res timestamp;
BEGIN res =(
    SELECT first_group_purchase_date
    FROM periods p
    WHERE p.customer_id = c_id
        AND p.group_id = g_id
);
RETURN res;
END;
$BODY$;
--
CREATE OR REPLACE FUNCTION get_max_date(c_id int, g_id int) RETURNS timestamp LANGUAGE plpgsql AS $BODY$
DECLARE res timestamp;
BEGIN res =(
    SELECT last_group_purchase_date
    FROM periods p
    WHERE p.customer_id = c_id
        AND p.group_id = g_id
);
RETURN res;
END;
$BODY$;
--
CALL set_margin_parameters('default');
-- CALL set_margin_parameters('periods', 20);
-- CALL set_margin_parameters('transactions', 2);
