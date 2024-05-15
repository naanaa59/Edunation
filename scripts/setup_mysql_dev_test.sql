-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS edu_dev_db_test;
CREATE USER IF NOT EXISTS 'edu_dev'@'localhost' IDENTIFIED BY 'edu_dev_pwd';
GRANT ALL PRIVILEGES ON `edu_dev_db_test`.* TO 'edu_dev'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'edu_dev'@'localhost';
FLUSH PRIVILEGES;
