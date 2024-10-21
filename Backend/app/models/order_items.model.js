// order_items.model.js
module.exports = (sequelize, Sequelize) => {
    const OrderItem = sequelize.define('OrderItem', {
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'order_id',
        references: {
          model: 'orders',
          key: 'id'
        }
      },
      line_item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'line_item_id'
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'product_id',
        references: {
          model: 'products',
          key: 'id'
        }
      },
      unit_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        field: 'unit_price'
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'quantity'
      }
    }, {
      tableName: 'order_items',
      schema: 'MEGAPACK',
      timestamps: false
    });
  
    return OrderItem;
  };
  