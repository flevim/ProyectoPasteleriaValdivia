import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.config';

const User = sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
    },
    contraseña: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    nombre: {
        type: DataTypes.STRING,
    },
    apellido: {
        type: DataTypes.STRING,
    },
    ciudad: {
        type: DataTypes.STRING
    },
    codigo_postal: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING(10)
    },
    vistas: {
        type: DataTypes.INTEGER
    }

    
});

export default User; 