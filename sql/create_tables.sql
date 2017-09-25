USE chat;

CREATE TABLE IF NOT EXISTS user (
  id            INT          NOT NULL AUTO_INCREMENT,
  login         VARCHAR(50)  NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  image         VARCHAR(255),

  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS message (
  id INT NOT NULL AUTO_INCREMENT,
  sender_id INT,
  sended_at DATETIME,
  text_message VARCHAR(255) NOT NULL ,
  PRIMARY KEY (id),
  FOREIGN KEY (sender_id) REFERENCES  user (id)
);