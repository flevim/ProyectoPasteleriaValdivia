import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.config';

const Product = sequelize.define('producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    precio: {
        type: DataTypes.INTEGER,
    },
    
    descripcion: {
        type: DataTypes.STRING
    },
    nombre: {
        type: DataTypes.STRING,
    },
    categoria: {
        type: DataTypes.STRING,
    },
    img_url: {
        type: DataTypes.STRING
    },
    

    
});

export default Product; 