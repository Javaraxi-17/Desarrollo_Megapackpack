module.exports = (sequelize, Sequelize) => {
  const Categoria = sequelize.define('Categoria', {
    categoryId: {
      type: Sequelize.INTEGER,
      primaryKey: true,  // Ya es clave primaria en la base de datos
      autoIncrement: true,
      field: 'CATEGORY_ID'  // Este nombre debe coincidir con la columna en la base de datos
    },
    categoryName: {
      type: Sequelize.STRING(100),
      allowNull: false,  // Ya es NOT NULL en la base de datos
      field: 'CATEGORY_NAME'
    },
    parentCategoryId: {
      type: Sequelize.INTEGER,
      allowNull: true,  // Esta columna puede ser NULL
      field: 'PARENT_CATEGORY_ID'
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,  // Ya es NOT NULL en la base de datos
      field: 'USER_ID'
    }
  }, {
    tableName: 'CATEGORIAS',
    schema: 'MEGAPACK',
    timestamps: false
  });

  return Categoria;
};


