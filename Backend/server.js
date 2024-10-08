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

// Sincronización de tablas en el orden correcto con force: true
db.Categoria.sync({ force: true })  // Forzar recreación de la tabla de Categorías (borra y recrea la tabla)
  .then(() => {
    return db.Rol.sync({ force: true });  // Forzar recreación de la tabla de Roles
  })
  .then(() => {
    return db.Usuario.sync({ force: true });  // Forzar recreación de la tabla de Usuarios
  })
  .then(() => {
    return db.Cliente.sync({ force: true });  // Forzar recreación de la tabla de Clientes
  })
  .then(() => {
    return db.Pedido.sync({ force: true });  // Forzar recreación de la tabla de Pedidos
  })
  .then(() => {
    return db.Producto.sync({ force: true });  // Forzar recreación de la tabla de Productos
  })
  .then(() => {
    return db.DetallePedido.sync({ force: true });  // Forzar recreación de la tabla de DetallePedido
  })
  .then(() => {
    return db.Oferta.sync({ force: true });  // Forzar recreación de la tabla de DetallePedido
  })
  .then(() => {
    return db.Carrito.sync({ force: true });  // Forzar recreación de la tabla de DetallePedido
  })
  .then(() => {
    console.log('Tablas recreadas correctamente con force: true');
    
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
