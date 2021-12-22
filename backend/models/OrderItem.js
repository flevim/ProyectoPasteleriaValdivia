import { DataTypes, DATE, Model } from 'sequelize';
import { sequelize } from '../config/db.config';
import Product from './Product';

const OrderItem = sequelize.define('item_orden', {
    name: {
        type: DataTypes.STRING,
    },
    qty: {
        type: DataTypes.NUMBER
    },
    image: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.NUMBER
    },
    productId: {
        type: DataTypes.NUMBER,
        references: {
            model: Product,
            key: 'id'
        }   
    },
}); 

export default OrderItem; 