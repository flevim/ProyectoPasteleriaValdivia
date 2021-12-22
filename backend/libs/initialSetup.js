import db from '../models'; 

export const syncDB = () => {

    db.sequelize.sync({ force: true })
    .then(() => {
        console.log("Drop and Resync DB"); 
        
    }); 

    

}


