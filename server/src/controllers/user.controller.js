import db from '../models'; 
const User = db.user; 
const Op = db.sequelize.Op; 

export const getAllUsers = async (req, res) => {
    User.findAll()
    .then(users => {
        res.status(200).send(users);
    })
    .catch(err => {
        res.status(500).json({ msg: err })
    })
}

export const getUserById = async (req, res) => {
    const { id } = req.params; 

    User.findByPk(id)
    .then(user => {
        if (user) {
            res.send(user); 
        
        } else {
            res.status(404).send({
                msg: "Usuario no encontrado"
            })
        }
    })
    .catch(err => {
        res.status(500).json({ msg: err })
    })
        
}

export const updateUserById = async (req, res) => {
    const { id } = req.params;

    User.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.status(200).json({ msg: "Usuario actualizado correctamente." }); 
        
        } else {
            res.status(400).json({ msg: "Usuario no encontrado" });
        }
    })
    .catch(err => {
        res.status(500).json({ msg: err });     
    })
}

export const deleteUserById = async (req, res) => {
    const { id } = req.params;

    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Usuario ha sido eliminado exitósamente."
          });
        } else {
          res.send({
            message: "Usuario no encontrado."
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Ha ocurrido un error al eliminar usuario con id=" + id
        });
      });
}
