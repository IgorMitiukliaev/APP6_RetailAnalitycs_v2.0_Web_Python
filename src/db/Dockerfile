FROM postgres:latest

COPY short_datasets/*.tsv  /var/lib/postgresql/
COPY part1.sql /docker-entrypoint-initdb.d/
# COPY part1_fill_tables.sql /docker-entrypoint-initdb.d/

EXPOSE 5432
