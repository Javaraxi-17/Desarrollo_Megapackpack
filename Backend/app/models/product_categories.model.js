module.exports = (sequelize, Sequelize) => {
    const ProductCategory = sequelize.define('ProductCategory', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'  // Nombre exacto de la columna en la base de datos
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
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'category_id',  // Nombre exacto de la columna
        references: {
          model: 'categories',  // Relación con la tabla categories
          key: 'id'
        }
      }
    }, {
      tableName: 'product_categories',  // Nombre exacto de la tabla
      schema: 'MEGAPACK',
      timestamps: false
    });
  
    return ProductCategory;
  };
  