
INSERT INTO department (name) VALUES 
('Engineering'),
('Finance'),
('Human Resources'),
('Marketing'),
('Sales');


INSERT INTO role (title, salary, department_id) VALUES 
('Software Engineer', 90000, 1),
('Data Scientist', 95000, 1),
('Accountant', 75000, 2),
('HR Manager', 80000, 3),
('Marketing Coordinator', 70000, 4),
('Sales Representative', 65000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('Alice', 'Johnson', 1, NULL), 
('Bob', 'Smith', 2, 1),
('Charlie', 'Brown', 3, NULL),
('Diana', 'Prince', 4, NULL),
('Eve', 'Adams', 5, 4),
('Frank', 'Miller', 6, NULL);
