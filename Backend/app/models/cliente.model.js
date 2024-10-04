module.exports = (sequelize, Sequelize) => {
  const Cliente = sequelize.define('Cliente', {
    custId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'CUST_ID' // Forzando el uso del nombre exacto de la columna
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
      field: 'NAME' // Nombre exacto de la columna
    },
    mobileNo: {
      type: Sequelize.STRING(20),
      allowNull: false,
      field: 'MOBILE_NO' // Nombre exacto de la columna
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: 'PASSWORD' // Nombre exacto de la columna
    }
  }, {
    tableName: 'CLIENTES', // Nombre exacto de la tabla
    schema: 'MEGAPACK',
    timestamps: false
  });

  return Cliente;
};
