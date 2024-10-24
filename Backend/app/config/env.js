require('dotenv').config();

const env = {
  db_name: process.env.DB_NAME || 'name',
  username: process.env.DB_USERNAME || 'user',  // Variable de entorno para el nombre de usuario
  password: process.env.DB_PASSWORD || 'pass',  // Variable de entorno para la contraseña
  connectionString: process.env.DB_CONNECTION_STRING || ' ',  // Variable de en torno para el connection string
  walletLocation: process.env.DB_WALLET_LOCATION || 'Wallet_test',  // Variable de entorno para la ruta del wallet
  pool: {
    max: process.env.DB_POOL_MAX || 5, 
    min: process.env.DB_POOL_MIN || 1,
    acquire: process.env.DB_POOL_ACQUIRE || 30000,
    idle: process.env.DB_POOL_IDLE || 10000
  }
};

module.exports = env;
