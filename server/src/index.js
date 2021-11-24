import app from './app'; 
import dbConfig from './config/db.config';

const port = 4000
app.listen(port);
console.log('Server listen on port ', port); 