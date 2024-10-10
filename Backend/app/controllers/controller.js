const db = require('../config/db.config.js');
const Categoria = db.Categoria;
const Producto = db.Producto;
const Rol = db.Rol;
const Usuario = db.Usuario;
const Cliente = db.Cliente;
const Pedido = db.Pedido;
const DetallePedido = db.DetallePedido;
const Oferta = db.Oferta;
const Carrito = db.Carrito;

// Controladores para Categoria

// Crear nueva categoría
exports.CreateNewCategory = async (req, res) => {
    let categoria = {
        categoryName: req.body.categoryName,
        parentCategoryId: req.body.parentCategoryId || null,  // Puede ser null
        userId: req.body.userId
    };

    try {
        const result = await Categoria.create(categoria);
        res.status(201).json({
            message: "Categoría creada con éxito",
            result: true,
            data: {
                categoryId: result.categoryId,
                categoryName: result.categoryName,
                parentCategoryId: result.parentCategoryId || 0,  // Si es null, asigna 0
                userId: result.userId || null
            }
        });
    } catch (error) {
        console.error("Error al crear la categoría:", error);
        res.status(500).json({
            message: "Error al crear la categoría",
            result: false,
            error: error.message
        });
    }
};



// Obtener todas las categorías
exports.GetAllCategory = async (req, res) => {
    try {
        const categoriaInfos = await Categoria.findAll();
        const formattedCategories = categoriaInfos.map(categoria => ({
            categoryId: categoria.categoryId,
            categoryName: categoria.categoryName,
            parentCategoryId: categoria.parentCategoryId || 0,  // Si es null, asigna 0
            userId: categoria.userId || null
        }));

        res.status(200).json({
            message: "Categorías recuperadas con éxito",
            result: true,
            data: formattedCategories
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al recuperar las categorías",
            result: false,
            error: error.message
        });
    }
};

