import dotenv from 'dotenv';
import Sequelize from 'sequelize';

dotenv.config(); 

export const sequelize = new Sequelize(
    'base_pasteleria',
    'pvaldivia',
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql',
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