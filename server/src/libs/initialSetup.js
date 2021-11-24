import db from '../models'; 

export const createRoles = () => {
    const Role = db.role; 

    db.sequelize.sync({ force: true })
    .then(() => {
        console.log("Drop and Resync DB"); 
        initial();
    }); 

    const initial = () => {
        Role.create({
            id: 1,
            nombre: "user"
        }); 

        Role.create({
            id: 2,
            nombre: "seller"
        }); 
        
        Role.create({
            id: 3,
            nombre: "admin"
        }); 

    };

}


