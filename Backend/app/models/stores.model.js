module.exports = (sequelize, Sequelize) => {
    const Store = sequelize.define(
      "Store",
      {
        store_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        store_name: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        web_address: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        physical_address: {
          type: Sequelize.STRING(512),
          allowNull: true,
        },
        latitude: {
          type: Sequelize.DECIMAL,
          allowNull: true,
        },
        longitude: {
          type: Sequelize.DECIMAL,
          allowNull: true,
        },
        logo: {
          type: Sequelize.BLOB,
          allowNull: true,
        },
        logo_mime_type: {
          type: Sequelize.STRING(512),
          allowNull: true,
        },
        logo_filename: {
          type: Sequelize.STRING(512),
          allowNull: true,
        },
        logo_charset: {
          type: Sequelize.STRING(512),
          allowNull: true,
        },
        logo_last_updated: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      },
      {
        tableName: "STORES",
        schema: "ADMIN", // Especifica el esquema correcto
        timestamps: false,
      }
    );
  
    return Store;
  };
  