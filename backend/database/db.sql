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
--     admin_id int references admins(admin_id) NOT NULL,
--     question text NOT NULL,
--     answer text NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (admin_id) REFERENCES admins(admin_id) ON DELETE CASCADE
-- );

-- CREATE TABLE IF NOT EXISTS quiz_results (
--     result_id serial PRIMARY KEY,
--     user_id int NOT NULL,
--     quiz_id int NOT NULL,
--     score int NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
--     FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id) ON DELETE CASCADE
-- );

-- INSERT INTO users (username, password) VALUES ('gnar', 'gnar123'), ('dude', 'dude1');
-- INSERT INTO admins (username) VALUES ('gnar');
-- INSERT INTO quizzes (admin_id, question, answer) VALUES (1, 'What is 2 + 2?', '4');
-- INSERT INTO quiz_results (user_id, quiz_id, score) VALUES (1, 1, 100), (2, 1, 80);
