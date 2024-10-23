// products.model.js
module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define('Product', {
      id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
      },
      sku: {
          type: Sequelize.STRING(100),
          allowNull: false
      },
      product_name: {
          type: Sequelize.STRING(255),
          allowNull: false
      },
      unit_price: {
          type: Sequelize.DECIMAL(10, 2)
      },
      product_details: {
          type: Sequelize.TEXT,  // Usar CLOB en vez de JSONB
          allowNull: true,
          // Validación para que el campo contenga un JSON válido
          validate: {
              isJson(value) {
                  try {
                      JSON.parse(value);  // Intentar parsear a JSON
                  } catch (e) {
                      throw new Error('Invalid JSON format for product_details');
                  }
              }
          }
      },
      product_image: {
          type: Sequelize.BLOB
      },
      image_mime_type: {
          type: Sequelize.STRING(512)
      },
      image_filename: {
          type: Sequelize.STRING(512)
      },
      image_charset: {
          type: Sequelize.STRING(512)
      },
      image_last_updated: {
          type: Sequelize.DATE
      },
      color_id: {
          type: Sequelize.INTEGER
      },
      department_id: {
          type: Sequelize.INTEGER
      },
      clothing_id: {
          type: Sequelize.INTEGER
      }
  }, {
      tableName: 'products',
      schema: 'ADMIN',
      timestamps: false
  });

  return Product;
};
