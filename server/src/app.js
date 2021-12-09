/* solo configuramos aplicación express */ 
import express from 'express'; 
import morgan from 'morgan'; 
import pkg from '../package.json'; 
import { createRoles } from './libs/initialSetup'; 


const app = express(); 

createRoles(); 

/* importar rutas */ 
//import productRoutes from './routes/products.routes'; 
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/products.routes'; 

app.set('pkg', pkg);

/* 
El módulo morgan me otorga mayor información
en el desarrollo del backend con respecto a las consultas
y peticiones que se realizan a este. 

Ej: petición de tipo GET a /products:
    /products 200 9.168 ms - 12

*/ 
app.use(morgan('dev'));

/* Para que el servidor pueda entender peticiones 
en formato json */ 

app.use(express.json());

/* ruta por defecto */ 
app.get('/', (req, res) => {
   res.json({
       author: app.get('pkg').author,
       description: app.get('pkg').description,
       version: app.get('pkg').version
   }); 
});

/* importamos rutas creadas por nosotros */ 
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/users', userRoutes); 

export default app; 

