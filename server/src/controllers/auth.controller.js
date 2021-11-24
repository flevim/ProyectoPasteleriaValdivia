import db from '../models'  ;  
import config from '../config/auth.config'; 

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op; 

export const register = async (req, res) => {
    /*  
    FALTANTE:
    - Validar si existe email al registrar usuario
    - Hacer uso de confirmación de contraseña en formulario
    - Validar campos tanto en auth como en productos
    - JSON web tokens y protección de rutas 
    
    */
    
    /* Guardar usuario en base de datos */ 
    User.create({
        username: req.body.username,
        email: req.body.email,
        contraseña: bcrypt.hashSync(req.body.contraseña, 8),
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        ciudad: req.body.ciudad,
        codigo_postal: req.body.codigo_postal,
        telefono: req.body.telefono
    })
    .then(user => {
        if (req.body.roles) {
            Role.findAll({
                where: {
                    nombre: {
                        [Op.or]: req.body.roles
                    }
                }
            })
            .then(roles => {
                user.setRoles(roles).then(() => {
                    res.send({ msg: "Usuario ha sido registrado exitósamente." });
                });
            });
        } else {
                // user role = 1
                user.setRoles([1]).then(() => {
                    res.send({ message: "Usuario ha sido registrado exitósamente" });
                });
        }
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    }); 

   
}; 

export const login = async (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(user => {
        if (!user) {
            return res.status(404).json({
                msg: "Usuario no encontrado."
            });
        }

        let passwordIsValid = bcrypt.compareSync(
            req.body.contraseña,
            user.contraseña
        ); 

        if (!passwordIsValid) {
            return res.status(401).json({
                accessToken: null,
                msg: "Contraseña inválida."
            }); 
        }

        let token = jwt.sign({ id: user.id }, config.JWT_SECRET, {
            expiresIn: 86400
        });

        let authorities = []; 
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].nombre.toUpperCase());
            }
            res.status(200).json({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            });
        });
    })
    .catch(err => {
        res.status(500).json({
            msg: err.message
        }); 
    });
}; 