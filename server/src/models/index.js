/* Aquí podemos crear relaciones 
entre tablas en otra capa de abstracción 
que me permita poder programar con mayor 
facilidad la api y la autenticación */ 

import { sequelize } from '../config/db.config';
import Sequelize from 'sequelize';

import User from './User';
import Product from './Product';
import Role from './Rol';

const db = {}; 

db.Sequelize = Sequelize; 
db.sequelize = sequelize; 

db.user = User; 
db.role = Role; 
db.product = Product;

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

export default db; 



