// department_lookup.model.js
module.exports = (sequelize, Sequelize) => {
    const DepartmentLookup = sequelize.define('DepartmentLookup', {
      department_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'department_id'  // Nombre exacto de la columna
      },
      department: {
        type: Sequelize.STRING(2000), // Cambiado a 2000 caracteres
        allowNull: false,
        field: 'department'  // Nombre exacto de la columna
      }
    }, {
      tableName: 'DEPARTMENT_LOOKUP',  // Nombre exacto de la tabla
      schema: 'MEGAPACK',
      timestamps: false
    });
  
    return DepartmentLookup;
  };
  