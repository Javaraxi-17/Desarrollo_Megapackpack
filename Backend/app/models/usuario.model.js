module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define('Usuario', {
    id_usuario: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID_USUARIO'
    },
    nombre_usuario: {
      type: Sequelize.STRING(50),
      unique: true,
      allowNull: false,
      field: 'NOMBRE_USUARIO'
    },
    email: {
      type: Sequelize.STRING(100),
      unique: true,
      allowNull: false,
      field: 'EMAIL'
    },
    contrasena: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: 'CONTRASENA'
    },
    id_rol: {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'ROLES',
          schema: 'MEGAPACK'
        },
        key: 'ID_ROL'
      },
      field: 'ID_ROL'
    },
    fecha_creacion: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field: 'FECHA_CREACION'
    }
  }, {
    tableName: 'USUARIOS',
    schema: 'MEGAPACK',
    timestamps: false
  });

  return Usuario;
};
