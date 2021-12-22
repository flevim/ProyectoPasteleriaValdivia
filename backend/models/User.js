import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../configs/dbConfig';

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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
        defaultValue: false
    },
    
    
    
});



export default User; 