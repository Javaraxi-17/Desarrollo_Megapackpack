module.exports = (sequelize, Sequelize) => {
  const Producto = sequelize.define('Producto', {
    productId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'PRODUCT_ID'  // Nombre exacto de la columna
    },
    productSku: {
      type: Sequelize.STRING(100),
      allowNull: false,
      field: 'PRODUCT_SKU'  // Nombre exacto de la columna
    },
    productName: {
      type: Sequelize.STRING(100),
      allowNull: false,
      field: 'PRODUCT_NAME'  // Nombre exacto de la columna
    },
    productPrice: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      field: 'PRODUCT_PRICE'  // Nombre exacto de la columna
    },
    productShortName: {
      type: Sequelize.STRING(50),
      allowNull: true,
      field: 'PRODUCT_SHORT_NAME'  // Nombre exacto de la columna
    },
    productDescription: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'PRODUCT_DESCRIPTION'  // Nombre exacto de la columna
    },
    createdDate: {
      type: Sequelize.DATE,
      allowNull: true,
      field: 'CREATED_DATE'  // Nombre exacto de la columna
    },
    deliveryTimeSpan: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'DELIVERY_TIME_SPAN'  // Nombre exacto de la columna
    },
    categoryId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'CATEGORY_ID',  // Asegúrate de que este nombre sea correcto
      references: {
        model: {
          tableName: 'CATEGORIAS',  // Tabla de categorías
          schema: 'MEGAPACK'
        },
        key: 'CATEGORY_ID'  // Llave primaria de la tabla de categorías
      }
    },
    productImageUrl: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'PRODUCT_IMAGE_URL'  // Nombre exacto de la columna
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'USER_ID',  // Llave foránea a la tabla de usuarios
      references: {
        model: {
          tableName: 'USUARIOS',  // Tabla de usuarios
          schema: 'MEGAPACK'
        },
        key: 'ID_USUARIO'  // Llave primaria de la tabla de usuarios
      }
    }
  }, {
    tableName: 'PRODUCTOS',
    schema: 'MEGAPACK',
    timestamps: false
  });

  return Producto;
};
