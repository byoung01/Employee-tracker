const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employees_db",
});
db.connect((error) => {
  if (error) throw error;
  mainQuestions();
});

const mainQuestions = () => {
  inquirer
    .prompt([
      {
        name: "choices",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all deparatments",
          "View all roles",
          "View all employees",
          "Add department",
          "Add role",
          "Add employee",
          "Update employee role",
        ],
      },
    ])
    .then((answers) => {
      const { choices } = answers;
      if (choices == "View all deparatments") {
        renderDept();
      } else if (choices == "View all roles") {
        console.log("made it");
        renderRoles();
      } else if (choices == "View all employees") {
        renderEmployees();
      } else if (choices == "Add department") {
        addDept();
      } else if (choices == "Add role") {
        addRole();
      } else if (choices == "Add employee") {
        //addEmployee()
      } else if (choices == "Update employee role") {
        //updateEmployee()
      }
    });
};
const renderDept = () => {
  db.query("SELECT * FROM department", function (err, result) {
    console.table(result);
    mainQuestions();
  });
};
const renderRoles = () => {
  db.query(
    `SELECT roles.r_id, roles.title, roles.salary, department.name
    FROM roles JOIN department ON roles.department_id = department.d_id`,
    function (err, result) {
      console.table(result);
      mainQuestions();
    }
  );
};
const renderEmployees = () => {
  db.query(
    `SELECT employee.id, 
    employee.first_name, 
    employee.last_name, 
    employee.manager_id, 
    roles.title, 
    roles.salary, 
    department.name
    FROM employee
    JOIN roles ON roles.r_id = employee.role_id
    JOIN department 
    ON department.d_id = roles.department_id`,

    function (err, result) {
      console.table(result);
      mainQuestions();
    }
  );
};
const addDept = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What's departments name?",
      },
    ])
    .then((response) => {
      const { name } = response;
      db.query(
        `INSERT INTO department (name) VALUES (?)`,
        name,
        (err, result) => {
          if (err) throw err;
          console.log("New department added");
          mainQuestions();
        }
      );
    });
};
const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the new roles name?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the new roles salary?",
      },
      // {
      //   type: "list",
      //   name: "dept",
      //   message: "What is the employee's department?",
      //   choices: "SELECT department.name FROM department",
      // },
    ])
    .then((response) => {
      const { title, salary } = response;
      console.log(title);
      console.log(salary);
      db.query(
        `INSERT INTO roles (title, salary) VALUES (?, ?)`,
        [title, salary],
        (err, result) => {
          if (err) throw bruh;
          mainQuestions();
        }
      );
    });
};