// Obtener categoría por ID
exports.GetCategoryById = async (req, res) => {
    let categoriaId = req.params.id;
    try {
        const categoria = await Categoria.findByPk(categoriaId);
        if (categoria) {
            res.status(200).json({
                message: "Categoría recuperada con éxito",
                result: true,
                data: {
                    categoryId: categoria.categoryId,
                    categoryName: categoria.categoryName,
                    parentCategoryId: categoria.parentCategoryId || 0,
                    userId: categoria.userId || null
                }
            });
        } else {
            res.status(404).json({
                message: "Categoría no encontrada",
                result: false,
                data: null
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al recuperar la categoría",
            result: false,
            error: error.message
        });
    }
};


// Actualizar categoría por ID
exports.UpdateCategoryById = async (req, res) => {
    try {
        let categoriaId = req.params.id;
        let categoria = await Categoria.findByPk(categoriaId);

        if (!categoria) {
            return res.status(404).json({
                message: "No se encontró la categoría",
                result: false,
                data: null
            });
        }

        let updatedObject = {
            categoryName: req.body.categoryName,
            parentCategoryId: req.body.parentCategoryId || null,  // Permitir null si no se especifica
            userId: req.body.userId
        };

        let [updated] = await Categoria.update(updatedObject, { returning: true, where: { categoryId: categoriaId } });

        if (!updated) {
            return res.status(500).json({
                message: "No se pudo actualizar la categoría",
                result: false,
                error: "No se pudo actualizar la categoría con id = " + categoriaId
            });
        }

        res.status(200).json({
            message: "Categoría actualizada con éxito",
            result: true,
            data: updatedObject
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar la categoría",
            result: false,
            error: error.message
        });
    }
};



// Eliminar categoría por ID
exports.DeleteCategoryById = async (req, res) => {
    try {
        let categoriaId = req.params.id;
        let categoria = await Categoria.findByPk(categoriaId);

        if (!categoria) {
            return res.status(404).json({
                message: "No existe una categoría con ese ID",
                result: false,
                data: null
            });
        }

        await categoria.destroy();
        res.status(200).json({
            message: "Categoría eliminada con éxito",
            result: true,
            data: {
                categoryId: categoria.categoryId,
                categoryName: categoria.categoryName,
                parentCategoryId: categoria.parentCategoryId || 0,
                userId: categoria.userId || null
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar la categoría",
            result: false,
            error: error.message
        });
    }
};



// Controladores para Producto

exports.CreateProduct = async (req, res) => {
    try {
        const newProduct = await Producto.create({
            productSku: req.body.productSku,
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            productShortName: req.body.productShortName,
            productDescription: req.body.productDescription,
            createdDate: req.body.createdDate,
            deliveryTimeSpan: req.body.deliveryTimeSpan,
            categoryId: req.body.categoryId,
            productImageUrl: req.body.productImageUrl,
            userId: req.body.userId
        });
        res.status(201).json({
            message: "Producto creado con éxito",
            result: true,
            data: newProduct
        });
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).json({
            message: "Error al crear el producto",
            result: false,
            error: error.message
        });
    }
};

// Obtener todos los productos por categoryId con el nombre de la categoría
exports.GetAllProductsByCategoryId = async (req, res) => {
    let categoryId = req.params.categoryId;

    try {
        const products = await Producto.findAll({
            where: { categoryId: categoryId },
            include: [{
                model: Categoria,  // Asumiendo que tienes una relación definida entre Producto y Categoria
                as: 'categoria',   // Alias de la relación (debe coincidir con el definido en el modelo)
                attributes: ['categoryName']  // Solo incluye el nombre de la categoría
            }]
        });

        if (products.length > 0) {
            const formattedProducts = products.map(product => ({
                productId: product.productId,
                productSku: product.productSku,
                productName: product.productName,
                productPrice: product.productPrice,
                productShortName: product.productShortName || null,
                productDescription: product.productDescription || null,
                createdDate: product.createdDate || null,
                deliveryTimeSpan: product.deliveryTimeSpan || null,
                categoryId: product.categoryId || null,
                productImageUrl: product.productImageUrl || null,
                categoryName: product.categoria ? product.categoria.categoryName : null  // Accede al nombre de la categoría
            }));

            res.status(200).json({
                message: "",
                result: true,
                data: formattedProducts
            });
        } else {
            res.status(404).json({
                message: "No se encontraron productos para esta categoría",
                result: false,
                data: []
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al recuperar los productos",
            result: false,
            error: error.message
        });
    }
};



exports.GetAllProducts = (req, res) => {
    Producto.findAll()
        .then(productInfos => {
            const formattedProducts = productInfos.map(product => ({
                productId: product.productId,
                productSku: product.productSku,
                productName: product.productName,
                productPrice: product.productPrice,
                productShortName: product.productShortName || null,
                productDescription: product.productDescription || null,
                createdDate: product.createdDate || null,
                deliveryTimeSpan: product.deliveryTimeSpan || null,
                categoryId: product.categoryId || null,
                productImageUrl: product.productImageUrl || null,
                userId: product.userId || null
            }));

            res.status(200).json({
                message: "Productos recuperados con éxito!",
                result: true,
                data: formattedProducts
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al recuperar los productos",
                result: false,
                error: error.message
            });
        });
};


exports.GetProductById = (req, res) => {
    let productId = req.params.id;
    Producto.findByPk(productId)
        .then(product => {
            if (product) {
                res.status(200).json({
                    message: "Producto recuperado con éxito",
                    result: true,
                    data: {
                        productId: product.productId,
                        productSku: product.productSku,
                        productName: product.productName,
                        productPrice: product.productPrice,
                        productShortName: product.productShortName || null,
                        productDescription: product.productDescription || null,
                        createdDate: product.createdDate || null,
                        deliveryTimeSpan: product.deliveryTimeSpan || null,
                        categoryId: product.categoryId || null,
                        productImageUrl: product.productImageUrl || null,
                        userId: product.userId || null
                    }
                });
            } else {
                res.status(404).json({
                    message: "Producto no encontrado",
                    result: false,
                    data: null
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al recuperar el producto",
                result: false,
                error: error.message
            });
        });
};


exports.UpdateProduct = async (req, res) => {
    try {
        let productId = req.params.id;
        let product = await Producto.findByPk(productId);

        if (!product) {
            return res.status(404).json({
                message: "No se encontró el producto para actualizar",
                result: false,
                data: null
            });
        }

        let updatedObject = {
            productSku: req.body.productSku,
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            productShortName: req.body.productShortName || null,
            productDescription: req.body.productDescription || null,
            createdDate: req.body.createdDate || new Date(),
            deliveryTimeSpan: req.body.deliveryTimeSpan || null,
            categoryId: req.body.categoryId || null,
            productImageUrl: req.body.productImageUrl || null,
            userId: req.body.userId || null
        };

        let [updated] = await Producto.update(updatedObject, { returning: true, where: { productId: productId } });

        if (!updated) {
            return res.status(500).json({
                message: "No se pudo actualizar el producto",
                result: false,
                error: "No se pudo actualizar el producto con id = " + productId
            });
        }

        res.status(200).json({
            message: "Producto actualizado con éxito",
            result: true,
            data: updatedObject
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el producto",
            result: false,
            error: error.message
        });
    }
};


exports.DeleteProductById = async (req, res) => {
    try {
        let productId = req.params.id;
        let product = await Producto.findByPk(productId);

        if (!product) {
            return res.status(404).json({
                message: "No existe un producto con id = " + productId,
                result: false,
                data: null
            });
        }

        await product.destroy();
        res.status(200).json({
            message: "Producto eliminado con éxito",
            result: true,
            data: {
                productId: product.productId,
                productSku: product.productSku,
                productName: product.productName,
                productPrice: product.productPrice,
                productShortName: product.productShortName || null,
                productDescription: product.productDescription || null,
                createdDate: product.createdDate || null,
                deliveryTimeSpan: product.deliveryTimeSpan || null,
                categoryId: product.categoryId || null,
                productImageUrl: product.productImageUrl || null,
                userId: product.userId || null
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el producto",
            result: false,
            error: error.message
        });
    }
};



// Controladores para Rol
exports.createRol = (req, res) => {
    let rol = {};
    try {
        rol.nombre = req.body.nombre;

        Rol.create(rol).then(result => {
            res.status(200).json({
                message: "Rol creado con éxito con id = " + result.id_rol,
                rol: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
};

exports.retrieveAllRoles = (req, res) => {
    Rol.findAll()
        .then(rolInfos => {
            res.status(200).json({
                message: "Roles recuperados con éxito!",
                roles: rolInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.getRolById = (req, res) => {
    let rolId = req.params.id;
    Rol.findByPk(rolId)
        .then(rol => {
            res.status(200).json({
                message: "Rol recuperado con éxito con id = " + rolId,
                rol: rol
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.updateRolById = async (req, res) => {
    try {
        let rolId = req.params.id;
        let rol = await Rol.findByPk(rolId);

        if (!rol) {
            res.status(404).json({
                message: "No se encontró el rol para actualizar con id = " + rolId,
                rol: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre
            };
            let result = await Rol.update(updatedObject, { returning: true, where: { id_rol: rolId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar el rol con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Rol actualizado con éxito con id = " + rolId,
                rol: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar el rol con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteRolById = async (req, res) => {
    try {
        let rolId = req.params.id;
        let rol = await Rol.findByPk(rolId);

        if (!rol) {
            res.status(404).json({
                message: "No existe un rol con id = " + rolId,
                error: "404",
            });
        } else {
            await rol.destroy();
            res.status(200).json({
                message: "Rol eliminado con éxito con id = " + rolId,
                rol: rol,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar el rol con id = " + req.params.id,
            error: error.message,
        });
    }
};

// Controladores para Usuario
exports.createUsuario = (req, res) => {
    let usuario = {};

    try {
        usuario.nombre_usuario = req.body.nombre_usuario;
        usuario.email = req.body.email;
        usuario.contrasena = req.body.contrasena;
        usuario.id_rol = req.body.id_rol;

        Usuario.create(usuario).then(result => {
            res.status(200).json({
                message: "Usuario creado con éxito con id = " + result.id_usuario,
                usuario: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
};

exports.retrieveAllUsuarios = (req, res) => {
    Usuario.findAll()
        .then(usuarioInfos => {
            res.status(200).json({
                message: "Usuarios recuperados con éxito!",
                usuarios: usuarioInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.getUsuarioById = (req, res) => {
    let usuarioId = req.params.id;
    Usuario.findByPk(usuarioId)
        .then(usuario => {
            res.status(200).json({
                message: "Usuario recuperado con éxito con id = " + usuarioId,
                usuario: usuario
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.updateUsuarioById = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            res.status(404).json({
                message: "No se encontró el usuario para actualizar con id = " + usuarioId,
                usuario: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre_usuario: req.body.nombre_usuario,
                email: req.body.email,
                contrasena: req.body.contrasena,
                id_rol: req.body.id_rol
            };
            let result = await Usuario.update(updatedObject, { returning: true, where: { id_usuario: usuarioId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar el usuario con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Usuario actualizado con éxito con id = " + usuarioId,
                usuario: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar el usuario con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteUsuarioById = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            res.status(404).json({
                message: "No existe un usuario con id = " + usuarioId,
                error: "404",
            });
        } else {
            await usuario.destroy();
            res.status(200).json({
                message: "Usuario eliminado con éxito con id = " + usuarioId,
                usuario: usuario,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar el usuario con id = " + req.params.id,
            error: error.message,
        });
    }
};

// Controladores para Cliente
exports.CreateCustomers = (req, res) => {
    let cliente = {};

    try {
        cliente.name = req.body.name;
        cliente.mobileNo = req.body.mobileNo;
        cliente.password = req.body.password;

        Cliente.create(cliente).then(result => {
            res.status(200).json({
                message: "Cliente creado con éxito con id = " + result.custId,
                cliente: result,
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
    Cliente.findAll()
        .then(clienteInfos => {
            res.status(200).json({
                message: "Clientes recuperados con éxito!",
                clientes: clienteInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.GetCustomerById = (req, res) => {
    let clienteId = req.params.id;
    Cliente.findByPk(clienteId)
        .then(cliente => {
            res.status(200).json({
                message: "Cliente recuperado con éxito con id = " + clienteId,
                cliente: cliente
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.UpdateCustomerById = async (req, res) => {
    try {
        let clienteId = req.params.id;
        let cliente = await Cliente.findByPk(clienteId);

        if (!cliente) {
            res.status(404).json({
                message: "No se encontró el cliente para actualizar con id = " + clienteId,
                cliente: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                name: req.body.name,
                mobileNo: req.body.mobileNo,
                password: req.body.password
            };
            let result = await Cliente.update(updatedObject, { returning: true, where: { custId: clienteId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar el cliente con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Cliente actualizado con éxito con id = " + clienteId,
                cliente: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar el cliente con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.DeleteCustomerById = async (req, res) => {
    try {
        let clienteId = req.params.id;
        let cliente = await Cliente.findByPk(clienteId);

        if (!cliente) {
            res.status(404).json({
                message: "No existe un cliente con id = " + clienteId,
                error: "404",
            });
        } else {
            await cliente.destroy();
            res.status(200).json({
                message: "Cliente eliminado con éxito con id = " + clienteId,
                cliente: cliente,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar el cliente con id = " + req.params.id,
            error: error.message,
        });
    }
};


// Controladores para Pedido
exports.createPedido = (req, res) => {
    let pedido = {};

    try {
        pedido.custId = req.body.custId;
        pedido.saleDate = req.body.saleDate;
        pedido.totalInvoiceAmount = req.body.totalInvoiceAmount;
        pedido.discount = req.body.discount;
        pedido.paymentNaration = req.body.paymentNaration;
        pedido.deliveryAddress1 = req.body.deliveryAddress1;
        pedido.deliveryAddress2 = req.body.deliveryAddress2;
        pedido.deliveryCity = req.body.deliveryCity;
        pedido.deliveryPinCode = req.body.deliveryPinCode;
        pedido.deliveryLandMark = req.body.deliveryLandMark;
        pedido.isCanceled = req.body.isCanceled;

        Pedido.create(pedido).then(result => {
            res.status(200).json({
                message: "Pedido creado con éxito con id = " + result.saleId,
                pedido: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
};

exports.retrieveAllPedidos = (req, res) => {
    Pedido.findAll()
        .then(pedidoInfos => {
            res.status(200).json({
                message: "Pedidos recuperados con éxito!",
                pedidos: pedidoInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.getPedidoById = (req, res) => {
    let pedidoId = req.params.id;
    Pedido.findByPk(pedidoId)
        .then(pedido => {
            res.status(200).json({
                message: "Pedido recuperado con éxito con id = " + pedidoId,
                pedido: pedido
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.updatePedidoById = async (req, res) => {
    try {
        let pedidoId = req.params.id;
        let pedido = await Pedido.findByPk(pedidoId);

        if (!pedido) {
            res.status(404).json({
                message: "No se encontró el pedido para actualizar con id = " + pedidoId,
                pedido: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                custId: req.body.custId,
                saleDate: req.body.saleDate,
                totalInvoiceAmount: req.body.totalInvoiceAmount,
                discount: req.body.discount,
                paymentNaration: req.body.paymentNaration,
                deliveryAddress1: req.body.deliveryAddress1,
                deliveryAddress2: req.body.deliveryAddress2,
                deliveryCity: req.body.deliveryCity,
                deliveryPinCode: req.body.deliveryPinCode,
                deliveryLandMark: req.body.deliveryLandMark,
                isCanceled: req.body.isCanceled
            };
            let result = await Pedido.update(updatedObject, { returning: true, where: { saleId: pedidoId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar el pedido con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Pedido actualizado con éxito con id = " + pedidoId,
                pedido: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar el pedido con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deletePedidoById = async (req, res) => {
    try {
        let pedidoId = req.params.id;
        let pedido = await Pedido.findByPk(pedidoId);

        if (!pedido) {
            res.status(404).json({
                message: "No existe un pedido con id = " + pedidoId,
                error: "404",
            });
        } else {
            await pedido.destroy();
            res.status(200).json({
                message: "Pedido eliminado con éxito con id = " + pedidoId,
                pedido: pedido,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar el pedido con id = " + req.params.id,
            error: error.message,
        });
    }
};


// Controladores para DetallePedido
exports.createDetallePedido = (req, res) => {
    let detallePedido = {};

    try {
        detallePedido.id_pedido = req.body.id_pedido;
        detallePedido.id_producto = req.body.id_producto;
        detallePedido.cantidad = req.body.cantidad;
        detallePedido.precio_unitario = req.body.precio_unitario;
        detallePedido.subtotal = req.body.subtotal;

        DetallePedido.create(detallePedido).then(result => {
            res.status(200).json({
                message: "Detalle de pedido creado con éxito con id = " + result.id_detalle,
                detallePedido: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
};

exports.retrieveAllDetallesPedido = (req, res) => {
    DetallePedido.findAll()
        .then(detallePedidoInfos => {
            res.status(200).json({
                message: "Detalles de pedidos recuperados con éxito!",
                detallesPedido: detallePedidoInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.getDetallePedidoById = (req, res) => {
    let detallePedidoId = req.params.id;
    DetallePedido.findByPk(detallePedidoId)
        .then(detallePedido => {
            res.status(200).json({
                message: "Detalle de pedido recuperado con éxito con id = " + detallePedidoId,
                detallePedido: detallePedido
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.updateDetallePedidoById = async (req, res) => {
    try {
        let detallePedidoId = req.params.id;
        let detallePedido = await DetallePedido.findByPk(detallePedidoId);

        if (!detallePedido) {
            res.status(404).json({
                message: "No se encontró el detalle de pedido para actualizar con id = " + detallePedidoId,
                detallePedido: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                id_pedido: req.body.id_pedido,
                id_producto: req.body.id_producto,
                cantidad: req.body.cantidad,
                precio_unitario: req.body.precio_unitario,
                subtotal: req.body.subtotal
            };
            let result = await DetallePedido.update(updatedObject, { returning: true, where: { id_detalle: detallePedidoId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar el detalle de pedido con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Detalle de pedido actualizado con éxito con id = " + detallePedidoId,
                detallePedido: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar el detalle de pedido con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteDetallePedidoById = async (req, res) => {
    try {
        let detallePedidoId = req.params.id;
        let detallePedido = await DetallePedido.findByPk(detallePedidoId);

        if (!detallePedido) {
            res.status(404).json({
                message: "No existe un detalle de pedido con id = " + detallePedidoId,
                error: "404",
            });
        } else {
            await detallePedido.destroy();
            res.status(200).json({
                message: "Detalle de pedido eliminado con éxito con id = " + detallePedidoId,
                detallePedido: detallePedido,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar el detalle de pedido con id = " + req.params.id,
            error: error.message,
        });
    }
};

// Crear una nueva oferta
exports.createOferta = (req, res) => {
    let oferta = {};

    try {
        oferta.offerName = req.body.offerName;
        oferta.offerImageUrl = req.body.offerImageUrl;
        oferta.isActive = req.body.isActive;
        oferta.offerPercentDiscount = req.body.offerPercentDiscount;

        Oferta.create(oferta).then(result => {
            res.status(200).json({
                message: "Oferta creada con éxito con id = " + result.offerId,
                oferta: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
};

// Obtener todas las ofertas
exports.retrieveAllOfertas = (req, res) => {
    Oferta.findAll()
        .then(ofertaInfos => {
            res.status(200).json({
                message: "Ofertas recuperadas con éxito!",
                ofertas: ofertaInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

// Obtener una oferta por ID
exports.getOfertaById = (req, res) => {
    let ofertaId = req.params.id;
    Oferta.findByPk(ofertaId)
        .then(oferta => {
            res.status(200).json({
                message: "Oferta recuperada con éxito con id = " + ofertaId,
                oferta: oferta
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

// Actualizar una oferta por ID
exports.updateOfertaById = async (req, res) => {
    try {
        let ofertaId = req.params.id;
        let oferta = await Oferta.findByPk(ofertaId);

        if (!oferta) {
            res.status(404).json({
                message: "No se encontró la oferta para actualizar con id = " + ofertaId,
                oferta: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                offerName: req.body.offerName,
                offerImageUrl: req.body.offerImageUrl,
                isActive: req.body.isActive,
                offerPercentDiscount: req.body.offerPercentDiscount
            };
            let result = await Oferta.update(updatedObject, { returning: true, where: { offerId: ofertaId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar la oferta con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Oferta actualizada con éxito con id = " + ofertaId,
                oferta: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar la oferta con id = " + req.params.id,
            error: error.message
        });
    }
};

// Eliminar una oferta por ID
exports.deleteOfertaById = async (req, res) => {
    try {
        let ofertaId = req.params.id;
        let oferta = await Oferta.findByPk(ofertaId);

        if (!oferta) {
            res.status(404).json({
                message: "No existe una oferta con id = " + ofertaId,
                error: "404",
            });
        } else {
            await oferta.destroy();
            res.status(200).json({
                message: "Oferta eliminada con éxito con id = " + ofertaId,
                oferta: oferta,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar la oferta con id = " + req.params.id,
            error: error.message,
        });
    }
};

// Crear un nuevo Carrito
exports.createCarrito = (req, res) => {
    let carrito = {};
  
    try {
      carrito.custId = req.body.custId;
      carrito.productId = req.body.productId;
      carrito.quantity = req.body.quantity;
      carrito.addedDate = req.body.addedDate;
  
      Carrito.create(carrito).then(result => {
        res.status(200).json({
          message: "Carrito creado con éxito con id = " + result.cartId,
          carrito: result,
        });
      });
    } catch (error) {
      res.status(500).json({
        message: "Error!",
        error: error.message
      });
    }
  };
  
  // Obtener todos los carritos
  exports.GetAllCartItems = (req, res) => {
    Carrito.findAll()
      .then(carritoInfos => {
        res.status(200).json({
          message: "Carritos recuperados con éxito!",
          carritos: carritoInfos
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Error!",
          error: error
        });
      });
  };
  
  // Obtener un Carrito por ID
  exports.getCarritoById = (req, res) => {
    let carritoId = req.params.id;
    Carrito.findByPk(carritoId)
      .then(carrito => {
        res.status(200).json({
          message: "Carrito recuperado con éxito con id = " + carritoId,
          carrito: carrito
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Error!",
          error: error
        });
      });
  };
  
  // Actualizar Carrito por ID
  exports.updateCarritoById = async (req, res) => {
    try {
      let carritoId = req.params.id;
      let carrito = await Carrito.findByPk(carritoId);
  
      if (!carrito) {
        res.status(404).json({
          message: "No se encontró el carrito para actualizar con id = " + carritoId,
          carrito: "",
          error: "404"
        });
      } else {
        let updatedObject = {
          custId: req.body.custId,
          productId: req.body.productId,
          quantity: req.body.quantity,
          addedDate: req.body.addedDate
        };
  
        let result = await Carrito.update(updatedObject, { returning: true, where: { cartId: carritoId } });
  
        if (!result) {
          res.status(500).json({
            message: "Error -> No se puede actualizar el carrito con id = " + req.params.id,
            error: "No se pudo actualizar",
          });
        }
  
        res.status(200).json({
          message: "Carrito actualizado con éxito con id = " + carritoId,
          carrito: updatedObject,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error -> No se puede actualizar el carrito con id = " + req.params.id,
        error: error.message
      });
    }
  };
  
  // Eliminar Carrito por ID
  exports.deleteCarritoById = async (req, res) => {
    try {
      let carritoId = req.params.id;
      let carrito = await Carrito.findByPk(carritoId);
  
      if (!carrito) {
        res.status(404).json({
          message: "No existe un carrito con id = " + carritoId,
          error: "404",
        });
      } else {
        await carrito.destroy();
        res.status(200).json({
          message: "Carrito eliminado con éxito con id = " + carritoId,
          carrito: carrito,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error -> No se puede eliminar el carrito con id = " + req.params.id,
        error: error.message,
      });
    }
  };