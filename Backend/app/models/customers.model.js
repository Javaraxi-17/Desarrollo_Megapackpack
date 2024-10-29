// customer.model.js
module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define('Customer', {
        customer_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'CUSTOMER_ID' // Nombre exacto de la columna en mayúsculas
        },
        full_name: {
            type: Sequelize.STRING(255),
            allowNull: false,
            field: 'FULL_NAME' // Nombre exacto de la columna en mayúsculas
        },
        email_address: {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true, // Esto garantiza la unicidad sin crear un índice duplicado
            field: 'EMAIL_ADDRESS' // Nombre exacto de la columna en mayúsculas
        }
    }, {
        tableName: 'MGCUSTOMERS',  // Nombre de la tabla con prefijo MG y en mayúsculas
        schema: 'ADMIN',           // Especificar el esquema
        timestamps: false,         // Deshabilitar las marcas de tiempo
        // Remover o comentar esta sección de índices para evitar duplicados
        /*
        indexes: [
            {
                unique: true,
                fields: ['email_address']
            }
        ]
        */
    });

    return Customer;
};
