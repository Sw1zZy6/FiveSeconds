-- CREATE TABLE IF NOT EXISTS users (
--     user_id serial PRIMARY KEY,
--     username text UNIQUE NOT NULL,
--     password text NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE IF NOT EXISTS admins (
--     admin_id serial PRIMARY KEY,
--     username text UNIQUE NOT NULL,
--     created_at TIMESTAMP DEFAULT now(),
--     FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
-- );

-- CREATE TABLE IF NOT EXISTS quizzes (
--     quiz_id serial PRIMARY KEY,
--     admin_username text NOT NULL,
--     question text NOT NULL,
--     answer text NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (admin_username) REFERENCES admins(username) ON DELETE CASCADE
-- );

-- CREATE TABLE IF NOT EXISTS scores (
--     score_id serial PRIMARY KEY,
--     user_username text NOT NULL,
--     score int NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_username) REFERENCES users(username) ON DELETE CASCADE
-- );

-- INSERT INTO users (username, password) VALUES ('gnar', 'gnar123'), ('dude', 'dude1');
-- INSERT INTO admins (username) VALUES ('gnar');
-- INSERT INTO quizzes (admin_username, question, answer) VALUES ('gnar', 'What is 5 + 2?', '7');
-- INSERT INTO quiz_results (user_username, quiz_id, score) VALUES ('gnar', 1, 100);

-- ALTER TABLE quizzes
-- ADD CONSTRAINT unique_question UNIQUE (question);

