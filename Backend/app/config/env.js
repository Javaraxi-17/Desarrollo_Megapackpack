const env = {
  db_name: 'g29cf7b31cc4ce0_test_high.adb.oraclecloud.com',
  username: 'ADMIN',  // Tu nombre de usuario de Oracle
  password: 'Ab@123456789',  // Tu contraseña de Oracle
  connectionString: '(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.us-ashburn-1.oraclecloud.com))(connect_data=(service_name=g29cf7b31cc4ce0_test_high.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))',  // Connection string de Oracle
  walletLocation: 'Wallet_test',  // Ruta a la ubicación del wallet
  pool: {
    max: 5, 
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = env;