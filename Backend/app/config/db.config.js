const Sequelize = require('sequelize');
const env = require('./env.js');

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  port: 1522,
  pool: {
    max: env.pool.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  },
  define: {
    schema: 'MEGAPACK'  // Define el esquema por defecto
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos
db.Categoria = require('../models/categoria.model.js')(sequelize, Sequelize);
db.Rol = require('../models/rol.model.js')(sequelize, Sequelize);
db.Usuario = require('../models/usuario.model.js')(sequelize, Sequelize);
db.Cliente = require('../models/cliente.model.js')(sequelize, Sequelize);
db.Pedido = require('../models/pedido.model.js')(sequelize, Sequelize);
db.DetallePedido = require('../models/detallePedido.model.js')(sequelize, Sequelize);
db.Producto = require('../models/producto.model.js')(sequelize, Sequelize);
db.Oferta = require('../models/oferta.model.js')(sequelize, Sequelize);  // Agregar el modelo Oferta
db.Carrito = require('../models/carrito.model.js')(sequelize, Sequelize); // NUEVO

module.exports = db;
