module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define('Order', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'  // Nombre exacto de la columna en la base de datos
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'customer_id',  // Nombre exacto de la columna
        references: {
          model: 'customers',  // Relación con la tabla customers
          key: 'id'
        }
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        field: 'amount'  // Nombre exacto de la columna
      },
      shipping_address: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'shipping_address'  // Nombre exacto de la columna
      },
      order_address: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'order_address'  // Nombre exacto de la columna
      },
      order_email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        field: 'order_email'  // Nombre exacto de la columna
      },
      order_date: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'order_date'  // Nombre exacto de la columna
      },
      order_status: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: 'order_status'  // Nombre exacto de la columna
      }
    }, {
      tableName: 'orders',  // Nombre exacto de la tabla
      schema: 'MEGAPACK',
      timestamps: false
    });
  
    return Order;
  };
  