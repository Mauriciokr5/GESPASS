create database gespass;
use gespass;

CREATE TABLE users (
    idUser      int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user        VARCHAR(100) NOT NULL,
    userPass      VARCHAR(200) NOT NULL,
    type		 INT NOT NULL
);

ALTER TABLE users ADD CONSTRAINT users_pk PRIMARY KEY ( idUser );


CREATE TABLE passwords (
    idPass      int  PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nameSite        VARCHAR(100) NOT NULL,
    site	VARCHAR(200) NOT NULL,
    passwd      VARCHAR(200) NOT NULL,
    idUser      int NOT NULL
);

ALTER TABLE passwords ADD CONSTRAINT passwords_pk PRIMARY KEY ( idPass );
ALTER TABLE passwords ADD CONSTRAINT passwords_users_fk FOREIGN KEY ( idUser ) REFERENCES users(idUser);