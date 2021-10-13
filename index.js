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
          "View all departments",
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
      if (choices == "View all departments") {
        renderDept();
      } else if (choices === "View all roles") {
        renderRoles();
      } else if (choices === "View all employees") {
        renderEmployees();
      } else if (choices === "Add department") {
        addDept();
      } else if (choices === "Add role") {
        addRole();
      } else if (choices === "Add employee") {
        addEmployee();
      } else {
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
  db.query("SELECT * FROM department", function (err, result) {
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
        {
          type: "list",
          name: "dept",
          message: "What is the department?",
          choices: result.map((item) => ({
            name: item.name,
            value: item.d_id,
          })),
        },
      ])
      .then((response) => {
        const { title, salary, dept } = response;
        db.query(
          `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`,
          [title, salary, dept],
          (err, result) => {
            if (err) throw err;
            mainQuestions();
          }
        );
      });
  });
};

const addEmployee = () => {
  db.query("SELECT * FROM roles", function (err, result) {
    inquirer
      .prompt([
        {
          type: "input",
          name: "first",
          message: "first name?",
        },
        {
          type: "input",
          name: "last",
          message: "last name?",
        },
        {
          type: "list",
          name: "role",
          message: "What is the employee's role?",
          choices: result.map((item) => ({
            name: item.title,
            value: item.r_id,
          })),
        },
      ])
      .then((response) => {
        const { first, last, role } = response;
        db.query(
          `INSERT INTO employee (last_name, first_name, role_id) VALUES (?, ?, ?)`,
          [first, last, role],
          mainQuestions(),
          (err, result) => {
            if (err) throw err;
          }
        );
        // db.query("SELECT * FROM employee", function (err, result) {
        //   console.log(result);
        //   inquirer
        //     .prompt([
        //       {
        //         type: "list",
        //         name: "manager",
        //         message: "Who is the employee's manager?",
        //         choices: result.map((item) => ({
        //           name: item.first_name,
        //           value: item.manager_id,
        //         })),
        //       },
        //     ])
        //     .then((response) => {
        //       console.log(response);
        //       const { manager } = response;
        //       console.log(manager);
        //       db.query(
        //         `INSERT INTO employee (manager_id) VALUES ( ?)`,
        //         [manager],
        //         (err, result) => {
        //           if (err) throw err;
        //           // mainQuestions();
        //         }
        //       );
        //       console.log(response);
        //     });
        // });
      });
  });
};
