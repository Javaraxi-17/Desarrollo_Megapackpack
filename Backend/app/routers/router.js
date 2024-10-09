let express = require('express');
let router = express.Router();

const controller = require('../controllers/controller.js');

// Agregar console.log para depuración
console.log(controller);

// Rutas para Categoria
router.post('/api/BigBasket/CreateCategory', controller.CreateNewCategory);
router.get('/api/BigBasket/GetAllCategory', controller.GetAllCategory);
router.get('/api/BigBasket/GetCategoryById/:id', controller.GetCategoryById);
router.put('/api/BigBasket/UpdateCategory/:id', controller.UpdateCategoryById);
router.delete('/api/BigBasket/DeleteCategoryById/:id', controller.DeleteCategoryById);

// Rutas para Producto
router.post('/api/BigBasket/CreateProduct', controller.CreateProduct);
router.get('/api/BigBasket/GetAllProducts', controller.GetAllProducts);
router.get('/api/BigBasket/GetProductById/:id', controller.GetProductById);
router.put('/api/BigBasket/UpdateProduct/:id', controller.UpdateProduct);
router.delete('/api/BigBasket/DeleteProductById/:id', controller.DeleteProductById);

// Rutas para Rol
router.post('/api/roles/create', controller.createRol);
router.get('/api/roles/all', controller.retrieveAllRoles);
router.get('/api/roles/onebyid/:id', controller.getRolById);
router.put('/api/roles/update/:id', controller.updateRolById);
router.delete('/api/roles/delete/:id', controller.deleteRolById);

// Rutas para Usuario
router.post('/api/usuarios/create', controller.createUsuario);
router.get('/api/usuarios/all', controller.retrieveAllUsuarios);
router.get('/api/usuarios/onebyid/:id', controller.getUsuarioById);
router.put('/api/usuarios/update/:id', controller.updateUsuarioById);
router.delete('/api/usuarios/delete/:id', controller.deleteUsuarioById);

// Rutas para Cliente
router.post('/api/BigBasket/CreateClient', controller.CreateCustomers);
router.get('/api/BigBasket/GetAllClients', controller.GetAllCustomers);
router.get('/api/BigBasket/GetClientById/:id', controller.GetCustomerById);
router.put('/api/BigBasket/UpdateClient/:id', controller.UpdateCustomerById);
router.delete('/api/BigBasket/DeleteClientById/:id', controller.DeleteCustomerById);


// Rutas para Pedido
router.post('/api/pedidos/create', controller.createPedido);
router.get('/api/pedidos/all', controller.retrieveAllPedidos);
router.get('/api/pedidos/onebyid/:id', controller.getPedidoById);
router.put('/api/pedidos/update/:id', controller.updatePedidoById);
router.delete('/api/pedidos/delete/:id', controller.deletePedidoById);

// Rutas para DetallePedido
router.post('/api/detalles-pedido/create', controller.createDetallePedido);
router.get('/api/detalles-pedido/all', controller.retrieveAllDetallesPedido);
router.get('/api/detalles-pedido/onebyid/:id', controller.getDetallePedidoById);
router.put('/api/detalles-pedido/update/:id', controller.updateDetallePedidoById);
router.delete('/api/detalles-pedido/delete/:id', controller.deleteDetallePedidoById);

// Rutas para Oferta
router.post('/api/ofertas/create', controller.createOferta);  // Crear una nueva oferta
router.get('/api/ofertas/all', controller.retrieveAllOfertas);  // Obtener todas las ofertas
router.get('/api/ofertas/onebyid/:id', controller.getOfertaById);  // Obtener oferta por ID
router.put('/api/ofertas/update/:id', controller.updateOfertaById);  // Actualizar oferta por ID
router.delete('/api/ofertas/delete/:id', controller.deleteOfertaById);  // Eliminar oferta por ID

// Rutas para Carrito
router.post('/create-carrito', controller.createCarrito);
router.get('/get-carritos', controller.GetAllCartItems);
router.get('/get-carrito/:id', controller.getCarritoById);
router.put('/update-carrito/:id', controller.updateCarritoById);
router.delete('/delete-carrito/:id', controller.deleteCarritoById);

module.exports = router;
