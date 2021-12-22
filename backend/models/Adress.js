import { DataTypes, DATE, Model, foreignKey, belongsTo } from 'sequelize';
import { sequelize } from '../configs/db.config';


const Adress = sequelize.define('direccion_envio', {
    fullName: {
        type: DataTypes.STRING,
    },
    adress: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING,
    },
    postalCode: {
        type: DataTypes.STRING
    },
    country: {
        type: DataTypes.STRING
    }
}); 


export default Adress; 



