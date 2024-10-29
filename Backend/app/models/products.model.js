// products.model.js
module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('Product', {
        product_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'PRODUCT_ID'  // Nombre exacto de la columna en mayúsculas
        },
        product_name: {
            type: Sequelize.STRING(255),
            allowNull: false,
            field: 'PRODUCT_NAME'  // Nombre exacto de la columna en mayúsculas
        },
        unit_price: {
            type: Sequelize.DECIMAL(10, 2),
            field: 'UNIT_PRICE'  // Nombre exacto de la columna en mayúsculas
        },
        product_details: {
            type: Sequelize.BLOB,  // Cambiado a BLOB
            allowNull: true,
            field: 'PRODUCT_DETAILS',  // Nombre exacto de la columna en mayúsculas
            validate: {
                isJson(value) {
                    try {
                        JSON.parse(value);  // Intentar parsear a JSON
                    } catch (e) {
                        throw new Error('Invalid JSON format for product_details');
                    }
                }
            }
        },
        product_image: {
            type: Sequelize.BLOB,
            field: 'PRODUCT_IMAGE'  // Nombre exacto de la columna en mayúsculas
        },
        image_mime_type: {
            type: Sequelize.STRING(512),
            field: 'IMAGE_MIME_TYPE'  // Nombre exacto de la columna en mayúsculas
        },
        image_filename: {
            type: Sequelize.STRING(512),
            field: 'IMAGE_FILENAME'  // Nombre exacto de la columna en mayúsculas
        },
        image_charset: {
            type: Sequelize.STRING(512),
            field: 'IMAGE_CHARSET'  // Nombre exacto de la columna en mayúsculas
        },
        image_last_updated: {
            type: Sequelize.DATE,
            field: 'IMAGE_LAST_UPDATED'  // Nombre exacto de la columna en mayúsculas
        },
        color_id: {
            type: Sequelize.INTEGER,
            field: 'COLOR_ID'  // Nombre exacto de la columna en mayúsculas
        },
        department_id: {
            type: Sequelize.INTEGER,
            field: 'DEPARTMENT_ID'  // Nombre exacto de la columna en mayúsculas
        },
        clothing_id: {
            type: Sequelize.INTEGER,
            field: 'CLOTHING_ID'  // Nombre exacto de la columna en mayúsculas
        }
    }, {
        tableName: 'MGPRODUCTS',  // Nombre exacto de la tabla en mayúsculas
        schema: 'ADMIN',
        timestamps: false
    });
  
    return Product;
};
