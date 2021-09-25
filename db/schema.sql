DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(30) NOT NULL
);
CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary INT,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);
CREATE TABLE employee (
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);
