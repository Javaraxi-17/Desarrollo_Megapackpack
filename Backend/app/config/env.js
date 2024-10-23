const env = {
  database: 'FREEPDB1',  // Nombre del servicio o base de datos
  username: 'MEGAPACK',  // Tu nombre de usuario de Oracle
  password: '1234',  // Tu contraseña de Oracle
  host: 'localhost',  // Dirección del host de Oracle
  dialect: 'oracle',  // Dialecto para Sequelize
  pool: {
    max: 5, 
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = env;