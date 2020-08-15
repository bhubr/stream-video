CREATE TABLE user_whitelist (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  registered BOOLEAN
);

CREATE TABLE user (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  google_id VARCHAR(30) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  firstname VARCHAR(255),
  lastname VARCHAR(255),
  avatar VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE playlist (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  folder VARCHAR(40),
  title VARCHAR(255),
  description TEXT
);

CREATE TABLE video (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  playlist_id INTEGER NOT NULL,
  title VARCHAR(255),
  description TEXT,
  file VARCHAR(255)
);

ALTER TABLE video ADD CONSTRAINT fk_video_playlist FOREIGN KEY(playlist_id) REFERENCES playlist(id);

CREATE TABLE user_playlist (
  user_id INTEGER NOT NULL,
  playlist_id INTEGER NOT NULL
);

ALTER TABLE user_playlist ADD CONSTRAINT fk_user_playlist_user FOREIGN KEY(user_id) REFERENCES user(id);
ALTER TABLE user_playlist ADD CONSTRAINT fk_user_playlist_playlist FOREIGN KEY(playlist_id) REFERENCES playlist(id);