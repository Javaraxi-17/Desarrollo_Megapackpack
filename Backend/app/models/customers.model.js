// customer.model.js
module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define('Customer', {
      id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
      },
      customer_name: {
          type: Sequelize.STRING(255),
          allowNull: false
      },
      customer_email: {
          type: Sequelize.STRING(255),
          allowNull: false
      },
      customer_phone: {
          type: Sequelize.STRING(20),
          allowNull: true
      },
      customer_address: {
          type: Sequelize.STRING(255),
          allowNull: true
      }
  }, {
      tableName: 'customers',  // Nombre exacto de la tabla
      schema: 'ADMIN',      // Especificar el esquema
      timestamps: false        // Deshabilitar las marcas de tiempo
  });

  return Customer;
};
