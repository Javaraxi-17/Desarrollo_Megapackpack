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

// Sincronización de tablas en el orden correcto
db.Categoria.sync()  // Sincronizar primero la tabla de Categorías
  .then(() => {
    return db.Rol.sync();  // Sincronizar la tabla de Roles
  })
  .then(() => {
    return db.Usuario.sync();  // Sincronizar la tabla de Usuarios
  })
  .then(() => {
    return db.Cliente.sync();  // Sincronizar la tabla de Clientes
  })
  .then(() => {
    return db.Pedido.sync();  // Sincronizar la tabla de Pedidos
  })
  .then(() => {
    return db.Producto.sync();  // Sincronizar la tabla de Productos
  })
  .then(() => {
    return db.DetallePedido.sync();  // Sincronizar la tabla de DetallePedido
  })
  .then(() => {
    console.log('Tablas sincronizadas correctamente');
    
    // Crear un Servidor
    const PORT = process.env.PORT || 3001;
    const server = app.listen(PORT, function () {
      let host = server.address().address;
      let port = server.address().port;
      console.log("App listening at http://%s:%s", host, port);
    });
  })
  .catch(error => {
    console.error('Error sincronizando tablas:', error);
  });
