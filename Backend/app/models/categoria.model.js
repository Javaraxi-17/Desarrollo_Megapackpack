module.exports = (sequelize, Sequelize) => {
  const Categoria = sequelize.define('Categoria', {
    id_categoria: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID_CATEGORIA' // Nombre exacto de la columna
    },
    nombre: {
      type: Sequelize.STRING(100),
      allowNull: false,
      field: 'NOMBRE' // Nombre exacto de la columna
    }
  }, {
    tableName: 'CATEGORIAS',  // Nombre exacto de la tabla
    schema: 'MEGAPACK',
    timestamps: false
  });

  return Categoria;
};
