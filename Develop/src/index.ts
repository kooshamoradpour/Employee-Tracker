import inquirer from 'inquirer';
import {viewDepartments,viewRoles,viewEmployees,addDepartment,addRole,addEmployee,updateEmployeeRole,} from './db/index.js';
import dotenv from 'dotenv';


dotenv.config();

async function mainMenu() {
  let running = true;
  while (running) {
    try {
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
          await viewDepartments();
          break;
        case 'View all roles':
          await viewRoles();
          break;
        case 'View all employees':
          await viewEmployees();
          break;
        case 'Add a department':
          await addDepartment();
          break;
        case 'Add a role':
          await addRole();
          break;
        case 'Add an employee':
          await addEmployee();
          break;
        case 'Update an employee role':
          await updateEmployeeRole();
          break;
        case 'Exit':
          console.log('Goodbye!');
          running = false;
          break;
      }
    } catch (err) {
      console.error('An error occurred:', err);
    }
  }
}

mainMenu().catch((err) => console.error('Unexpected error:', err));