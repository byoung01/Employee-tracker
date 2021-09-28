const inquirer = require("inquirer");

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
        //renderRoles()
      } else if (choice == "View all employees") {
        //renderEmployees()
      } else if (choice == "Add department") {
        //addDept()
      } else if (choice == "Add role") {
        //addRole()
      } else if (choice == "Add employee") {
        //addEmployee()
      } else if (choice == "Update employee role") {
        //updateEmployee()
      }
    });
};
const renderDept = () => {};
