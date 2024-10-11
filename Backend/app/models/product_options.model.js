module.exports = (sequelize, Sequelize) => {
    const ProductOption = sequelize.define('ProductOption', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'  // Nombre exacto de la columna en la base de datos
      },
      option_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'option_id',  // Nombre exacto de la columna
        references: {
          model: 'options',  // Relación con la tabla options
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
      }
    }, {
      tableName: 'product_options',  // Nombre exacto de la tabla
      schema: 'MEGAPACK',
      timestamps: false
    });
  
    return ProductOption;
  };
  