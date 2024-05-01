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

INSERT INTO courses (id, subject_id, student_id, instructor_id, title, description, created_at, updated_at) VALUES
(UUID(), (SELECT id FROM subjects WHERE name = 'Mathematics'), NULL, UUID(), 'Algebra Basics', 'Introduction to basic algebraic concepts.', NOW(), NOW()),
(UUID(), (SELECT id FROM subjects WHERE name = 'Mathematics'), NULL, UUID(), 'Geometry Fundamentals', 'Fundamental concepts and principles of geometry.', NOW(), NOW()),
(UUID(), (SELECT id FROM subjects WHERE name = 'Mathematics'), NULL, UUID(), 'Calculus I', 'Introduction to differential and integral calculus.', NOW(), NOW()),
(UUID(), (SELECT id FROM subjects WHERE name = 'History'), NULL, UUID(), 'World History', 'Survey of major events in world history.', NOW(), NOW()),
(UUID(), (SELECT id FROM subjects WHERE name = 'History'), NULL, UUID(), 'US History', 'Survey of major events in the history of the United States.', NOW(), NOW()),
(UUID(), (SELECT id FROM subjects WHERE name = 'History'), NULL, UUID(), 'Ancient Civilizations', 'Study of ancient cultures and civilizations.', NOW(), NOW()),
(UUID(), (SELECT id FROM subjects WHERE name = 'Physics'), NULL, UUID(), 'Mechanics', 'Study of motion and forces.', NOW(), NOW()),
(UUID(), (SELECT id FROM subjects WHERE name = 'Physics'), NULL, UUID(), 'Electromagnetism', 'Study of electricity and magnetism.', NOW(), NOW()),
(UUID(), (SELECT id FROM subjects WHERE name = 'Physics'), NULL, UUID(), 'Quantum Physics', 'Study of quantum mechanics and phenomena.', NOW(), NOW()),
(UUID(), (SELECT id FROM subjects WHERE name = 'Literature'), NULL, UUID(), 'Shakespearean Literature', 'Study of works by William Shakespeare.', NOW(), NOW()),
(UUID(), (SELECT id FROM subjects WHERE name = 'Literature'), NULL, UUID(), 'Modern American Literature', 'Study of contemporary American literary works.', NOW(), NOW()),
(UUID(), (SELECT id FROM subjects WHERE name = 'Literature'), NULL, UUID(), 'Poetry Analysis', 'Analysis and interpretation of poetry.', NOW(), NOW()),
(UUID(), (SELECT id FROM subjects WHERE name = 'Biology'), NULL, UUID(), 'Cell Biology', 'Study of cellular structure and function.', NOW(), NOW()),
(UUID(), (SELECT id FROM subjects WHERE name = 'Biology'), NULL, UUID(), 'Genetics', 'Study of genes and heredity.', NOW(), NOW()),
(UUID(), (SELECT id FROM subjects WHERE name = 'Biology'), NULL, UUID(), 'Ecology', 'Study of interactions between organisms and their environment.', NOW(), NOW());
