// carrito.model.js
module.exports = (sequelize, Sequelize) => {
    const Carrito = sequelize.define('Carrito', {
      cartId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'CART_ID'  // Nombre exacto de la columna
      },
      custId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'CUST_ID',  // Nombre exacto de la columna
        references: {
          model: {
            tableName: 'CLIENTES',
            schema: 'MEGAPACK'
          },
          key: 'CUST_ID'  // Llave foránea de la tabla CLIENTES
        }
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'PRODUCT_ID',  // Nombre exacto de la columna
        references: {
          model: {
            tableName: 'PRODUCTOS',
            schema: 'MEGAPACK'
          },
          key: 'PRODUCT_ID'  // Llave foránea de la tabla PRODUCTOS
        }
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'QUANTITY'  // Nombre exacto de la columna
      },
      addedDate: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'ADDED_DATE',  // Nombre exacto de la columna
        defaultValue: Sequelize.NOW  // Establecer la fecha por defecto
      }
    }, {
      tableName: 'CARRITO',
      schema: 'MEGAPACK',
      timestamps: false
    });
  
    return Carrito;
  };
  