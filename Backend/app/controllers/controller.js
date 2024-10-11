const db = require('../config/db.config.js');
const Category = db.Category;
const Product = db.Product;
const Option = db.Option;
const ProductOption = db.ProductOption;
const ProductCategory = db.ProductCategory;
const Order = db.Order;
const OrderDetail = db.OrderDetail;
const Customer = db.Customer;

// Controladores para Categories
exports.createCategory = (req, res) => {
    let category = {};

    try {
        category.name = req.body.name;
        category.description = req.body.description || null;  // Puede ser null
        category.thumbnail = req.body.thumbnail || null;  // Puede ser null

        Category.create(category).then(result => {
            res.status(200).json({
                message: "Categoría creada con éxito con id = " + result.id,
                category: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
};

exports.GetAllCategories = (req, res) => {
    Category.findAll()
        .then(categoryInfos => {
            res.status(200).json({
                message: "Categorías recuperadas con éxito!",
                categories: categoryInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.getCategoryById = (req, res) => {
    let categoryId = req.params.id;
    Category.findByPk(categoryId)
        .then(category => {
            if (category) {
                res.status(200).json({
                    message: "Categoría recuperada con éxito con id = " + categoryId,
                    category: category
                });
            } else {
                res.status(404).json({
                    message: "Categoría no encontrada con id = " + categoryId,
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.updateCategoryById = async (req, res) => {
    try {
        let categoryId = req.params.id;
        let category = await Category.findByPk(categoryId);

        if (!category) {
            res.status(404).json({
                message: "No se encontró la categoría para actualizar con id = " + categoryId,
                category: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                name: req.body.name,
                description: req.body.description || null,  // Permitir null si no se especifica
                thumbnail: req.body.thumbnail || null
            };
            let result = await Category.update(updatedObject, { returning: true, where: { id: categoryId } });

            if (result) {
                res.status(200).json({
                    message: "Categoría actualizada con éxito con id = " + categoryId,
                    category: updatedObject,
                });
            } else {
                res.status(500).json({
                    message: "Error -> No se puede actualizar la categoría con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar la categoría con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteCategoryById = async (req, res) => {
    try {
        let categoryId = req.params.id;
        let category = await Category.findByPk(categoryId);

        if (!category) {
            res.status(404).json({
                message: "No existe una categoría con id = " + categoryId,
                error: "404",
            });
        } else {
            await category.destroy();
            res.status(200).json({
                message: "Categoría eliminada con éxito con id = " + categoryId,
                category: category,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar la categoría con id = " + req.params.id,
            error: error.message,
        });
    }
};

// Controladores para Products
exports.createProduct = (req, res) => {
    let product = {};

    try {
        product.sku = req.body.sku;
        product.name = req.body.name;
        product.price = req.body.price;
        product.weight = req.body.weight;
        product.descriptions = req.body.descriptions;
        product.thumbnail = req.body.thumbnail;
        product.image = req.body.image;
        product.category = req.body.category;
        product.create_date = req.body.create_date || new Date();
        product.stock = req.body.stock;

        Product.create(product).then(result => {
            res.status(200).json({
                message: "Producto creado con éxito con id = " + result.id,
                product: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
};

exports.GetAllProducts = (req, res) => {
    Product.findAll()
        .then(productInfos => {
            res.status(200).json({
                message: "Productos recuperados con éxito!",
                products: productInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.getProductById = (req, res) => {
    let productId = req.params.id;
    Product.findByPk(productId)
        .then(product => {
            res.status(200).json({
                message: "Producto recuperado con éxito con id = " + productId,
                product: product
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.updateProductById = async (req, res) => {
    try {
        let productId = req.params.id;
        let product = await Product.findByPk(productId);

        if (!product) {
            res.status(404).json({
                message: "No se encontró el producto para actualizar con id = " + productId,
                product: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                sku: req.body.sku,
                name: req.body.name,
                price: req.body.price,
                weight: req.body.weight,
                descriptions: req.body.descriptions,
                thumbnail: req.body.thumbnail,
                image: req.body.image,
                category: req.body.category,
                create_date: req.body.create_date || new Date(),
                stock: req.body.stock
            };
            let result = await Product.update(updatedObject, { returning: true, where: { id: productId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar el producto con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Producto actualizado con éxito con id = " + productId,
                product: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar el producto con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteProductById = async (req, res) => {
    try {
        let productId = req.params.id;
        let product = await Product.findByPk(productId);

        if (!product) {
            res.status(404).json({
                message: "No existe un producto con id = " + productId,
                error: "404",
            });
        } else {
            await product.destroy();
            res.status(200).json({
                message: "Producto eliminado con éxito con id = " + productId,
                product: product,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar el producto con id = " + req.params.id,
            error: error.message,
        });
    }
};

// Controladores para Customers
exports.createCustomer = (req, res) => {
    let customer = {};

    try {
        customer.email = req.body.email;
        customer.password = req.body.password;
        customer.full_name = req.body.full_name;
        customer.billing_address = req.body.billing_address;
        customer.default_shipping_address = req.body.default_shipping_address;
        customer.country = req.body.country;
        customer.phone = req.body.phone;

        Customer.create(customer).then(result => {
            res.status(200).json({
                message: "Cliente creado con éxito con id = " + result.id,
                customer: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
};

exports.GetAllCustomers = (req, res) => {
    Customer.findAll()
        .then(customerInfos => {
            res.status(200).json({
                message: "Clientes recuperados con éxito!",
                customers: customerInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.getCustomerById = (req, res) => {
    let customerId = req.params.id;
    Customer.findByPk(customerId)
        .then(customer => {
            res.status(200).json({
                message: "Cliente recuperado con éxito con id = " + customerId,
                customer: customer
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.updateCustomerById = async (req, res) => {
    try {
        let customerId = req.params.id;
        let customer = await Customer.findByPk(customerId);

        if (!customer) {
            res.status(404).json({
                message: "No se encontró el cliente para actualizar con id = " + customerId,
                customer: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                email: req.body.email,
                password: req.body.password,
                full_name: req.body.full_name,
                billing_address: req.body.billing_address,
                default_shipping_address: req.body.default_shipping_address,
                country: req.body.country,
                phone: req.body.phone
            };
            let result = await Customer.update(updatedObject, { returning: true, where: { id: customerId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar el cliente con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Cliente actualizado con éxito con id = " + customerId,
                customer: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar el cliente con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteCustomerById = async (req, res) => {
    try {
        let customerId = req.params.id;
        let customer = await Customer.findByPk(customerId);

        if (!customer) {
            res.status(404).json({
                message: "No existe un cliente con id = " + customerId,
                error: "404",
            });
        } else {
            await customer.destroy();
            res.status(200).json({
                message: "Cliente eliminado con éxito con id = " + customerId,
                customer: customer,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar el cliente con id = " + req.params.id,
            error: error.message,
        });
    }
};

// Controladores para Orders
exports.createOrder = (req, res) => {
    let order = {};

    try {
        order.customer_id = req.body.customer_id;
        order.amount = req.body.amount;
        order.shipping_address = req.body.shipping_address;
        order.order_address = req.body.order_address;
        order.order_email = req.body.order_email;
        order.order_date = req.body.order_date || new Date();
        order.order_status = req.body.order_status;

        Order.create(order).then(result => {
            res.status(200).json({
                message: "Pedido creado con éxito con id = " + result.id,
                order: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
};

exports.GetAllOrders = (req, res) => {
    Order.findAll()
        .then(orderInfos => {
            res.status(200).json({
                message: "Pedidos recuperados con éxito!",
                orders: orderInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.getOrderById = (req, res) => {
    let orderId = req.params.id;
    Order.findByPk(orderId)
        .then(order => {
            res.status(200).json({
                message: "Pedido recuperado con éxito con id = " + orderId,
                order: order
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.updateOrderById = async (req, res) => {
    try {
        let orderId = req.params.id;
        let order = await Order.findByPk(orderId);

        if (!order) {
            res.status(404).json({
                message: "No se encontró el pedido para actualizar con id = " + orderId,
                order: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                customer_id: req.body.customer_id,
                amount: req.body.amount,
                shipping_address: req.body.shipping_address,
                order_address: req.body.order_address,
                order_email: req.body.order_email,
                order_date: req.body.order_date || new Date(),
                order_status: req.body.order_status
            };
            let result = await Order.update(updatedObject, { returning: true, where: { id: orderId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar el pedido con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Pedido actualizado con éxito con id = " + orderId,
                order: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar el pedido con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteOrderById = async (req, res) => {
    try {
        let orderId = req.params.id;
        let order = await Order.findByPk(orderId);

        if (!order) {
            res.status(404).json({
                message: "No existe un pedido con id = " + orderId,
                error: "404",
            });
        } else {
            await order.destroy();
            res.status(200).json({
                message: "Pedido eliminado con éxito con id = " + orderId,
                order: order,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar el pedido con id = " + req.params.id,
            error: error.message,
        });
    }
};

// Controladores para OrderDetails
exports.createOrderDetail = (req, res) => {
    let orderDetail = {};

    try {
        orderDetail.order_id = req.body.order_id;
        orderDetail.product_id = req.body.product_id;
        orderDetail.price = req.body.price;
        orderDetail.sku = req.body.sku;
        orderDetail.quantity = req.body.quantity;

        OrderDetail.create(orderDetail).then(result => {
            res.status(200).json({
                message: "Detalle de pedido creado con éxito con id = " + result.id,
                orderDetail: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
};

exports.GetAllOrderDetails = (req, res) => {
    OrderDetail.findAll()
        .then(orderDetailInfos => {
            res.status(200).json({
                message: "Detalles de pedidos recuperados con éxito!",
                orderDetails: orderDetailInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.getOrderDetailById = (req, res) => {
    let orderDetailId = req.params.id;
    OrderDetail.findByPk(orderDetailId)
        .then(orderDetail => {
            res.status(200).json({
                message: "Detalle de pedido recuperado con éxito con id = " + orderDetailId,
                orderDetail: orderDetail
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.updateOrderDetailById = async (req, res) => {
    try {
        let orderDetailId = req.params.id;
        let orderDetail = await OrderDetail.findByPk(orderDetailId);

        if (!orderDetail) {
            res.status(404).json({
                message: "No se encontró el detalle de pedido para actualizar con id = " + orderDetailId,
                orderDetail: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                order_id: req.body.order_id,
                product_id: req.body.product_id,
                price: req.body.price,
                sku: req.body.sku,
                quantity: req.body.quantity
            };
            let result = await OrderDetail.update(updatedObject, { returning: true, where: { id: orderDetailId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar el detalle de pedido con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Detalle de pedido actualizado con éxito con id = " + orderDetailId,
                orderDetail: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar el detalle de pedido con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteOrderDetailById = async (req, res) => {
    try {
        let orderDetailId = req.params.id;
        let orderDetail = await OrderDetail.findByPk(orderDetailId);

        if (!orderDetail) {
            res.status(404).json({
                message: "No existe un detalle de pedido con id = " + orderDetailId,
                error: "404",
            });
        } else {
            await orderDetail.destroy();
            res.status(200).json({
                message: "Detalle de pedido eliminado con éxito con id = " + orderDetailId,
                orderDetail: orderDetail,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar el detalle de pedido con id = " + req.params.id,
            error: error.message,
        });
    }
};

// Controladores para Options
exports.createOption = (req, res) => {
    let option = {};

    try {
        option.option_name = req.body.option_name;

        Option.create(option).then(result => {
            res.status(200).json({
                message: "Opción creada con éxito con id = " + result.id,
                option: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
};

exports.GetAllOptions = (req, res) => {
    Option.findAll()
        .then(optionInfos => {
            res.status(200).json({
                message: "Opciones recuperadas con éxito!",
                options: optionInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.getOptionById = (req, res) => {
    let optionId = req.params.id;
    Option.findByPk(optionId)
        .then(option => {
            res.status(200).json({
                message: "Opción recuperada con éxito con id = " + optionId,
                option: option
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.updateOptionById = async (req, res) => {
    try {
        let optionId = req.params.id;
        let option = await Option.findByPk(optionId);

        if (!option) {
            res.status(404).json({
                message: "No se encontró la opción para actualizar con id = " + optionId,
                option: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                option_name: req.body.option_name
            };
            let result = await Option.update(updatedObject, { returning: true, where: { id: optionId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar la opción con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Opción actualizada con éxito con id = " + optionId,
                option: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar la opción con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteOptionById = async (req, res) => {
    try {
        let optionId = req.params.id;
        let option = await Option.findByPk(optionId);

        if (!option) {
            res.status(404).json({
                message: "No existe una opción con id = " + optionId,
                error: "404",
            });
        } else {
            await option.destroy();
            res.status(200).json({
                message: "Opción eliminada con éxito con id = " + optionId,
                option: option,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar la opción con id = " + req.params.id,
            error: error.message,
        });
    }
};

// Controladores para ProductOptions
exports.createProductOption = (req, res) => {
    let productOption = {};

    try {
        productOption.option_id = req.body.option_id;
        productOption.product_id = req.body.product_id;

        ProductOption.create(productOption).then(result => {
            res.status(200).json({
                message: "Opción de producto creada con éxito con id = " + result.id,
                productOption: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
};

exports.GetAllProductOptions = (req, res) => {
    ProductOption.findAll()
        .then(productOptionInfos => {
            res.status(200).json({
                message: "Opciones de productos recuperadas con éxito!",
                productOptions: productOptionInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.getProductOptionById = (req, res) => {
    let productOptionId = req.params.id;
    ProductOption.findByPk(productOptionId)
        .then(productOption => {
            res.status(200).json({
                message: "Opción de producto recuperada con éxito con id = " + productOptionId,
                productOption: productOption
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.updateProductOptionById = async (req, res) => {
    try {
        let productOptionId = req.params.id;
        let productOption = await ProductOption.findByPk(productOptionId);

        if (!productOption) {
            res.status(404).json({
                message: "No se encontró la opción de producto para actualizar con id = " + productOptionId,
                productOption: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                option_id: req.body.option_id,
                product_id: req.body.product_id
            };
            let result = await ProductOption.update(updatedObject, { returning: true, where: { id: productOptionId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar la opción de producto con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Opción de producto actualizada con éxito con id = " + productOptionId,
                productOption: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar la opción de producto con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteProductOptionById = async (req, res) => {
    try {
        let productOptionId = req.params.id;
        let productOption = await ProductOption.findByPk(productOptionId);

        if (!productOption) {
            res.status(404).json({
                message: "No existe una opción de producto con id = " + productOptionId,
                error: "404",
            });
        } else {
            await productOption.destroy();
            res.status(200).json({
                message: "Opción de producto eliminada con éxito con id = " + productOptionId,
                productOption: productOption,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar la opción de producto con id = " + req.params.id,
            error: error.message,
        });
    }
};

// Controladores para ProductCategories
exports.createProductCategory = (req, res) => {
    let productCategory = {};

    try {
        productCategory.product_id = req.body.product_id;
        productCategory.category_id = req.body.category_id;

        ProductCategory.create(productCategory).then(result => {
            res.status(200).json({
                message: "Categoría de producto creada con éxito con id = " + result.id,
                productCategory: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
};

exports.GetAllProductCategories = (req, res) => {
    ProductCategory.findAll()
        .then(productCategoryInfos => {
            res.status(200).json({
                message: "Categorías de productos recuperadas con éxito!",
                productCategories: productCategoryInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.getProductCategoryById = (req, res) => {
    let productCategoryId = req.params.id;
    ProductCategory.findByPk(productCategoryId)
        .then(productCategory => {
            res.status(200).json({
                message: "Categoría de producto recuperada con éxito con id = " + productCategoryId,
                productCategory: productCategory
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.updateProductCategoryById = async (req, res) => {
    try {
        let productCategoryId = req.params.id;
        let productCategory = await ProductCategory.findByPk(productCategoryId);

        if (!productCategory) {
            res.status(404).json({
                message: "No se encontró la categoría de producto para actualizar con id = " + productCategoryId,
                productCategory: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                product_id: req.body.product_id,
                category_id: req.body.category_id
            };
            let result = await ProductCategory.update(updatedObject, { returning: true, where: { id: productCategoryId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar la categoría de producto con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Categoría de producto actualizada con éxito con id = " + productCategoryId,
                productCategory: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar la categoría de producto con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteProductCategoryById = async (req, res) => {
    try {
        let productCategoryId = req.params.id;
        let productCategory = await ProductCategory.findByPk(productCategoryId);

        if (!productCategory) {
            res.status(404).json({
                message: "No existe una categoría de producto con id = " + productCategoryId,
                error: "404",
            });
        } else {
            await productCategory.destroy();
            res.status(200).json({
                message: "Categoría de producto eliminada con éxito con id = " + productCategoryId,
                productCategory: productCategory,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar la categoría de producto con id = " + req.params.id,
            error: error.message,
        });
    }
};
