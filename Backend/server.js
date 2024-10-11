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

// Sincronización de todas las tablas sin alteración (force: false asegura que las tablas existentes no se modifiquen)
db.sequelize.sync({ force: false })  // Sincroniza todos los modelos sin eliminar ni alterar tablas existentes
  .then(() => {
    console.log('Tablas sincronizadas correctamente, sin alteración de datos.');

    // Crear un Servidor
    const PORT = process.env.PORT || 3001;
    const server = app.listen(PORT, function () {
      let host = server.address().address;
      let port = server.address().port;
      console.log("App escuchando en http://%s:%s", host, port);
    });
  })
  .catch(error => {
    console.error('Error sincronizando tablas:', error);
  });
