module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      store_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      shipping_address: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      order_address: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      order_email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      order_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      order_status: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    },
    {
      tableName: "orders",
      schema: "MEGAPACK", // Asegúrate de especificar el esquema correcto
      timestamps: false,
    }
  );

  Order.associate = function (models) {
    // Asociación con la tabla Customers
    Order.belongsTo(models.Customer, {
      foreignKey: "customer_id",
      onDelete: "CASCADE",
    });

    // Asociación con la tabla Stores, asegurándose de que el esquema sea MEGAPACK
    Order.belongsTo(models.Store, {
      foreignKey: "store_id",
      onDelete: "CASCADE",
    });
  };

  return Order;
};
