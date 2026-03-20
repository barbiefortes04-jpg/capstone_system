CREATE DATABASE IF NOT EXISTS srms
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE srms;

DROP TABLE IF EXISTS thesis_submissions;
DROP TABLE IF EXISTS teacher_feedback;
DROP TABLE IF EXISTS admins;
DROP TABLE IF EXISTS teachers;
DROP TABLE IF EXISTS students;

CREATE TABLE students (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  course ENUM('IT', 'CPE', 'CE') NOT NULL,
  role ENUM('STUDENT', 'TEACHER', 'ADMIN') NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE teachers (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  course ENUM('IT', 'CPE', 'CE') NOT NULL,
  role ENUM('STUDENT', 'TEACHER', 'ADMIN') NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE admins (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  course ENUM('IT', 'CPE', 'CE') NOT NULL,
  role ENUM('STUDENT', 'TEACHER', 'ADMIN') NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE teacher_feedback (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  student_email VARCHAR(255) NOT NULL,
  chapter VARCHAR(120) NOT NULL,
  action VARCHAR(20) NOT NULL,
  request_text TEXT NOT NULL,
  teacher_name VARCHAR(200) NOT NULL,
  created_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY teacher_feedback_student_email_index (student_email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE thesis_submissions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  student_email VARCHAR(255) NOT NULL,
  title VARCHAR(150) NOT NULL,
  notes TEXT NULL,
  file_name VARCHAR(255) NOT NULL,
  stored_path VARCHAR(255) NOT NULL,
  status VARCHAR(80) NOT NULL DEFAULT 'Submitted for adviser review',
  created_at TIMESTAMP NULL DEFAULT NULL,
  updated_at TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY thesis_submissions_student_email_index (student_email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
