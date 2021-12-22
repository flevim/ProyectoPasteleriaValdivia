import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.config';

const Product = sequelize.define('producto', {
    name: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING
    },
    category: {
        type: DataTypes.STRING
    },
    
    description: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.STRING
    },
    countInStock: {
        type: DataTypes.NUMBER
    },
    

      
    
});

export default Product; 