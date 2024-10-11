module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define('Customer', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'  // Nombre exacto de la columna en la base de datos
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: 'email'  // Nombre exacto de la columna
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: 'password'  // Nombre exacto de la columna
    },
    full_name: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: 'full_name'  // Nombre exacto de la columna
    },
    billing_address: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'billing_address'  // Nombre exacto de la columna
    },
    default_shipping_address: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: 'default_shipping_address'  // Nombre exacto de la columna
    },
    country: {
      type: Sequelize.STRING(100),
      allowNull: true,
      field: 'country'  // Nombre exacto de la columna
    },
    phone: {
      type: Sequelize.STRING(20),
      allowNull: true,
      field: 'phone'  // Nombre exacto de la columna
    }
  }, {
    tableName: 'customers',  // Nombre exacto de la tabla en plural según convención
    schema: 'MEGAPACK',
    timestamps: false
  });

  return Customer;
};
