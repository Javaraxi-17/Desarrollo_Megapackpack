module.exports = (sequelize, Sequelize) => {
  const Pedido = sequelize.define('Pedido', {
    saleId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'SALE_ID' // Nombre exacto de la columna
    },
    custId: {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'CLIENTES', // Nombre exacto de la tabla de Clientes
          schema: 'MEGAPACK'
        },
        key: 'CUST_ID' // Nombre exacto de la columna en la relación
      },
      field: 'CUST_ID' // Nombre exacto de la columna
    },
    saleDate: {
      type: Sequelize.DATE,
      allowNull: false,
      field: 'SALE_DATE' // Nombre exacto de la columna
    },
    totalInvoiceAmount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      field: 'TOTAL_INVOICE_AMOUNT' // Nombre exacto de la columna
    },
    discount: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
      field: 'DISCOUNT' // Nombre exacto de la columna
    },
    paymentNaration: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'PAYMENT_NARATION' // Nombre exacto de la columna
    },
    deliveryAddress1: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'DELIVERY_ADDRESS_1' // Nombre exacto de la columna
    },
    deliveryAddress2: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'DELIVERY_ADDRESS_2' // Nombre exacto de la columna
    },
    deliveryCity: {
      type: Sequelize.STRING(100),
      allowNull: true,
      field: 'DELIVERY_CITY' // Nombre exacto de la columna
    },
    deliveryPinCode: {
      type: Sequelize.STRING(20),
      allowNull: true,
      field: 'DELIVERY_PIN_CODE' // Nombre exacto de la columna
    },
    deliveryLandMark: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'DELIVERY_LANDMARK' // Nombre exacto de la columna
    },
    isCanceled: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'IS_CANCELED' // Nombre exacto de la columna
    }
  }, {
    tableName: 'PEDIDOS',  // Nombre exacto de la tabla
    schema: 'MEGAPACK',
    timestamps: false
  });

  return Pedido;
};
