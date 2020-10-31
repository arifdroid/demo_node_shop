import { DataTypes } from 'sequelize';

/**
 * Products database model.
 * See https://sequelize.org/v5/manual/models-definition.html to learn how to customize it.
 */
export default function (sequelize) {
  const orders_products = sequelize.define(
    'orders_products',
    {
      
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      quantity_ordered: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {

        }
      },           
      total_price: {
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
  
  );

  orders_products.associate = (models) => {
    // models.orders_products.belongsToMany(models.orders, {
    //   as: 'productId',
    //   constraints: false,
    //   through: 'ordersOrderIdProductsProductId',
    // });

    models.orders_products.belongsTo(models.products);
    models.orders_products.belongsTo(models.orders);
   
  };

  return orders_products;
}
