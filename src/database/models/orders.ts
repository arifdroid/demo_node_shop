import { DataTypes } from 'sequelize';

/**
 * Orders database model.
 * See https://sequelize.org/v5/manual/models-definition.html to learn how to customize it.
 */
export default function (sequelize) {
  const orders = sequelize.define(
    'orders',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,        
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['importHash', 'tenantId'],
          where: {
            deletedAt: null,
          },
        },

      ],
      timestamps: true,
      paranoid: true,
    },
  );

  orders.associate = (models) => {
    models.orders.belongsTo(models.user, {
      as: 'userId',
      constraints: false,
    });

    // models.orders.belongsToMany(models.products, {
    //   as: 'orderId',
    //   constraints: false,
    //   through: 'ordersOrderIdProductsProductId',
    // });

    models.orders.hasMany(models.orders_products, {
      as: 'productId',
    });


    
    models.orders.belongsTo(models.tenant, {
      as: 'tenant',
    });

    models.orders.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.orders.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return orders;
}
