// store.model.js
module.exports = (sequelize, Sequelize) => {
  const Store = sequelize.define(
    "Store",
    {
      STORE_ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'STORE_ID'  // Nombre exacto de la columna en mayúsculas
      },
      STORE_NAME: {
        type: Sequelize.STRING(255),
        allowNull: false,
        field: 'STORE_NAME'  // Nombre exacto de la columna en mayúsculas
      },
      WEB_ADDRESS: {
        type: Sequelize.STRING(100),
        allowNull: true,
        field: 'WEB_ADDRESS'  // Nombre exacto de la columna en mayúsculas
      },
      PHYSICAL_ADDRESS: {
        type: Sequelize.STRING(512),
        allowNull: true,
        field: 'PHYSICAL_ADDRESS'  // Nombre exacto de la columna en mayúsculas
      },
      LATITUDE: {
        type: Sequelize.DECIMAL,
        allowNull: true,
        field: 'LATITUDE'  // Nombre exacto de la columna en mayúsculas
      },
      LONGITUDE: {
        type: Sequelize.DECIMAL,
        allowNull: true,
        field: 'LONGITUDE'  // Nombre exacto de la columna en mayúsculas
      },
      LOGO: {
        type: Sequelize.BLOB,
        allowNull: true,
        field: 'LOGO'  // Nombre exacto de la columna en mayúsculas
      },
      LOGO_MIME_TYPE: {
        type: Sequelize.STRING(512),
        allowNull: true,
        field: 'LOGO_MIME_TYPE'  // Nombre exacto de la columna en mayúsculas
      },
      LOGO_FILENAME: {
        type: Sequelize.STRING(512),
        allowNull: true,
        field: 'LOGO_FILENAME'  // Nombre exacto de la columna en mayúsculas
      },
      LOGO_CHARSET: {
        type: Sequelize.STRING(512),
        allowNull: true,
        field: 'LOGO_CHARSET'  // Nombre exacto de la columna en mayúsculas
      },
      LOGO_LAST_UPDATED: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'LOGO_LAST_UPDATED'  // Nombre exacto de la columna en mayúsculas
      },
    },
    {
      tableName: "MGSTORES",  // Nombre exacto de la tabla en mayúsculas
      schema: "ADMIN", // Especifica el esquema correcto
      timestamps: false,
    }
  );

  return Store;
};
