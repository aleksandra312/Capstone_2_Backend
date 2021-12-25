\echo 'Delete and recreate states_trends db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE states_trends;
CREATE DATABASE states_trends;
\connect states_trends

\i states-trends-schema.sql
\i states-trends-seed.sql

\echo 'Delete and recreate states_trends_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE states_trends_test;
CREATE DATABASE states_trends_test;
\connect states_trends_test

\i states-trends-schema.sql
