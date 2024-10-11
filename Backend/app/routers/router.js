let express = require('express');
let router = express.Router();

const controller = require('../controllers/controller.js');

// Agregar console.log para depuración
console.log(controller);

// Rutas para Categories (Categorías)
router.post('/api/categories/create', controller.createCategory);
router.get('/api/categories/all', controller.GetAllCategories);
router.get('/api/categories/onebyid/:id', controller.getCategoryById);
router.put('/api/categories/update/:id', controller.updateCategoryById);
router.delete('/api/categories/delete/:id', controller.deleteCategoryById);

// Rutas para Products (Productos)
router.post('/api/products/create', controller.createProduct);
router.get('/api/products/all', controller.GetAllProducts);
router.get('/api/products/onebyid/:id', controller.getProductById);
router.put('/api/products/update/:id', controller.updateProductById);
router.delete('/api/products/delete/:id', controller.deleteProductById);

// Rutas para Product Options (Opciones de Producto)
router.post('/api/product-options/create', controller.createProductOption);
router.get('/api/product-options/all', controller.GetAllProductOptions);  // Cambié a 'GetAllProductOptions'
router.get('/api/product-options/onebyid/:id', controller.getProductOptionById);
router.put('/api/product-options/update/:id', controller.updateProductOptionById);
router.delete('/api/product-options/delete/:id', controller.deleteProductOptionById);

// Rutas para Options (Opciones)
router.post('/api/options/create', controller.createOption);
router.get('/api/options/all', controller.GetAllOptions);  // Cambié a 'GetAllOptions'
router.get('/api/options/onebyid/:id', controller.getOptionById);
router.put('/api/options/update/:id', controller.updateOptionById);
router.delete('/api/options/delete/:id', controller.deleteOptionById);

// Rutas para Orders (Pedidos)
router.post('/api/orders/create', controller.createOrder);
router.get('/api/orders/all', controller.GetAllOrders);  // Cambié a 'GetAllOrders'
router.get('/api/orders/onebyid/:id', controller.getOrderById);
router.put('/api/orders/update/:id', controller.updateOrderById);
router.delete('/api/orders/delete/:id', controller.deleteOrderById);

// Rutas para Order Details (Detalles del Pedido)
router.post('/api/order-details/create', controller.createOrderDetail);
router.get('/api/order-details/all', controller.GetAllOrderDetails);  // Cambié a 'GetAllOrderDetails'
router.get('/api/order-details/onebyid/:id', controller.getOrderDetailById);
router.put('/api/order-details/update/:id', controller.updateOrderDetailById);
router.delete('/api/order-details/delete/:id', controller.deleteOrderDetailById);

// Rutas para Customers (Clientes)
router.post('/api/customers/create', controller.createCustomer);
router.get('/api/customers/all', controller.GetAllCustomers);  // Cambié a 'GetAllCustomers'
router.get('/api/customers/onebyid/:id', controller.getCustomerById);
router.put('/api/customers/update/:id', controller.updateCustomerById);
router.delete('/api/customers/delete/:id', controller.deleteCustomerById);

module.exports = router;
