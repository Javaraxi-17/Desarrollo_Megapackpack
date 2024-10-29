const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./app/config/db.config.js');

// Configuración de CORS
const corsOptions = {
  origin: '*',  // Permitir solicitudes desde cualquier dominio
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

// Variable para activar o desactivar alteración de tablas
const ALTER_SYNC = false;  // Cambiar a `false` para evitar alteraciones innecesarias

// Sincronización de las tablas en el orden correcto
async function syncTables() {
  try {
    // Sincronización de tablas lookup sin alteración
    await db.ClothingLookup.sync({ alter: false });
    console.log('Tabla ClothingLookup sincronizada sin alteración.');

    await db.ColorLookup.sync({ alter: false });
    console.log('Tabla ColorLookup sincronizada sin alteración.');

    await db.DepartmentLookup.sync({ alter: false });
    console.log('Tabla DepartmentLookup sincronizada sin alteración.');

    // Sincronizar Customers sin alteración de columnas para evitar errores de restricción
    await db.Customer.sync({ alter: false });
    console.log('Tabla Customers sincronizada sin alteración de columnas.');

    // Sincronizar Products sin alteración para evitar errores
    await db.Product.sync({ alter: false });
    console.log('Tabla Products sincronizada sin alteración de columnas.');

    // Sincronizar Stores sin alteración para evitar errores de restricción
    await db.Store.sync({ alter: false });
    console.log('Tabla Stores sincronizada sin alteración de columnas.');

    // Sincronizar Orders y OrderItems sin alteración para evitar problemas
    await db.Order.sync({ alter: false });
    console.log('Tabla Orders sincronizada sin alteración de columnas.');

    await db.OrderItem.sync({ alter: false });
    console.log('Tabla OrderItems sincronizada sin alteración de columnas.');

    console.log('Todas las tablas se han sincronizado correctamente sin alteraciones.');

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
