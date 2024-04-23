#!/usr/bin/bash

if [ -n "$1" ] && [ "$1" = "test" ]; then
	cat drop_all.sql | mysql -uroot -p
	EDU_MYSQL_USER=edu_dev EDU_MYSQL_PWD=edu_dev_pwd EDU_MYSQL_HOST=localhost EDU_MYSQL_DB=edu_dev_db EDU_ENV=test ./console.py

else
	EDU_MYSQL_USER=edu_dev EDU_MYSQL_PWD=edu_dev_pwd EDU_MYSQL_HOST=localhost EDU_MYSQL_DB=edu_dev_db  ./console.py
fi
