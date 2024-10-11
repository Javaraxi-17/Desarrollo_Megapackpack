module.exports = (sequelize, Sequelize) => {
    const OrderDetail = sequelize.define('OrderDetail', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'  // Nombre exacto de la columna en la base de datos
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'order_id',  // Nombre exacto de la columna
        references: {
          model: 'orders',  // Relación con la tabla orders
          key: 'id'
        }
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'product_id',  // Nombre exacto de la columna
        references: {
          model: 'products',  // Relación con la tabla products
          key: 'id'
        }
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        field: 'price'  // Nombre exacto de la columna
      },
      sku: {
        type: Sequelize.STRING(100),
        allowNull: false,
        field: 'sku'  // Nombre exacto de la columna
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'quantity'  // Nombre exacto de la columna
      }
    }, {
      tableName: 'order_details',  // Nombre exacto de la tabla
      schema: 'MEGAPACK',
      timestamps: false
    });
  
    return OrderDetail;
  };
  