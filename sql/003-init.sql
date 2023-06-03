CREATE USER 'spring'@'%' IDENTIFIED BY 'hemligt';
GRANT SELECT, INSERT, DELETE, UPDATE ON holiday.* TO 'spring'@'%';