/* Aquí podemos crear relaciones 
entre tablas en otra capa de abstracción 
que me permita poder programar con mayor 
facilidad la api y la autenticación */ 

import { sequelize } from '../configs/dbConfig.js';
import Sequelize from 'sequelize';

import User from './User';
import Product from './Product';
import Order from './Order'; 
import Adress from './Adress';
import OrderItem from './OrderItem';
import PaymentResult from './paymentResult'; 

const db = {}; 

db.Sequelize = Sequelize; 
db.sequelize = sequelize; 

db.user = User; 
db.product = Product;
db.order = Order;
db.adress = Adress;
db.orderItem = OrderItem;
db.paymentResult = PaymentResult;

// Relaciones Usuario 
db.user.hasMany(db.order);
db.user.hasMany(db.adress);

db.adress.belongsTo(db.user, {
    foreignKey: 'userId' 
}); 


// Relaciones Orden 
db.order.hasMany(db.orderItem);
db.order.belongsTo(db.user, { 
    foreignKey: 'userId'
});

db.order.belongsTo(db.adress, {
    foreignKey: 'adressId'
})

// Relacion item de orden
db.orderItem.belongsTo(db.order); 
db.orderItem.belongsTo(db.product); 

// Relacion orden y paymentResult 

db.order.hasOne(db.paymentResult); 
db.paymentResult.belongsTo(db.order); 

/*
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
}); 

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId",
    as: "roles"
}); 
 
db.ROLES = ["user", "admin", "seller"]; 

*/ 
export default db; 



