module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define('Product', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'  // Nombre exacto de la columna en la base de datos
    },
    sku: {
      type: Sequelize.STRING(100),
      allowNull: false,
      field: 'sku'  // Nombre exacto de la columna
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
      field: 'name'  // Nombre exacto de la columna
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      field: 'price'  // Nombre exacto de la columna
    },
    weight: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
      field: 'weight'  // Nombre exacto de la columna
    },
    descriptions: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: 'descriptions'  // Nombre exacto de la columna
    },
    thumbnail: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'thumbnail'  // Nombre exacto de la columna
    },
    image: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'image'  // Nombre exacto de la columna
    },
    category: {
      type: Sequelize.STRING(100),
      allowNull: true,
      field: 'category'  // Relación categórica
    },
    create_date: {
      type: Sequelize.DATE,
      allowNull: true,
      field: 'create_date'  // Fecha de creación del producto
    },
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'stock'  // Nombre exacto de la columna
    }
  }, {
    tableName: 'products',  // Nombre de la tabla en plural según convención
    schema: 'MEGAPACK',
    timestamps: false
  });

  return Product;
};
