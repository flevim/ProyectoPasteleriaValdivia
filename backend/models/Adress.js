import { DataTypes, DATE, Model } from 'sequelize';
import { sequelize } from '../configs/dbConfig';


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



