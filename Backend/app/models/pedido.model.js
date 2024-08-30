module.exports = (sequelize, Sequelize) => {
  const Pedido = sequelize.define('Pedido', {
    id_pedido: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID_PEDIDO'
    },
    id_cliente: {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'CLIENTES',
          schema: 'MEGAPACK'
        },
        key: 'ID_CLIENTE'
      },
      field: 'ID_CLIENTE'
    },
    fecha_pedido: {
      type: Sequelize.DATE,
      allowNull: false,
      field: 'FECHA_PEDIDO'
    },
    total: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      field: 'TOTAL'
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
    tableName: 'PEDIDOS',
    schema: 'MEGAPACK',
    timestamps: false
  });

  return Pedido;
};
