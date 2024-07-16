use world;

create table users(
id int(11) unsigned auto_increment primary key,
name varchar(100),
lastname varchar(100),
email varchar (200),
password varchar (200),
image varchar (200),
token varchar (200),
bio TEXT
);

create table movies (
id int(11) unsigned auto_increment primary key,
title varchar(100),
description TEXT,
image varchar (200),
trailer varchar (150),
category varchar (50),
length varchar (50),
users_id INT(11) UNSIGNED,
FOREIGN KEY (users_id) REFERENCES users(id)
);

create table reviews (
id int(11) unsigned auto_increment primary key,
rating int,
review TEXT,
users_id INT(11) UNSIGNED,
movies_id INT(11) UNSIGNED,
FOREIGN KEY (users_id) REFERENCES users(id),
FOREIGN KEY (movies_id) REFERENCES movies(id)
);