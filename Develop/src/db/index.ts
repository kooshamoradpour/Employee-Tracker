import inquirer from 'inquirer';
import { Pool } from 'pg';
import { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } from '../index';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

async function mainMenu() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    },
  ]);

  switch (action) {
    case 'View all departments':
      await viewDepartments(pool);
      break;
    case 'View all roles':
      await viewRoles(pool);
      break;
    case 'View all employees':
      await viewEmployees(pool);
      break;
    case 'Add a department':
      await addDepartment(pool);
      break;
    case 'Add a role':
      await addRole(pool);
      break;
    case 'Add an employee':
      await addEmployee(pool);
      break;
    case 'Update an employee role':
      await updateEmployeeRole(pool);
      break;
    case 'Exit':
      console.log('Goodbye!');
      pool.end();
      return;
  }
  mainMenu();
}

mainMenu().catch((err) => console.error(err));




