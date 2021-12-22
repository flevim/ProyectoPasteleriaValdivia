import { DatabaseError, DataTypes, DATE, Model } from 'sequelize';
import { sequelize } from '../config/db.config';
import Product from './Product';
import User from './User'; 

const Order = sequelize.define('orden', {
    paymentMethod: {
        type: DataTypes.STRING,
       
    },
    paymentResult: {
        id: DataTypes.STRING,
        status: DataTypes.STRING,
        update_time: DataTypes.STRING,
        email_adress: DataTypes.STRING
    },
    itemsPrice: {
        type: DataTypes.NUMBER
    },
    shippingAdress: {
        type: DataTypes.NUMBER
    },
    totalPrice: {
        type: DataTypes.NUMBER
    },

    user: {
        type: DataTypes.NUMBER,
        refrences: {
            model: User,
            key: 'id'
        }
    },
    isPaid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }, 

    paidAt: {
        type: DataTypes.DATE
    },
    // quizás la quite
    isDelivered: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    deliveredAt: {
        type: DataTypes.DATE
    },
    

    
    
});

export default Order; 