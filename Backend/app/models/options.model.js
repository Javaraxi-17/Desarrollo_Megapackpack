// options.model.js
module.exports = (sequelize, Sequelize) => {
  const Option = sequelize.define('Option', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    option_name: {
      type: Sequelize.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'options',
    schema: 'MEGAPACK',  // Asegúrate de que el esquema esté correcto
    timestamps: false
  });

  return Option;
};
