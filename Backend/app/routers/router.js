let express = require('express');
let router = express.Router();

const products = require('../controllers/controller.js');
const employees = require('../controllers/controller.js');


// Rutas para Product
router.post('/api/products/create', products.createProduct);
router.get('/api/products/all', products.retrieveAllProducts);
router.get('/api/products/onebyid/:id', products.getProductById);
router.get('/api/products/filterbyprice', products.filterProductsByPrice);
router.get('/api/products/pagination', products.paginationProducts);
router.get('/api/products/pagefiltersort', products.pagingFilteringSortingProducts);
router.put('/api/products/update/:id', products.updateProductById);
router.delete('/api/products/delete/:id', products.deleteProductById);


// Rutas para Employee
router.post('/api/employees/create', employees.createEmployee);
router.get('/api/employees/all', employees.retrieveAllEmployees);
router.get('/api/employees/onebyid/:id', employees.getEmployeeById);
router.put('/api/employees/update/:id', employees.updateEmployeeById);
router.delete('/api/employees/delete/:id', employees.deleteEmployeeById);

module.exports = router;
