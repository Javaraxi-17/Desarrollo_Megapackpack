// color_lookup.model.js
module.exports = (sequelize, Sequelize) => {
  const ColorLookup = sequelize.define('ColorLookup', {
    color_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'COLOR_ID'  // Nombre exacto de la columna en mayúsculas
    },
    color: {
      type: Sequelize.STRING(2000), // Cambiado a 2000 caracteres
      allowNull: false,
      field: 'COLOR'  // Nombre exacto de la columna en mayúsculas
    }
  }, {
    tableName: 'MGCOLOR_LOOKUP',  // Nombre de la tabla con prefijo MG y en mayúsculas
    schema: 'ADMIN',
    timestamps: false
  });

  return ColorLookup;
};
