CREATE DATABASE dostapp;

CREATE TABLE attraction(
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(30),
    date VARCHAR(255)
);

CREATE TABLE users(
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);
/*INSERT INTO attraction(id, user_email, title, date) VALUES ('0', 'kirukha@list.ru', 'minsk world', '2024-02-20');
INSERT INTO attraction(id, user_email, title, date) VALUES ('0', 'kirukha@list.ru', 'Minsk World', 'Thu Dec 20 2023 21:07:25 GMT+0400 (Gulf Standart Time)');