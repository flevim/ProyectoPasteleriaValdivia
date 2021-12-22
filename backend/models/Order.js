import { DataTypes, DATE, Model } from 'sequelize';
import { sequelize } from '../configs/dbConfig';
//import User from './User'; 

const Order = sequelize.define('orden', {
    paymentMethod: {
        type: DataTypes.STRING,
       
    },
    itemsPrice: {
        type: DataTypes.INTEGER
    },
    shippingAdress: {
        type: DataTypes.INTEGER
    },
    totalPrice: {
        type: DataTypes.INTEGER
    },

    //user: {
    //    type: DataTypes.NUMBER,
    //    refrences: {
    //        model: User,
    //        key: 'id'
    //    }
    //},
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