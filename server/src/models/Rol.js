import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.config';

const Role = sequelize.define('rol', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
    },
    
  

    
});

export default Role; 