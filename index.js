const inquirer = require("inquirer");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "movies_db",
  },
  console.log(`Connected to the movies_db database.`)
);

const mainQuestions = () => {
  inquirer
    .prompt([
      {
        name: "initial choice",
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
      const { choice } = answers;
      if (choice == "View all deparatments") {
        renderDept();
      } else if (choice == "View all roles") {
        renderRoles();
      } else if (choice == "View all employees") {
        renderEmployees();
      } else if (choice == "Add department") {
        addDept();
      } else if (choice == "Add role") {
        //addRole()
      } else if (choice == "Add employee") {
        //addEmployee()
      } else if (choice == "Update employee role") {
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
    "SELECT role.r_id, role.title, role.salary, deparatment.name AS department FROM role INNER JOIN department ON role.department_id = department.d_id",
    function (err, result) {
      console.table(result);
      mainQuestions();
    }
  );
};
const renderEmployees = () => {
  db.query(
    "SELECT employee.id, employee.first_name, employee.last_name,role.title, role.salary, department.nameFROM employee, role, department WHERE department.d_id = role.department_id AND role.r_id = employees.role_id",
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
      const newDepartment = [response.name];
      console.table(newDepartment);
      db.connect = () => {
        if (err) throw err;
        let insert = "INSERT INTO department (department_name) VALUES (?)";
        db.query(insert, response.name, (err, result) => {
          if (err) throw err;
          console.log("Department has been added");
          mainQuestions();
        });
      };
    });
};
