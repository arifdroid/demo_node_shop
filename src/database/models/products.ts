import { DataTypes } from 'sequelize';

/**
 * Products database model.
 * See https://sequelize.org/v5/manual/models-definition.html to learn how to customize it.
 */
export default function (sequelize) {
  const products = sequelize.define(
    'products',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {

        }
      },
      color: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      description: {
        type: DataTypes.TEXT,
      },
      categories: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {

        }
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

  products.associate = (models) => {
    // models.products.belongsToMany(models.orders, {
    //   as: 'productId',
    //   constraints: false,
    //   through: 'ordersOrderIdProductsProductId',
    // });
    models.products.hasMany(models.orders_products, {
      as: 'orderId',
    });

    models.products.hasMany(models.file, {
      as: 'images',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.products.getTableName(),
        belongsToColumn: 'images',
      },
    });
    
    models.products.belongsTo(models.tenant, {
      as: 'tenant',
    });

    models.products.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.products.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return products;
}
