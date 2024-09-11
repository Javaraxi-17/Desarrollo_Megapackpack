module.exports = (sequelize, Sequelize) => {
  const Producto = sequelize.define('Producto', {
    id_producto: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'ID_PRODUCTO' // Nombre exacto de la columna
    },
    nombre: {
      type: Sequelize.STRING(100),
      allowNull: false,
      field: 'NOMBRE' // Nombre exacto de la columna
    },
    descripcion: {
      type: Sequelize.TEXT,
      field: 'DESCRIPCION' // Nombre exacto de la columna
    },
    precio: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      field: 'PRECIO' // Nombre exacto de la columna
    },
    id_categoria: {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'CATEGORIAS',
          schema: 'MEGAPACK'
        },
        key: 'ID_CATEGORIA' // Nombre exacto de la columna en la relación
      },
      field: 'ID_CATEGORIA' // Nombre exacto de la columna
    },
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'STOCK' // Nombre exacto de la columna
    },
    es_mayorista: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      field: 'ES_MAYORISTA' // Nombre exacto de la columna
    },
    imagen_url: {
      type: Sequelize.STRING(500), // Campo adecuado para almacenar URLs largas
      field: 'IMAGEN_URL' // Nombre exacto de la columna
    }
  }, {
    tableName: 'PRODUCTOS',  // Nombre exacto de la tabla
    schema: 'MEGAPACK',
    timestamps: false
  });

  return Producto;
};
