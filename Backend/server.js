const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./app/config/db.config.js');

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Configuración de Body Parser
app.use(bodyParser.json());

// Importar rutas
let router = require('./app/routers/router.js');
app.use('/', router);

// Ruta raíz
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido Estudiantes de UMG" });
});

// Sincronización de las tablas en el orden correcto
async function syncTables() {
  try {
    // Sincronizar tablas lookup primero, ya que son referenciadas por otras tablas
    await db.ClothingLookup.sync({ alter: true });
    console.log('Tabla ClothingLookup sincronizada.');

    await db.ColorLookup.sync({ alter: true });
    console.log('Tabla ColorLookup sincronizada.');

    await db.DepartmentLookup.sync({ alter: true });
    console.log('Tabla DepartmentLookup sincronizada.');

    // Sincronizar Customers antes de Orders
    await db.Customer.sync({ alter: true });
    console.log('Tabla Customers sincronizada.');

    // Sincronizar la tabla Products después de las tablas lookup
    await db.Product.sync({ alter: true });
    console.log('Tabla Products sincronizada.');

    // Sincronizar la tabla Stores antes de Orders
    await db.Store.sync({ alter: true });
    console.log('Tabla Stores sincronizada.');

    // Sincronizar Orders y OrderItems después de Stores y Customers
    await db.Order.sync({ alter: true });
    console.log('Tabla Orders sincronizada.');

    await db.OrderItem.sync({ alter: true });
    console.log('Tabla OrderItems sincronizada.');

    console.log('Todas las tablas se han sincronizado correctamente.');

    // Iniciar servidor una vez que todas las tablas estén sincronizadas
    const PORT = process.env.PORT || 3001;
    const server = app.listen(PORT, function () {
      let host = server.address().address;
      let port = server.address().port;
      console.log("App escuchando en http://%s:%s", host, port);
    });
  } catch (error) {
    console.error('Error sincronizando tablas:', error);
  }
}

// Llamar a la función para sincronizar tablas
syncTables();
