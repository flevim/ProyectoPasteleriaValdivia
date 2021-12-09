import db from '../models'; 
const Product = db.product; 
const Op = db.sequelize.Op; 

export const getProducts = async (req, res) => {
    Product.findAll()
    .then(products => {
        res.status(200).send(products);
    })
    .catch(err => {
        res.status(500).json({ msg: err })
    })
}

export const getProductById = async (req, res) => {
    const { id } = req.params; 

    Product.findByPk(id)
    .then(product => {
        if (product) {
            res.send(product); 
        
        } else {
            res.status(404).send({
                msg: "Producto no encontrado"
            })
        }
    })
    .catch(err => {
        res.status(500).json({ msg: err })
    })
        
}

export const createProduct = async (req, res) => {
    if (!req.body.nombre) {
        res.status(400).send({
            msg: "Nombre no puede estar vacio"
        });

        return;
    }

    // Create product 
    const product = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        categoria: req.body.categoria,
        img_url: req.body.img_url
    }

    Product.create(product)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            msg: err
        })
    })
}

export const updateProductById = async (req, res) => {
    const { id } = req.params;

    Product.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.status(200).json({ msg: "Producto actualizado correctamente." }); 
        
        } else {
            res.status(400).json({ msg: "Producto no encontrado" });
        }
    })
    .catch(err => {
        res.status(500).json({ msg: err });     
    })
}

export const deleteProductById = async (req, res) => {
    const { id } = req.params;

    Product.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            msg: "Producto ha sido eliminado exitósamente."
          });
        } else {
          res.send({
            message: "Producto no encontrado."
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Ha ocurrido un error al eliminar producto con id=" + id
        });
      });
}
