-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS edu_dev_db;
USE edu_dev_db;

-- Table: users
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL,
    password VARCHAR(128) NOT NULL,
    role VARCHAR(128) NOT NULL,
    first_name VARCHAR(128),
    last_name VARCHAR(128)
);

-- Table: subjects
CREATE TABLE IF NOT EXISTS subjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    description VARCHAR(1024)
);

-- Table: courses
CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject_id INT NOT NULL,
    user_id INT NOT NULL,
    user_role VARCHAR(60) NOT NULL,
    title VARCHAR(128) NOT NULL,
    description VARCHAR(1024),
    FOREIGN KEY (subject_id) REFERENCES subjects(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
-- Table: students
CREATE TABLE IF NOT EXISTS students (
    user_id INT PRIMARY KEY,
    grade VARCHAR(60)
    FOREIGN KEY (user_id) REFERENCES users(id)
);
-- Create relationship table: course_subject
CREATE TABLE IF NOT EXISTS course_subject (
    course_id INT,
    subject_id INT,
    PRIMARY KEY (course_id, subject_id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    FOREIGN KEY (subject_id) REFERENCES subjects(id)
);

-- Sample data for users table
INSERT INTO users (username, email, password, role, first_name, last_name)
VALUES
    ('user1', 'user1@email.com', 'password1', 'admin', 'John', 'Doe'),
    ('user2', 'user2@email.com', 'password2', 'instructor', 'Jane', 'Smith');

-- Sample data for subjects table
INSERT INTO subjects (name, description)
VALUES
    ('Mathematics', 'Study of numbers and shapes.'),
    ('History', 'Study of past events and civilizations.');

-- Sample data for courses table
INSERT INTO courses (subject_id, user_id, user_role, title, description)
VALUES
    (1, 1, 'admin', 'Algebra 101', 'Introduction to algebraic concepts.'),
    (2, 2, 'instructor', 'World History', 'Overview of world history from ancient times to modern era.');

