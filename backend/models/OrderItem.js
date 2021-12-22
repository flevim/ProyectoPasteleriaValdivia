import { DataTypes, DATE, Model } from 'sequelize';
import { sequelize } from '../configs/dbConfig';
import Product from './Product';

const OrderItem = sequelize.define('item_orden', {
    name: {
        type: DataTypes.STRING,
    },
    qty: {
        type: DataTypes.INTEGER
    },
    image: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.INTEGER
    },
    //productId: {
    //    type: DataTypes.NUMBER,
    //    references: {
    //        model: Product,
    //        key: 'id'
    //    }   
    //},
}); 

export default OrderItem; 