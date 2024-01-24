FROM postgres:latest

COPY short_datasets/*.tsv  /var/lib/postgresql/
COPY part1.sql /docker-entrypoint-initdb.d/
COPY part2_0_prerequisites.sql /docker-entrypoint-initdb.d/
COPY part2_1_periods.sql /docker-entrypoint-initdb.d/
COPY part2_2_purchase_history.sql /docker-entrypoint-initdb.d/
COPY part2_3_customers.sql /docker-entrypoint-initdb.d/
COPY part2_4_groups.sql /docker-entrypoint-initdb.d/
COPY part4.sql /docker-entrypoint-initdb.d/
COPY part5.sql /docker-entrypoint-initdb.d/
COPY part6.sql /docker-entrypoint-initdb.d/


EXPOSE 5432
