-- CREATE DATABASE chat;

USE chat;
-- DROP TABLE IF IT EXISTS
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  name varchar(255),
  user_id int(30) AUTO_INCREMENT,
  PRIMARY KEY (user_id)
);

DROP TABLE IF EXISTS rooms;
CREATE TABLE rooms (
  room varchar(255),
  room_id int(30) AUTO_INCREMENT,
  PRIMARY KEY (room_id)
);


DROP TABLE IF EXISTS messages;
CREATE TABLE messages (
  user_id int(30) REFERENCES users(user_id),
  room_id int(30) REFERENCES room(room_id),
  message varchar(255)
);


-- ALTER TABLE `messages`
--  ADD FOREIGN KEY (user_id) REFERENCES `user`(`id`)
--  ADD FOREIGN KEY (room_id) REFERENCES `room`(`id`);





/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

