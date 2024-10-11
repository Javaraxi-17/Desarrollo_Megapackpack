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
db.Product = require('../models/products.model.js')(sequelize, Sequelize);
db.Option = require('../models/options.model.js')(sequelize, Sequelize);
db.ProductOption = require('../models/product_options.model.js')(sequelize, Sequelize);
db.Category = require('../models/categories.model.js')(sequelize, Sequelize);
db.ProductCategory = require('../models/product_categories.model.js')(sequelize, Sequelize);
db.Customer = require('../models/customers.model.js')(sequelize, Sequelize);
db.Order = require('../models/orders.model.js')(sequelize, Sequelize);
db.OrderDetail = require('../models/order_details.model.js')(sequelize, Sequelize);


// Establecer relaciones

// Un producto puede tener muchas opciones
db.Product.hasMany(db.ProductOption, { foreignKey: 'product_id' });
db.ProductOption.belongsTo(db.Product, { foreignKey: 'product_id' });

// Una opción puede aplicarse a muchas combinaciones de productos
db.Option.hasMany(db.ProductOption, { foreignKey: 'option_id' });
db.ProductOption.belongsTo(db.Option, { foreignKey: 'option_id' });

// Un producto puede pertenecer a muchas categorías
db.Product.belongsToMany(db.Category, {
  through: db.ProductCategory,
  foreignKey: 'product_id',
});
db.Category.belongsToMany(db.Product, {
  through: db.ProductCategory,
  foreignKey: 'category_id',
});

// Un pedido puede tener muchos detalles de pedido
db.Order.hasMany(db.OrderDetail, { foreignKey: 'order_id' });
db.OrderDetail.belongsTo(db.Order, { foreignKey: 'order_id' });

// Un cliente puede tener muchos pedidos
db.Customer.hasMany(db.Order, { foreignKey: 'customer_id' });
db.Order.belongsTo(db.Customer, { foreignKey: 'customer_id' });

// Un producto puede tener muchos detalles de pedido
db.Product.hasMany(db.OrderDetail, { foreignKey: 'product_id' });
db.OrderDetail.belongsTo(db.Product, { foreignKey: 'product_id' });

module.exports = db;
