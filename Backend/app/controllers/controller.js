const db = require('../config/db.config.js');
const Product = db.Product;
const Order = db.Order;
const OrderItem = db.OrderItem;
const Customer = db.Customer;
const ClothingLookup = db.ClothingLookup;
const ColorLookup = db.ColorLookup;
const DepartmentLookup = db.DepartmentLookup;
const Store = db.Store;

// Controladores para Products
exports.createProduct = (req, res) => {
    let product = {};

    try {
        product.sku = req.body.sku;
        product.product_name = req.body.product_name;
        product.unit_price = req.body.unit_price;
        product.product_details = req.body.product_details;
        product.product_image = req.body.product_image;
        product.image_mime_type = req.body.image_mime_type;
        product.image_filename = req.body.image_filename;
        product.image_charset = req.body.image_charset;
        product.image_last_updated = req.body.image_last_updated || new Date();
        product.color_id = req.body.color_id;
        product.department_id = req.body.department_id;
        product.clothing_id = req.body.clothing_id;

        Product.create(product).then(result => {
            res.status(200).json({
                message: "Producto creado con éxito con id = " + result.product_id,
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
                product_name: req.body.product_name,
                unit_price: req.body.unit_price,
                product_details: req.body.product_details,
                product_image: req.body.product_image,
                image_mime_type: req.body.image_mime_type,
                image_filename: req.body.image_filename,
                image_charset: req.body.image_charset,
                image_last_updated: req.body.image_last_updated || new Date(),
                color_id: req.body.color_id,
                department_id: req.body.department_id,
                clothing_id: req.body.clothing_id
            };
            let result = await Product.update(updatedObject, { returning: true, where: { product_id: productId } });

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

// Controladores para Orders
exports.createOrder = (req, res) => {
    let order = {};

    try {
        order.customer_id = req.body.customer_id;
        order.amount = req.body.amount;
        order.order_address = req.body.order_address;
        order.order_email = req.body.order_email;
        order.order_datetime = req.body.order_datetime || new Date();
        order.order_status = req.body.order_status;
        order.store_id = req.body.store_id;

        Order.create(order).then(result => {
            res.status(200).json({
                message: "Pedido creado con éxito con id = " + result.order_id,
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
                order_address: req.body.order_address,
                order_email: req.body.order_email,
                order_datetime: req.body.order_datetime || new Date(),
                order_status: req.body.order_status,
                store_id: req.body.store_id
            };
            let result = await Order.update(updatedObject, { returning: true, where: { order_id: orderId } });

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

// Controladores para Order Items (Detalles del Pedido)
exports.createOrderItem = (req, res) => {
    let orderItem = {};

    try {
        orderItem.order_id = req.body.order_id;
        orderItem.product_id = req.body.product_id;
        orderItem.unit_price = req.body.unit_price;
        orderItem.quantity = req.body.quantity;

        OrderItem.create(orderItem).then(result => {
            res.status(200).json({
                message: "Detalle de pedido creado con éxito con id = " + result.line_item_id,
                orderItem: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
};

exports.GetAllOrderItems = (req, res) => {
    OrderItem.findAll()
        .then(orderItemInfos => {
            res.status(200).json({
                message: "Detalles de pedidos recuperados con éxito!",
                orderItems: orderItemInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.getOrderItemById = (req, res) => {
    let orderItemId = req.params.id;
    OrderItem.findByPk(orderItemId)
        .then(orderItem => {
            res.status(200).json({
                message: "Detalle de pedido recuperado con éxito con id = " + orderItemId,
                orderItem: orderItem
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.updateOrderItemById = async (req, res) => {
    try {
        let orderItemId = req.params.id;
        let orderItem = await OrderItem.findByPk(orderItemId);

        if (!orderItem) {
            res.status(404).json({
                message: "No se encontró el detalle de pedido para actualizar con id = " + orderItemId,
                orderItem: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                order_id: req.body.order_id,
                product_id: req.body.product_id,
                unit_price: req.body.unit_price,
                quantity: req.body.quantity
            };
            let result = await OrderItem.update(updatedObject, { returning: true, where: { line_item_id: orderItemId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar el detalle de pedido con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Detalle de pedido actualizado con éxito con id = " + orderItemId,
                orderItem: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar el detalle de pedido con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteOrderItemById = async (req, res) => {
    try {
        let orderItemId = req.params.id;
        let orderItem = await OrderItem.findByPk(orderItemId);

        if (!orderItem) {
            res.status(404).json({
                message: "No existe un detalle de pedido con id = " + orderItemId,
                error: "404",
            });
        } else {
            await orderItem.destroy();
            res.status(200).json({
                message: "Detalle de pedido eliminado con éxito con id = " + orderItemId,
                orderItem: orderItem,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar el detalle de pedido con id = " + req.params.id,
            error: error.message,
        });
    }
};

// Controladores para Customer
exports.createCustomer = async (req, res) => {
    try {
        // Validar datos de entrada
        const { full_name, email_address } = req.body;
        if (!full_name || !email_address) {
            return res.status(400).json({
                message: "Faltan datos necesarios para crear el cliente (full_name o email_address)",
            });
        }

        // Crear cliente
        const customer = await Customer.create({ full_name, email_address });
        res.status(201).json({
            message: "Cliente creado con éxito con id = " + customer.customer_id,
            customer: customer,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el cliente",
            error: error.message
        });
    }
};

exports.GetAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.status(200).json({
            message: "Clientes recuperados con éxito",
            customers: customers
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al recuperar clientes",
            error: error.message
        });
    }
};

exports.getCustomerById = async (req, res) => {
    try {
        const customerId = req.params.id;
        const customer = await Customer.findByPk(customerId);

        if (!customer) {
            return res.status(404).json({
                message: "Cliente no encontrado con id = " + customerId,
            });
        }

        res.status(200).json({
            message: "Cliente recuperado con éxito con id = " + customerId,
            customer: customer
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al recuperar el cliente",
            error: error.message
        });
    }
};

exports.updateCustomerById = async (req, res) => {
    try {
        const customerId = req.params.id;
        const { full_name, email_address } = req.body;

        // Validar datos de entrada
        if (!full_name || !email_address) {
            return res.status(400).json({
                message: "Faltan datos necesarios para actualizar el cliente (full_name o email_address)",
            });
        }

        // Buscar y actualizar cliente
        const [updatedRows, [updatedCustomer]] = await Customer.update(
            { full_name, email_address },
            { returning: true, where: { customer_id: customerId } }
        );

        if (!updatedRows) {
            return res.status(404).json({
                message: "No se encontró el cliente para actualizar con id = " + customerId,
            });
        }

        res.status(200).json({
            message: "Cliente actualizado con éxito con id = " + customerId,
            customer: updatedCustomer,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el cliente",
            error: error.message
        });
    }
};

exports.deleteCustomerById = async (req, res) => {
    try {
        const customerId = req.params.id;
        const customer = await Customer.findByPk(customerId);

        if (!customer) {
            return res.status(404).json({
                message: "No existe un cliente con id = " + customerId,
            });
        }

        await customer.destroy();
        res.status(200).json({
            message: "Cliente eliminado con éxito con id = " + customerId,
            customer: customer,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el cliente",
            error: error.message,
        });
    }
};


// Controladores para Clothing Lookup
exports.createClothing = (req, res) => {
    let clothing = {};

    try {
        clothing.clothing = req.body.clothing;

        ClothingLookup.create(clothing).then(result => {
            res.status(200).json({
                message: "Artículo de ropa creado con éxito con id = " + result.clothing_id,
                clothing: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
};

exports.GetAllClothing = (req, res) => {
    ClothingLookup.findAll()
        .then(clothingInfos => {
            res.status(200).json({
                message: "Artículos de ropa recuperados con éxito!",
                clothing: clothingInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.getClothingById = (req, res) => {
    let clothingId = req.params.id;
    ClothingLookup.findByPk(clothingId)
        .then(clothing => {
            res.status(200).json({
                message: "Artículo de ropa recuperado con éxito con id = " + clothingId,
                clothing: clothing
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.updateClothingById = async (req, res) => {
    try {
        let clothingId = req.params.id;
        let clothing = await ClothingLookup.findByPk(clothingId);

        if (!clothing) {
            res.status(404).json({
                message: "No se encontró el artículo de ropa para actualizar con id = " + clothingId,
                clothing: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                clothing: req.body.clothing
            };
            let result = await ClothingLookup.update(updatedObject, { returning: true, where: { clothing_id: clothingId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar el artículo de ropa con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Artículo de ropa actualizado con éxito con id = " + clothingId,
                clothing: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar el artículo de ropa con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteClothingById = async (req, res) => {
    try {
        let clothingId = req.params.id;
        let clothing = await ClothingLookup.findByPk(clothingId);

        if (!clothing) {
            res.status(404).json({
                message: "No existe un artículo de ropa con id = " + clothingId,
                error: "404",
            });
        } else {
            await clothing.destroy();
            res.status(200).json({
                message: "Artículo de ropa eliminado con éxito con id = " + clothingId,
                clothing: clothing,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar el artículo de ropa con id = " + req.params.id,
            error: error.message,
        });
    }
};

// Controladores para Color Lookup
exports.createColor = (req, res) => {
    let color = {};

    try {
        color.color = req.body.color;

        ColorLookup.create(color).then(result => {
            res.status(200).json({
                message: "Color creado con éxito con id = " + result.color_id,
                color: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
};

exports.GetAllColors = (req, res) => {
    ColorLookup.findAll()
        .then(colorInfos => {
            res.status(200).json({
                message: "Colores recuperados con éxito!",
                colors: colorInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.getColorById = (req, res) => {
    let colorId = req.params.id;
    ColorLookup.findByPk(colorId)
        .then(color => {
            res.status(200).json({
                message: "Color recuperado con éxito con id = " + colorId,
                color: color
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.updateColorById = async (req, res) => {
    try {
        let colorId = req.params.id;
        let color = await ColorLookup.findByPk(colorId);

        if (!color) {
            res.status(404).json({
                message: "No se encontró el color para actualizar con id = " + colorId,
                color: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                color: req.body.color
            };
            let result = await ColorLookup.update(updatedObject, { returning: true, where: { color_id: colorId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar el color con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Color actualizado con éxito con id = " + colorId,
                color: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar el color con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteColorById = async (req, res) => {
    try {
        let colorId = req.params.id;
        let color = await ColorLookup.findByPk(colorId);

        if (!color) {
            res.status(404).json({
                message: "No existe un color con id = " + colorId,
                error: "404",
            });
        } else {
            await color.destroy();
            res.status(200).json({
                message: "Color eliminado con éxito con id = " + colorId,
                color: color,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar el color con id = " + req.params.id,
            error: error.message,
        });
    }
};

// Controladores para Department Lookup
exports.createDepartment = (req, res) => {
    let department = {};

    try {
        department.department = req.body.department;

        DepartmentLookup.create(department).then(result => {
            res.status(200).json({
                message: "Departamento creado con éxito con id = " + result.department_id,
                department: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
};

exports.GetAllDepartments = (req, res) => {
    DepartmentLookup.findAll()
        .then(departmentInfos => {
            res.status(200).json({
                message: "Departamentos recuperados con éxito!",
                departments: departmentInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.getDepartmentById = (req, res) => {
    let departmentId = req.params.id;
    DepartmentLookup.findByPk(departmentId)
        .then(department => {
            res.status(200).json({
                message: "Departamento recuperado con éxito con id = " + departmentId,
                department: department
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.updateDepartmentById = async (req, res) => {
    try {
        let departmentId = req.params.id;
        let department = await DepartmentLookup.findByPk(departmentId);

        if (!department) {
            res.status(404).json({
                message: "No se encontró el departamento para actualizar con id = " + departmentId,
                department: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                department: req.body.department
            };
            let result = await DepartmentLookup.update(updatedObject, { returning: true, where: { department_id: departmentId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar el departamento con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Departamento actualizado con éxito con id = " + departmentId,
                department: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar el departamento con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteDepartmentById = async (req, res) => {
    try {
        let departmentId = req.params.id;
        let department = await DepartmentLookup.findByPk(departmentId);

        if (!department) {
            res.status(404).json({
                message: "No existe un departamento con id = " + departmentId,
                error: "404",
            });
        } else {
            await department.destroy();
            res.status(200).json({
                message: "Departamento eliminado con éxito con id = " + departmentId,
                department: department,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar el departamento con id = " + req.params.id,
            error: error.message,
        });
    }
};

// Controladores para Stores
exports.createStore = (req, res) => {
    let store = {};

    try {
        store.store_name = req.body.store_name;
        store.web_address = req.body.web_address;
        store.physical_address = req.body.physical_address;
        store.latitude = req.body.latitude;
        store.longitude = req.body.longitude;
        store.logo = req.body.logo;
        store.logo_mime_type = req.body.logo_mime_type;
        store.logo_filename = req.body.logo_filename;
        store.logo_charset = req.body.logo_charset;
        store.logo_last_updated = req.body.logo_last_updated || new Date();

        Store.create(store).then(result => {
            res.status(200).json({
                message: "Tienda creada con éxito con id = " + result.store_id,
                store: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
};

exports.GetAllStores = (req, res) => {
    Store.findAll()
        .then(storeInfos => {
            res.status(200).json({
                message: "Tiendas recuperadas con éxito!",
                stores: storeInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.getStoreById = (req, res) => {
    let storeId = req.params.id;
    Store.findByPk(storeId)
        .then(store => {
            res.status(200).json({
                message: "Tienda recuperada con éxito con id = " + storeId,
                store: store
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.updateStoreById = async (req, res) => {
    try {
        let storeId = req.params.id;
        let store = await Store.findByPk(storeId);

        if (!store) {
            res.status(404).json({
                message: "No se encontró la tienda para actualizar con id = " + storeId,
                store: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                store_name: req.body.store_name,
                web_address: req.body.web_address,
                physical_address: req.body.physical_address,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                logo: req.body.logo,
                logo_mime_type: req.body.logo_mime_type,
                logo_filename: req.body.logo_filename,
                logo_charset: req.body.logo_charset,
                logo_last_updated: req.body.logo_last_updated || new Date()
            };
            let result = await Store.update(updatedObject, { returning: true, where: { store_id: storeId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar la tienda con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Tienda actualizada con éxito con id = " + storeId,
                store: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar la tienda con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteStoreById = async (req, res) => {
    try {
        let storeId = req.params.id;
        let store = await Store.findByPk(storeId);

        if (!store) {
            res.status(404).json({
                message: "No existe una tienda con id = " + storeId,
                error: "404",
            });
        } else {
            await store.destroy();
            res.status(200).json({
                message: "Tienda eliminada con éxito con id = " + storeId,
                store: store,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar la tienda con id = " + req.params.id,
            error: error.message,
        });
    }
};
