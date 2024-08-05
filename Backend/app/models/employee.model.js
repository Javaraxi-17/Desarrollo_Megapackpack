// app/models/employee.model.js
module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee", {
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.STRING
      },
      salary: {
        type: Sequelize.FLOAT
      },
      hireDate: {
        type: Sequelize.DATE
      }
    });
  
    return Employee;
  };
  