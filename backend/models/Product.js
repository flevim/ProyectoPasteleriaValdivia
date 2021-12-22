import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../configs/db.config';

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
        type: DataTypes.NUMBER
    },
    countInStock: {
        type: DataTypes.NUMBER
    },
    

      
    
});

export default Product; 