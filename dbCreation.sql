-- CREATE DATABASE projectdb;

-- CREATE TABLE projectdb.product_table(
--    serialNumber   INT        NOT NULL,
--    name VARCHAR (20)         NOT NULL,
--    description VARCHAR (255) NOT NULL,
--    PRIMARY KEY (serialNumber)
-- );

DELIMITER $$
DROP PROCEDURE IF EXISTS doWhile;
CREATE PROCEDURE doWhile()
  BEGIN
    DECLARE i INT DEFAULT 1;
    WHILE (i <= 10000000) DO
      INSERT INTO product_table (serialNumber, name, description) VALUES (i ,CONCAT("Name-", i), "description section");
      SET i = i + 1;
    END WHILE;
  END;
$$
CALL doWhile();