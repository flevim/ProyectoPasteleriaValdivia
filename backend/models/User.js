import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/dbConfig';

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true        
        
    },
    username: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    
    isAdmin: {
        type: DataTypes.BOOLEAN,
        default: false
    },
    
    
    
});



export default User; 