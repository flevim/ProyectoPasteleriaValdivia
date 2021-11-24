import jwt from 'jsonwebtoken';
import config from '../config/auth.config';
import db from '../models'; 

const User = db.user; 

export const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token']; 

    if (!token) {
        return res.status(403).json({
            msg: "Debe proporcionarse un token."
        });
    }

    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                msg: "No autorizado."
            });
        }

        req.userId = decoded.id; 
        console.log(req.userId)
        next(); 
    });
};

export const isAdmin = (req, res, next) => {
    User.findByPk(req.userId)
    .then(user => {
        user.getRoles()
        .then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].nombre === "admin") {
                    next();
                    return; 
                }
            }

            res.status(403).json({
                msg: "Se requiere Rol de admin."
            })
            return; 
        })
    })
}; 

export const isSeller = (req, res, next) => {
    User.findByPk(req.userId)
    .then(user => {
        user.getRoles()
        .then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].nombre === "seller") {
                    next();
                    return; 
                }
            }

            res.status(403).json({
                msg: "Se requiere Rol de seller."
            })
            return; 
        })
    })
}; 

export const isSellerOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "seller") {
            next();
            return;
          }
  
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
  
        res.status(403).send({
          message: "Se requiere rol de admin o de seller."
        });
      });
    });
};