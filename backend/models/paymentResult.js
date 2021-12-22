import { DataTypes, DATE, Model } from 'sequelize';
import { sequelize } from '../configs/dbConfig';

const PaymentResult = sequelize.define('payment_result', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        status: {
            type: DataTypes.STRING
        },
        update_time: {
            type: DataTypes.STRING
        },
        email_adress: {
            type: DataTypes.STRING            
        } 
});

export default PaymentResult; 