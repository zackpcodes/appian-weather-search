CREATE DATABASE appian;
\c appian;

-- START creation of weather table
CREATE TABLE weather (
    date TIMESTAMP,
    town TEXT,
    weather TEXT
);
-- END

COPY weather(date, town, weather)
FROM '/var/lib/test-data.csv'
DELIMITER ','
CSV HEADER;