USE edu_dev_db;

-- Check if tables exist before creating them
CREATE TABLE IF NOT EXISTS subjects (
    id VARCHAR(36) NOT NULL,
    name VARCHAR(128),
    description VARCHAR(1024),
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS students (
    id VARCHAR(36) NOT NULL,
    email VARCHAR(255),
    password VARCHAR(255),
    grade VARCHAR(128),
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS instructors (
    id VARCHAR(36) NOT NULL,
    email VARCHAR(255),
    password VARCHAR(255),
    level VARCHAR(128),
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS courses (
    id VARCHAR(36) NOT NULL,
    subject_id VARCHAR(36) NOT NULL,
    student_id VARCHAR(36),
    instructor_id VARCHAR(36) NOT NULL,
    title VARCHAR(128),
    description VARCHAR(15000),
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (subject_id) REFERENCES subjects (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students (id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (instructor_id) REFERENCES instructors (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS student_courses (
    student_id VARCHAR(36) NOT NULL,
    course_id VARCHAR(36) NOT NULL,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS instructor_courses (
    instructor_id VARCHAR(36) NOT NULL,
    course_id VARCHAR(36) NOT NULL,
    PRIMARY KEY (instructor_id, course_id),
    FOREIGN KEY (instructor_id) REFERENCES instructors (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insert sample data
INSERT INTO subjects (id, name, description, created_at, updated_at) VALUES
(UUID(), 'Mathematics', 'Study of numbers, quantity, structure, space, and change.', NOW(), NOW()),
(UUID(), 'History', 'Study of past events, particularly in human affairs.', NOW(), NOW()),
(UUID(), 'Physics', 'Study of matter, energy, and the fundamental forces of nature.', NOW(), NOW()),
(UUID(), 'Literature', 'Study of written works, including novels, plays, and poetry.', NOW(), NOW()),
(UUID(), 'Biology', 'Study of living organisms and their interactions.', NOW(), NOW());

-- Insert sample data into the instructors table
INSERT INTO instructors (id, email, password, level, created_at, updated_at)
VALUES
(UUID(), 'instructor1@example.com', 'password1', 'Senior Instructor', NOW(), NOW()),
(UUID(), 'instructor2@example.com', 'password2', 'Junior Instructor', NOW(), NOW()),
(UUID(), 'instructor3@example.com', 'password3', 'Assistant Instructor', NOW(), NOW());

-- Insert sample data into the students table
INSERT INTO students (id, email, password, grade, created_at, updated_at)
VALUES
(UUID(), 'student1@example.com', 'password1', 'A', NOW(), NOW()),
(UUID(), 'student2@example.com', 'password2', 'B', NOW(), NOW()),
(UUID(), 'student3@example.com', 'password3', 'C', NOW(), NOW());

INSERT INTO courses (id, subject_id, student_id, instructor_id, title, description, created_at, updated_at) VALUES
(UUID(), (SELECT id FROM subjects WHERE name = 'Mathematics'), (SELECT id FROM students WHERE email = 'student1@example.com'), (SELECT id FROM instructors WHERE email = 'instructor1@example.com'), 'Algebra Basics', 'Introduction to basic algebraic concepts.', NOW(), NOW()),
(UUID(), (SELECT id FROM subjects WHERE name = 'Mathematics'), (SELECT id FROM students WHERE email = 'student2@example.com'), (SELECT id FROM instructors WHERE email = 'instructor2@example.com'), 'Geometry Fundamentals', 'Fundamental concepts and principles of geometry.', NOW(), NOW()),
(UUID(), (SELECT id FROM subjects WHERE name = 'Mathematics'), (SELECT id FROM students WHERE email = 'student3@example.com'), (SELECT id FROM instructors WHERE email = 'instructor3@example.com'), 'Calculus I', 'Introduction to differential and integral calculus.', NOW(), NOW()),
(UUID(), (SELECT id FROM subjects WHERE name = 'History'), (SELECT id FROM students WHERE email = 'student1@example.com'), (SELECT id FROM instructors WHERE email = 'instructor1@example.com'), 'World History', 'Survey of major events in world history.', NOW(), NOW()),
(UUID(), (SELECT id FROM subjects WHERE name = 'History'), (SELECT id FROM students WHERE email = 'student2@example.com'), (SELECT id FROM instructors WHERE email = 'instructor2@example.com'), 'US History', 'Survey of major events in the history of the United States.', NOW(), NOW()),
(UUID(), (SELECT id FROM subjects WHERE name = 'History'), (SELECT id FROM students WHERE email = 'student3@example.com'), (SELECT id FROM instructors WHERE email = 'instructor3@example.com'), 'Ancient Civilizations', 'Study of ancient cultures and civilizations.', NOW(), NOW()),
(UUID(), (SELECT id FROM subjects WHERE name = 'Physics'), (SELECT id FROM students WHERE email = 'student1@example.com'), (SELECT id FROM instructors WHERE email = 'instructor1@example.com'), 'Mechanics', 'Study of motion and forces.', NOW(), NOW()),
(UUID(), (SELECT id FROM subjects WHERE name = 'Physics'), (SELECT id FROM students WHERE email = 'student2@example.com'), (SELECT id FROM instructors WHERE email = 'instructor2@example.com'), 'Electromagnetism', 'Study of electricity and magnetism.', NOW(), NOW()),
(UUID(), (SELECT id FROM subjects WHERE name = 'Physics'), (SELECT id FROM students WHERE email = 'student3@example.com'), (SELECT id FROM instructors WHERE email = 'instructor3@example.com'), 'Quantum Physics', 'Study of quantum mechanics and phenomena.', NOW(), NOW()),
(UUID(), (SELECT id FROM subjects WHERE name = 'Literature'), (SELECT id FROM students WHERE email = 'student1@example.com'), (SELECT id FROM instructors WHERE email = 'instructor1@example.com'), 'Shakespearean Literature', 'Study of works by William Shakespeare.', NOW(), NOW()),
(UUID(), (SELECT id FROM subjects WHERE name = 'Literature'), (SELECT id FROM students WHERE email = 'student2@example.com'), (SELECT id FROM instructors WHERE email = 'instructor2@example.com'), 'Modern American Literature', 'Study of contemporary American literary works.', NOW(), NOW()),
(UUID(), (SELECT id FROM subjects WHERE name = 'Literature'), (SELECT id FROM students WHERE email = 'student3@example.com'), (SELECT id FROM instructors WHERE email = 'instructor3@example.com'), 'Poetry Analysis', 'Analysis and interpretation of poetry.', NOW(), NOW()),
(UUID(), (SELECT id FROM subjects WHERE name = 'Biology'), (SELECT id FROM students WHERE email = 'student1@example.com'), (SELECT id FROM instructors WHERE email = 'instructor1@example.com'), 'Cell Biology', 'Study of cellular structure and function.', NOW(), NOW()),
(UUID(), (SELECT id FROM subjects WHERE name = 'Biology'), (SELECT id FROM students WHERE email = 'student2@example.com'), (SELECT id FROM instructors WHERE email = 'instructor2@example.com'), 'Genetics', 'Study of genes and heredity.', NOW(), NOW()),
(UUID(), (SELECT id FROM subjects WHERE name = 'Biology'), (SELECT id FROM students WHERE email = 'student3@example.com'), (SELECT id FROM instructors WHERE email = 'instructor3@example.com'), 'Ecology', 'Study of interactions between organisms and their environment.', NOW(), NOW());

INSERT INTO instructor_courses (instructor_id, course_id)
VALUES
((SELECT id FROM instructors WHERE email = 'instructor1@example.com'), (SELECT id FROM courses WHERE title = 'Algebra Basics')),
((SELECT id FROM instructors WHERE email = 'instructor2@example.com'), (SELECT id FROM courses WHERE title = 'Geometry Fundamentals')),
((SELECT id FROM instructors WHERE email = 'instructor3@example.com'), (SELECT id FROM courses WHERE title = 'Calculus I'));

-- Insert sample data into the student_courses table
INSERT INTO student_courses (student_id, course_id)
VALUES
((SELECT id FROM students WHERE email = 'student1@example.com'), (SELECT id FROM courses WHERE title = 'World History')),
((SELECT id FROM students WHERE email = 'student2@example.com'), (SELECT id FROM courses WHERE title = 'US History')),
((SELECT id FROM students WHERE email = 'student3@example.com'), (SELECT id FROM courses WHERE title = 'Ancient Civilizations'));