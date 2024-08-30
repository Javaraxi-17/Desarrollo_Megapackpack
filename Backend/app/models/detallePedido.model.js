module.exports = (sequelize, Sequelize) => {
  const DetallePedido = sequelize.define('DetallePedido', {
    id_detalle: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID_DETALLE' // Nombre exacto de la columna
    },
    id_pedido: {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'PEDIDOS',
          schema: 'MEGAPACK'
        },
        key: 'ID_PEDIDO' // Nombre exacto de la columna en la relación
      },
      field: 'ID_PEDIDO' // Nombre exacto de la columna
    },
    id_producto: {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'PRODUCTOS',
          schema: 'MEGAPACK'
        },
        key: 'ID_PRODUCTO' // Nombre exacto de la columna en la relación
      },
      field: 'ID_PRODUCTO' // Nombre exacto de la columna
    },
    cantidad: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'CANTIDAD' // Nombre exacto de la columna
    },
    precio_unitario: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      field: 'PRECIO_UNITARIO' // Nombre exacto de la columna
    },
    subtotal: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      field: 'SUBTOTAL' // Nombre exacto de la columna
    }
  }, {
    tableName: 'DETALLESPEDIDO',  // Nombre exacto de la tabla
    schema: 'MEGAPACK',
    timestamps: false
  });

  return DetallePedido;
};
