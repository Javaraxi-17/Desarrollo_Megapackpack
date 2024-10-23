const Sequelize = require('sequelize');
const env = require('./env.js');

// Configuración de Sequelize para Oracle usando el connectionString

 console.log(env.connectionString);
 console.log(env.walletLocation);
const sequelize = new Sequelize(env.db_name, env.username, env.password, {
  dialect: 'oracle',  // Dialecto para Oracle
  dialectOptions: {
    connectString: env.connectionString,  // Pasa el connectionString aquí
  },
  pool: {
    max: env.pool.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  },
  define: {
    schema: 'ADMIN'  // Esquema por defecto en Oracle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos
db.Product = require('../models/products.model.js')(sequelize, Sequelize);
db.Customer = require('../models/customers.model.js')(sequelize, Sequelize);
db.Order = require('../models/orders.model.js')(sequelize, Sequelize);
db.OrderItem = require('../models/order_items.model.js')(sequelize, Sequelize);

// Nuevos Modelos
db.ClothingLookup = require('../models/clothing_lookup.model.js')(sequelize, Sequelize);
db.ColorLookup = require('../models/color_lookup.model.js')(sequelize, Sequelize);
db.DepartmentLookup = require('../models/department_lookup.model.js')(sequelize, Sequelize);
db.Store = require('../models/stores.model.js')(sequelize, Sequelize);

// Establecer relaciones

// Un pedido puede tener muchas líneas de orden
db.Order.hasMany(db.OrderItem, { foreignKey: 'order_id' });
db.OrderItem.belongsTo(db.Order, { foreignKey: 'order_id' });

// Un producto puede aparecer en muchas líneas de orden
db.Product.hasMany(db.OrderItem, { foreignKey: 'product_id' });
db.OrderItem.belongsTo(db.Product, { foreignKey: 'product_id' });

// Relación de PRODUCTOS con COLOR, DEPARTAMENTO y ROPA
db.Product.belongsTo(db.ColorLookup, { foreignKey: 'color_id' });
db.Product.belongsTo(db.DepartmentLookup, { foreignKey: 'department_id' });
db.Product.belongsTo(db.ClothingLookup, { foreignKey: 'clothing_id' });

// Relación de ORDENES con TIENDAS
db.Order.belongsTo(db.Store, { foreignKey: 'store_id' });
db.Store.hasMany(db.Order, { foreignKey: 'store_id' });

// Un cliente puede tener muchos pedidos
db.Customer.hasMany(db.Order, { foreignKey: 'customer_id' });
db.Order.belongsTo(db.Customer, { foreignKey: 'customer_id' });

module.exports = db;
