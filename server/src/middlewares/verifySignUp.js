import db from '../models';

const ROLES = db.ROLES; 
const User = db.user; 

export const checkDuplicateUsernameOrEmail = (req, res, next) => {
    /*
        Middleware que verifica si ya existen tanto
        el username como el email al momento de 
        registrarse. 
    */


    /* Check Username */ 
    User.findOne({
        where: {
            username: req.body.username
        }
    
    }).then(user => {
        if (user) {
            res.status(400).json({
                msg: "Este nombre de usuario ya existe."
            });
            return; 
        }

        //Check email 
        User.findOne({
            where: {
                email: req.body.email
            }
        
        }).then(user => {
            if (user) {
                res.status(400).json({
                    msg: "Este correo ya existe."
                });
                return; 
            }

            next(); 
        });
    });
}; 



export const checkRolesExisted = (req, res, next) => {
    /* 
        Middleware para verificar si el rol ingresado
        por el usuario existe. 
        Se recorren los roles ingresados y si existe alguno
        que no coincide con los roles seteados inicialmente 
        retornamos un estado de error (400)
    */
    const { roles } = req.body; 
    
    if (roles) {
        for (let i = 0; i < roles.length; i++) {
            if (!ROLES.includes(roles[i])) {
                res.status(400).json({ 
                    msg: `El Rol ${roles[i]} no es válido.`  
                }); 
                
                return; 
            }
        }
    }
    
    next(); 
}
