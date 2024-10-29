// orderItems.model.js
module.exports = (sequelize, Sequelize) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: 'ORDER_ID',
        references: {
          model: 'MGORDERS',
          key: 'ORDER_ID'
        },
        onDelete: 'CASCADE',
        comment: 'The order these products belong to'
      },
      line_item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: 'LINE_ITEM_ID',
        comment: 'An incrementing number, starting at one for each order'
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'PRODUCT_ID',
        references: {
          model: 'MGPRODUCTS',
          key: 'PRODUCT_ID'
        },
        onDelete: 'CASCADE',
        comment: 'Which item was purchased'
      },
      unit_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        field: 'UNIT_PRICE',
        comment: 'How much the customer paid for one item of the product'
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'QUANTITY',
        comment: 'How many items of this product the customer purchased'
      }
    },
    {
      tableName: "MGORDER_ITEMS",
      schema: "ADMIN",
      timestamps: false,
      comment: "Details of which products the customer has purchased in an order"
    }
  );

  OrderItem.associate = function (models) {
    OrderItem.belongsTo(models.Order, {
      foreignKey: "order_id",
      targetKey: "ORDER_ID",
      onDelete: "CASCADE",
      constraints: true
    });

    OrderItem.belongsTo(models.Product, {
      foreignKey: "product_id",
      targetKey: "PRODUCT_ID",
      onDelete: "CASCADE",
      constraints: true
    });
  };

  return OrderItem;
};
