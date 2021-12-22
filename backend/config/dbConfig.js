import dotenv from 'dotenv';
import Sequelize from 'sequelize';

dotenv.config(); 

const userDB = process.env.DB_USER; 
const dialect = process.env.DB_DIALECT; 
const database = process.env.DB_DATABASE;
const passwordDB = process.env.DB_PASSWORD; 

export const sequelize = new Sequelize(database, userDB, passwordDB, {
        host: 'localhost',
        dialect: dialect,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
    
);

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }