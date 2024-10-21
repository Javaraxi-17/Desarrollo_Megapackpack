let express = require('express');
let router = express.Router();

const controller = require('../controllers/controller.js');

// Agregar console.log para depuración
console.log(controller);

// Rutas para Products (Productos)
router.post('/api/products/create', controller.createProduct);
router.get('/api/products/all', controller.GetAllProducts);
router.get('/api/products/onebyid/:id', controller.getProductById);
router.put('/api/products/update/:id', controller.updateProductById);
router.delete('/api/products/delete/:id', controller.deleteProductById);

// Rutas para Orders (Pedidos)
router.post('/api/orders/create', controller.createOrder);
router.get('/api/orders/all', controller.GetAllOrders);  // Cambié a 'GetAllOrders'
router.get('/api/orders/onebyid/:id', controller.getOrderById);
router.put('/api/orders/update/:id', controller.updateOrderById);
router.delete('/api/orders/delete/:id', controller.deleteOrderById);

// Rutas para Order Items (Detalles del Pedido)
router.post('/api/order-items/create', controller.createOrderItem);
router.get('/api/order-items/all', controller.GetAllOrderItems);  // Cambié a 'GetAllOrderItems'
router.get('/api/order-items/onebyid/:id', controller.getOrderItemById);
router.put('/api/order-items/update/:id', controller.updateOrderItemById);
router.delete('/api/order-items/delete/:id', controller.deleteOrderItemById);

// Rutas para Customers (Clientes)
router.post('/api/customers/create', controller.createCustomer);
router.get('/api/customers/all', controller.GetAllCustomers);  // Cambié a 'GetAllCustomers'
router.get('/api/customers/onebyid/:id', controller.getCustomerById);
router.put('/api/customers/update/:id', controller.updateCustomerById);
router.delete('/api/customers/delete/:id', controller.deleteCustomerById);

// Rutas para Clothing Lookup
router.post('/api/clothing/create', controller.createClothing);
router.get('/api/clothing/all', controller.GetAllClothing);
router.get('/api/clothing/onebyid/:id', controller.getClothingById);
router.put('/api/clothing/update/:id', controller.updateClothingById);
router.delete('/api/clothing/delete/:id', controller.deleteClothingById);

// Rutas para Color Lookup
router.post('/api/color/create', controller.createColor);
router.get('/api/color/all', controller.GetAllColors);
router.get('/api/color/onebyid/:id', controller.getColorById);
router.put('/api/color/update/:id', controller.updateColorById);
router.delete('/api/color/delete/:id', controller.deleteColorById);

// Rutas para Department Lookup
router.post('/api/department/create', controller.createDepartment);
router.get('/api/department/all', controller.GetAllDepartments);
router.get('/api/department/onebyid/:id', controller.getDepartmentById);
router.put('/api/department/update/:id', controller.updateDepartmentById);
router.delete('/api/department/delete/:id', controller.deleteDepartmentById);

// Rutas para Stores
router.post('/api/stores/create', controller.createStore);
router.get('/api/stores/all', controller.GetAllStores);
router.get('/api/stores/onebyid/:id', controller.getStoreById);
router.put('/api/stores/update/:id', controller.updateStoreById);
router.delete('/api/stores/delete/:id', controller.deleteStoreById);

module.exports = router;
