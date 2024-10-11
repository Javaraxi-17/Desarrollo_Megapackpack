module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define('Category', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,  // Clave primaria
      autoIncrement: true,
      field: 'id'  // Nombre exacto de la columna en la base de datos
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
      field: 'name'  // Nombre exacto de la columna
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,  // Puede ser NULL
      field: 'description'  // Nombre exacto de la columna
    },
    thumbnail: {
      type: Sequelize.STRING(255),
      allowNull: true,  // Puede ser NULL
      field: 'thumbnail'  // Nombre exacto de la columna
    }
  }, {
    tableName: 'categories',  // Nombre exacto de la tabla
    schema: 'MEGAPACK',
    timestamps: false
  });

  return Category;
};
