// orders.model.js
module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define(
    "Order",
    {
      order_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'ORDER_ID', // Nombre exacto de la columna en mayúsculas
        comment: 'Auto-incrementing primary key'
      },
      order_datetime: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'ORDER_DATETIME',
        comment: 'When the order was placed'
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'CUSTOMER_ID',
        comment: 'Who placed this order'
      },
      order_status: {
        type: Sequelize.STRING(10),
        allowNull: false,
        field: 'ORDER_STATUS',
        validate: {
          isIn: [['CANCELLED', 'COMPLETE', 'OPEN', 'PAID', 'REFUNDED', 'SHIPPED']],
        },
        comment: `What state the order is in. Valid values are:
        OPEN - the order is in progress.
        PAID - money has been received from the customer for this order.
        SHIPPED - the products have been dispatched to the customer.
        COMPLETE - the customer has received the order.
        CANCELLED - the customer has stopped the order.
        REFUNDED - there has been an issue with the order and the money has been returned to the customer.`
      },
      store_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'STORE_ID',
        comment: 'Where this order was placed'
      }
    },
    {
      tableName: "MGORDERS", // Tabla en mayúsculas
      schema: "ADMIN",
      timestamps: false,
      comment: "Details of who made purchases where"
    }
  );

  Order.associate = function (models) {
    Order.belongsTo(models.Customer, {
      foreignKey: "customer_id",
      onDelete: "CASCADE",
      constraints: true
    });

    Order.belongsTo(models.Store, {
      foreignKey: "store_id",
      onDelete: "CASCADE",
      constraints: true
    });
  };

  return Order;
};
