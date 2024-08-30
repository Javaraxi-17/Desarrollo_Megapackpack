module.exports = (sequelize, Sequelize) => {
  const Cliente = sequelize.define('Cliente', {
    id_cliente: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID_CLIENTE' // Forzando el uso del nombre exacto de la columna
    },
    nombre: {
      type: Sequelize.STRING(100),
      allowNull: false,
      field: 'NOMBRE'
    },
    telefono: {
      type: Sequelize.STRING(20),
      field: 'TELEFONO'
    },
    direccion: {
      type: Sequelize.TEXT,
      field: 'DIRECCION'
    },
    es_mayorista: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'ES_MAYORISTA'
    },
    id_usuario: {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'USUARIOS',
          schema: 'MEGAPACK'
        },
        key: 'ID_USUARIO'
      },
      field: 'ID_USUARIO'
    }
  }, {
    tableName: 'CLIENTES',
    schema: 'MEGAPACK',
    timestamps: false
  });

  return Cliente;
};
