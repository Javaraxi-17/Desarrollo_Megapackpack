module.exports = (sequelize, Sequelize) => {
  const Rol = sequelize.define('Rol', {
    id_rol: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID_ROL'
    },
    nombre: {
      type: Sequelize.STRING(50),
      allowNull: false,
      field: 'NOMBRE'
    }
  }, {
    tableName: 'ROLES',
    schema: 'MEGAPACK',
    timestamps: false
  });

  return Rol;
};
