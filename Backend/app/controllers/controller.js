const db = require('../config/db.config.js');
const Customer = db.Customer;
const Product = db.Product;
const Supplier = db.Supplier;
const Employee = db.Employee;

// Controladores para Customer

exports.create = (req, res) => {
    let customer = {};

    try {
        // Building Customer object from uploading request's body
        customer.firstname = req.body.firstname;
        customer.lastname = req.body.lastname;
        customer.address = req.body.address;
        customer.age = req.body.age;

        // Save to MySQL database
        Customer.create(customer).then(result => {
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a Customer with id = " + result.id,
                customer: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllCustomers = (req, res) => {
    // find all Customer information from
    Customer.findAll()
        .then(customerInfos => {
            res.status(200).json({
                message: "Get all Customers' Infos Successfully!",
                customers: customerInfos
            });
        })
        .catch(error => {
            // log on console
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.getCustomerById = (req, res) => {
    // find all Customer information from
    let customerId = req.params.id;
    Customer.findByPk(customerId)
        .then(customer => {
            res.status(200).json({
                message: " Successfully Get a Customer with id = " + customerId,
                customers: customer
            });
        })
        .catch(error => {
            // log on console
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.filteringByAge = (req, res) => {
    let age = req.query.age;

    Customer.findAll({
        attributes: ['id', 'firstname', 'lastname', 'age', 'address', 'copyrightby'],
        where: { age: age }
    })
        .then(results => {
            res.status(200).json({
                message: "Get all Customers with age = " + age,
                customers: results,
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.pagination = (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);

        const offset = page ? page * limit : 0;

        Customer.findAndCountAll({ limit: limit, offset: offset })
            .then(data => {
                const totalPages = Math.ceil(data.count / limit);
                const response = {
                    message: "Paginating is completed! Query parameters: page = " + page + ", limit = " + limit,
                    data: {
                        "copyrightby": "UMG ANTIGUA",
                        "totalItems": data.count,
                        "totalPages": totalPages,
                        "limit": limit,
                        "currentPageNumber": page + 1,
                        "currentPageSize": data.rows.length,
                        "customers": data.rows
                    }
                };
                res.send(response);
            });
    } catch (error) {
        res.status(500).send({
            message: "Error -> Can NOT complete a paging request!",
            error: error.message,
        });
    }
}

exports.pagingfilteringsorting = (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        let age = parseInt(req.query.age);

        const offset = page ? page * limit : 0;

        console.log("offset = " + offset);

        Customer.findAndCountAll({
            attributes: ['id', 'firstname', 'lastname', 'age', 'address'],
            where: { age: age },
            order: [
                ['firstname', 'ASC'],
                ['lastname', 'DESC']
            ],
            limit: limit,
            offset: offset
        })
            .then(data => {
                const totalPages = Math.ceil(data.count / limit);
                const response = {
                    message: "Pagination Filtering Sorting request is completed! Query parameters: page = " + page + ", limit = " + limit + ", age = " + age,
                    data: {
                        "copyrightby": "UmgAntigua",
                        "totalItems": data.count,
                        "totalPages": totalPages,
                        "limit": limit,
                        "age-filtering": age,
                        "currentPageNumber": page + 1,
                        "currentPageSize": data.rows.length,
                        "customers": data.rows
                    }
                };
                res.send(response);
            });
    } catch (error) {
        res.status(500).send({
            message: "Error -> Can NOT complete a paging request!",
            error: error.message,
        });
    }
}

exports.updateById = async (req, res) => {
    try {
        let customerId = req.params.id;
        let customer = await Customer.findByPk(customerId);

        if (!customer) {
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a customer with id = " + customerId,
                customer: "",
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                address: req.body.address,
                age: req.body.age
            }
            let result = await Customer.update(updatedObject, { returning: true, where: { id: customerId } });

            // return the response to client
            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a customer with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Customer with id = " + customerId,
                customer: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a customer with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let customerId = req.params.id;
        let customer = await Customer.findByPk(customerId);

        if (!customer) {
            res.status(404).json({
                message: "Does Not exist a Customer with id = " + customerId,
                error: "404",
            });
        } else {
            await customer.destroy();
            res.status(200).json({
                message: "Delete Successfully a Customer with id = " + customerId,
                customer: customer,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a customer with id = " + req.params.id,
            error: error.message,
        });
    }
}

// Controladores para Product

exports.createProduct = (req, res) => {
    let product = {};

    try {
        // Building Product object from uploading request's body
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.stock = req.body.stock;

        // Save to MySQL database
        Product.create(product).then(result => {
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a Product with id = " + result.id,
                product: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllProducts = (req, res) => {
    // find all Product information from
    Product.findAll()
        .then(productInfos => {
            res.status(200).json({
                message: "Get all Products' Infos Successfully!",
                products: productInfos
            });
        })
        .catch(error => {
            // log on console
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.getProductById = (req, res) => {
    // find all Product information from
    let productId = req.params.id;
    Product.findByPk(productId)
        .then(product => {
            res.status(200).json({
                message: " Successfully Get a Product with id = " + productId,
                products: product
            });
        })
        .catch(error => {
            // log on console
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.filterProductsByPrice = (req, res) => {
    let price = req.query.price;

    Product.findAll({
        attributes: ['id', 'name', 'description', 'price', 'stock'],
        where: { price: price }
    })
        .then(results => {
            res.status(200).json({
                message: "Get all Products with price = " + price,
                products: results,
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.paginationProducts = (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);

        const offset = page ? page * limit : 0;

        Product.findAndCountAll({ limit: limit, offset: offset })
            .then(data => {
                const totalPages = Math.ceil(data.count / limit);
                const response = {
                    message: "Paginating is completed! Query parameters: page = " + page + ", limit = " + limit,
                    data: {
                        "copyrightby": "UMG ANTIGUA",
                        "totalItems": data.count,
                        "totalPages": totalPages,
                        "limit": limit,
                        "currentPageNumber": page + 1,
                        "currentPageSize": data.rows.length,
                        "products": data.rows
                    }
                };
                res.send(response);
            });
    } catch (error) {
        res.status(500).send({
            message: "Error -> Can NOT complete a paging request!",
            error: error.message,
        });
    }
}

exports.pagingFilteringSortingProducts = (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        let price = parseInt(req.query.price);

        const offset = page ? page * limit : 0;

        console.log("offset = " + offset);

        Product.findAndCountAll({
            attributes: ['id', 'name', 'description', 'price', 'stock'],
            where: { price: price },
            order: [
                ['name', 'ASC'],
                ['description', 'DESC']
            ],
            limit: limit,
            offset: offset
        })
            .then(data => {
                const totalPages = Math.ceil(data.count / limit);
                const response = {
                    message: "Pagination Filtering Sorting request is completed! Query parameters: page = " + page + ", limit = " + limit + ", price = " + price,
                    data: {
                        "copyrightby": "UmgAntigua",
                        "totalItems": data.count,
                        "totalPages": totalPages,
                        "limit": limit,
                        "price-filtering": price,
                        "currentPageNumber": page + 1,
                        "currentPageSize": data.rows.length,
                        "products": data.rows
                    }
                };
                res.send(response);
            });
    } catch (error) {
        res.status(500).send({
            message: "Error -> Can NOT complete a paging request!",
            error: error.message,
        });
    }
}

exports.updateProductById = async (req, res) => {
    try {
        let productId = req.params.id;
        let product = await Product.findByPk(productId);

        if (!product) {
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a product with id = " + productId,
                product: "",
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                stock: req.body.stock
            }
            let result = await Product.update(updatedObject, { returning: true, where: { id: productId } });

            // return the response to client
            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a product with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Product with id = " + productId,
                product: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a product with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteProductById = async (req, res) => {
    try {
        let productId = req.params.id;
        let product = await Product.findByPk(productId);

        if (!product) {
            res.status(404).json({
                message: "Does Not exist a Product with id = " + productId,
                error: "404",
            });
        } else {
            await product.destroy();
            res.status(200).json({
                message: "Delete Successfully a Product with id = " + productId,
                product: product,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a product with id = " + req.params.id,
            error: error.message,
        });
    }
}

// Controladores para Supplier

exports.createSupplier = (req, res) => {
    let supplier = {};

    try {
        // Building Supplier object from uploading request's body
        supplier.name = req.body.name;
        supplier.contact = req.body.contact;
        supplier.address = req.body.address;
        supplier.phone = req.body.phone;

        // Save to MySQL database
        Supplier.create(supplier).then(result => {
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a Supplier with id = " + result.id,
                supplier: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllSuppliers = (req, res) => {
    // find all Supplier information from
    Supplier.findAll()
        .then(supplierInfos => {
            res.status(200).json({
                message: "Get all Suppliers' Infos Successfully!",
                suppliers: supplierInfos
            });
        })
        .catch(error => {
            // log on console
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.getSupplierById = (req, res) => {
    // find all Supplier information from
    let supplierId = req.params.id;
    Supplier.findByPk(supplierId)
        .then(supplier => {
            res.status(200).json({
                message: " Successfully Get a Supplier with id = " + supplierId,
                suppliers: supplier
            });
        })
        .catch(error => {
            // log on console
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.updateSupplierById = async (req, res) => {
    try {
        let supplierId = req.params.id;
        let supplier = await Supplier.findByPk(supplierId);

        if (!supplier) {
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a supplier with id = " + supplierId,
                supplier: "",
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                name: req.body.name,
                contact: req.body.contact,
                address: req.body.address,
                phone: req.body.phone
            }
            let result = await Supplier.update(updatedObject, { returning: true, where: { id: supplierId } });

            // return the response to client
            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a supplier with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Supplier with id = " + supplierId,
                supplier: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a supplier with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteSupplierById = async (req, res) => {
    try {
        let supplierId = req.params.id;
        let supplier = await Supplier.findByPk(supplierId);

        if (!supplier) {
            res.status(404).json({
                message: "Does Not exist a Supplier with id = " + supplierId,
                error: "404",
            });
        } else {
            await supplier.destroy();
            res.status(200).json({
                message: "Delete Successfully a Supplier with id = " + supplierId,
                supplier: supplier,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a supplier with id = " + req.params.id,
            error: error.message,
        });
    }
}

// Controladores para Employee

exports.createEmployee = (req, res) => {
    let employee = {};

    try {
        // Building Employee object from uploading request's body
        employee.firstName = req.body.firstName;
        employee.lastName = req.body.lastName;
        employee.position = req.body.position;
        employee.salary = req.body.salary;
        employee.hireDate = req.body.hireDate;

        // Save to MySQL database
        Employee.create(employee).then(result => {
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully an Employee with id = " + result.id,
                employee: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllEmployees = (req, res) => {
    // find all Employee information from
    Employee.findAll()
        .then(employeeInfos => {
            res.status(200).json({
                message: "Get all Employees' Infos Successfully!",
                employees: employeeInfos
            });
        })
        .catch(error => {
            // log on console
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.getEmployeeById = (req, res) => {
    // find all Employee information from
    let employeeId = req.params.id;
    Employee.findByPk(employeeId)
        .then(employee => {
            res.status(200).json({
                message: " Successfully Get an Employee with id = " + employeeId,
                employees: employee
            });
        })
        .catch(error => {
            // log on console
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.updateEmployeeById = async (req, res) => {
    try {
        let employeeId = req.params.id;
        let employee = await Employee.findByPk(employeeId);

        if (!employee) {
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating an employee with id = " + employeeId,
                employee: "",
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                position: req.body.position,
                salary: req.body.salary,
                hireDate: req.body.hireDate
            }
            let result = await Employee.update(updatedObject, { returning: true, where: { id: employeeId } });

            // return the response to client
            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update an employee with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully an Employee with id = " + employeeId,
                employee: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update an employee with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteEmployeeById = async (req, res) => {
    try {
        let employeeId = req.params.id;
        let employee = await Employee.findByPk(employeeId);

        if (!employee) {
            res.status(404).json({
                message: "Does Not exist an Employee with id = " + employeeId,
                error: "404",
            });
        } else {
            await employee.destroy();
            res.status(200).json({
                message: "Delete Successfully an Employee with id = " + employeeId,
                employee: employee,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete an employee with id = " + req.params.id,
            error: error.message,
        });
    }
}
