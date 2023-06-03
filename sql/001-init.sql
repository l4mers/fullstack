CREATE DATABASE holiday;
USE holiday;

CREATE TABLE message (
    id INTEGER NOT NULL,
    message VARCHAR(255),
    PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE message_seq (next_val BIGINT) ENGINE=InnoDB;
INSERT INTO message_seq VALUES (1);