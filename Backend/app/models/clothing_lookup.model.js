// clothing_lookup.model.js
module.exports = (sequelize, Sequelize) => {
    const ClothingLookup = sequelize.define('ClothingLookup', {
      clothing_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'clothing_id'  // Nombre exacto de la columna
      },
      clothing: {
        type: Sequelize.STRING(2000), // Cambiado a 2000 caracteres
        allowNull: false,
        field: 'clothing'  // Nombre exacto de la columna
      }
    }, {
      tableName: 'CLOTHING_LOOKUP',  // Nombre exacto de la tabla
      schema: 'MEGAPACK',
      timestamps: false
    });
  
    return ClothingLookup;
  };
  