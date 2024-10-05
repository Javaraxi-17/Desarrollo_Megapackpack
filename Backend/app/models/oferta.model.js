module.exports = (sequelize, Sequelize) => {
    const Oferta = sequelize.define('Oferta', {
      offerId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'OFFER_ID' // Nombre exacto de la columna
      },
      offerName: {
        type: Sequelize.STRING(100),
        allowNull: false,
        field: 'OFFER_NAME' // Nombre exacto de la columna
      },
      offerImageUrl: {
        type: Sequelize.STRING(255),
        allowNull: true,
        field: 'OFFER_IMAGE_URL' // Nombre exacto de la columna
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'IS_ACTIVE' // Nombre exacto de la columna
      },
      offerPercentDiscount: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
        field: 'OFFER_PERCENT_DISCOUNT' // Nombre exacto de la columna
      }
    }, {
      tableName: 'OFERTAS',
      schema: 'MEGAPACK',
      timestamps: false
    });
  
    return Oferta;
  };
  