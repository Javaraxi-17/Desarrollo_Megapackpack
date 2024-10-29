// department_lookup.model.js
module.exports = (sequelize, Sequelize) => {
  const DepartmentLookup = sequelize.define('DepartmentLookup', {
    department_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'DEPARTMENT_ID'  // Nombre exacto de la columna en mayúsculas
    },
    department: {
      type: Sequelize.STRING(2000), // Cambiado a 2000 caracteres
      allowNull: false,
      field: 'DEPARTMENT'  // Nombre exacto de la columna en mayúsculas
    }
  }, {
    tableName: 'MGDEPARTMENT_LOOKUP',  // Nombre de la tabla con prefijo MG y en mayúsculas
    schema: 'ADMIN',
    timestamps: false
  });

  return DepartmentLookup;
};
