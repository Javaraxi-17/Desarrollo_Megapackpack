// color_lookup.model.js
module.exports = (sequelize, Sequelize) => {
    const ColorLookup = sequelize.define('ColorLookup', {
      color_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'color_id'  // Nombre exacto de la columna
      },
      color: {
        type: Sequelize.STRING(2000), // Cambiado a 2000 caracteres
        allowNull: false,
        field: 'color'  // Nombre exacto de la columna
      }
    }, {
      tableName: 'COLOR_LOOKUP',  // Nombre exacto de la tabla
      schema: 'MEGAPACK',
      timestamps: false
    });
  
    return ColorLookup;
  };
  