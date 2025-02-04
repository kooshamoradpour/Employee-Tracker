import{pool} from './connection.js';
import inquirer from 'inquirer';
import 'console.table'; 

// View all departments
export async function viewDepartments() {
  try {
    const res = await pool.query('SELECT * FROM department;');
    console.table(res.rows);
  } catch (err) {
    console.error('Error fetching departments:', err);
  }
}

// View all roles
export async function viewRoles() {
  try {
    const res = await pool.query(`
      SELECT role.id, role.title, role.salary, department.name AS department 
      FROM role 
      JOIN department ON role.department_id = department.id;
    `);
    console.table(res.rows);
  } catch (err) {
    console.error('Error fetching roles:', err);
  }
}

// View all employees
export async function viewEmployees() {
  try {
    const res = await pool.query(`
      SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary,
        CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM employee e
      JOIN role ON e.role_id = role.id
      JOIN department ON role.department_id = department.id
      LEFT JOIN employee m ON e.manager_id = m.id;
    `);
    console.table(res.rows);
  } catch (err) {
    console.error('Error fetching employees:', err);
  }
}

// Add a new department
export async function addDepartment() {
  try {
    const { name } = await inquirer.prompt([
      { type: 'input', name: 'name', message: 'Enter department name:' }
    ]);
    await pool.query('INSERT INTO department (name) VALUES ($1);', [name]);
    console.log(`Department "${name}" added!`);
  } catch (err) {
    console.error('Error adding department:', err);
  }
}

// Add a new role
export async function addRole() {
  try {
    const departments = await pool.query('SELECT * FROM department;');
    const { title, salary, department_id } = await inquirer.prompt([
      { type: 'input', name: 'title', message: 'Enter role title:' },
      { type: 'input', name: 'salary', message: 'Enter salary:', validate: input => !isNaN(input) || 'Please enter a valid number' },
      { type: 'list', name: 'department_id', message: 'Select department:', choices: departments.rows.map((d: { name: any; id: any; }) => ({ name: d.name, value: d.id })) }
    ]);
    await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3);', [title, parseFloat(salary), department_id]);
    console.log(`Role "${title}" added!`);
  } catch (err) {
    console.error('Error adding role:', err);
  }
}

// Add a new employee
export async function addEmployee() {
  try {
    const roles = await pool.query('SELECT * FROM role;');
    const employees = await pool.query('SELECT * FROM employee;');
    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
      { type: 'input', name: 'first_name', message: 'Enter first name:' },
      { type: 'input', name: 'last_name', message: 'Enter last name:' },
      { type: 'list', name: 'role_id', message: 'Select role:', choices: roles.rows.map((r: { title: any; id: any; }) => ({ name: r.title, value: r.id })) },
      { type: 'list', name: 'manager_id', message: 'Select manager:', choices: [...employees.rows.map((e: { first_name: any; last_name: any; id: any; }) => ({ name: `${e.first_name} ${e.last_name}`, value: e.id })), { name: 'None', value: null }] }
    ]);
    await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4);', [first_name, last_name, role_id, manager_id]);
    console.log(`Employee "${first_name} ${last_name}" added!`);
  } catch (err) {
    console.error('Error adding employee:', err);
  }
}

// Update an employee role
export async function updateEmployeeRole() {
  try {
    const employees = await pool.query('SELECT * FROM employee;');
    const roles = await pool.query('SELECT * FROM role;');
    const { employee_id, role_id } = await inquirer.prompt([
      { type: 'list', name: 'employee_id', message: 'Select employee:', choices: employees.rows.map((e: { first_name: any; last_name: any; id: any; }) => ({ name: `${e.first_name} ${e.last_name}`, value: e.id })) },
      { type: 'list', name: 'role_id', message: 'Select new role:', choices: roles.rows.map((r: { title: any; id: any; }) => ({ name: r.title, value: r.id })) }
    ]);
    await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2;', [role_id, employee_id]);
    console.log('Employee role updated successfully!');
  } catch (err) {
    console.error('Error updating employee role:', err);
  }
}
