// clothing_lookup.model.js
module.exports = (sequelize, Sequelize) => {
  const ClothingLookup = sequelize.define('ClothingLookup', {
    clothing_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'CLOTHING_ID'  // Nombre exacto de la columna en mayúsculas
    },
    clothing: {
      type: Sequelize.STRING(2000), // Cambiado a 2000 caracteres
      allowNull: false,
      field: 'CLOTHING'  // Nombre exacto de la columna en mayúsculas
    }
  }, {
    tableName: 'MGCLOTHING_LOOKUP',  // Nombre de la tabla con prefijo MG y en mayúsculas
    schema: 'ADMIN',
    timestamps: false
  });

  return ClothingLookup;
};
