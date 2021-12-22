import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../configs/dbConfig';

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
        type: DataTypes.INTEGER
    },
    countInStock: {
        type: DataTypes.INTEGER
    },
    

      
    
});

export default Product; 