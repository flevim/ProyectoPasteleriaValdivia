import db from '../database'; 
 

export const getProducts = async (req, res) => {

    const sqlQuery = 'SELECT * FROM producto'; 
    
    db.query(sqlQuery, (err, result) => {
        if (err) throw err; 

        res.send(result); 
    })

}

export const createProduct = async (req, res) => {
    
    const sqlQuery = 'INSERT INTO producto SET ?'; 

    db.query(sqlQuery, [req.body], (err, result) => {
        if (err) throw err; 
        
        res.status(201).json({ msg: "Usuario creado exitósamente" }); 
    })
}

export const getProductById = async (req, res) => {
    const { productId } = req.params;
    /* prevenimos sql injection mediante prepared statements 
    
    leer para más info: 

    https://stackoverflow.com/questions/8263371/how-can-prepared-statements-protect-from-sql-injection-attacks
    
    */ 

    const sqlQuery = 'SELECT * FROM producto WHERE id = ?';

    db.query(sqlQuery, [productId], (err, result) => {
        if (err) throw err; 

        res.send(result); 
    })
}

export const updateProductById = async (req, res) => {
    const { productId } = req.params; 
    
    const sqlQuery = 'UPDATE producto SET ? WHERE id = ?'; 

    db.query(sqlQuery, [req.body, productId], (err, result) => {
        if (err) throw error; 

        res.status(200).json({msg: 'Producto actualizado exitosamente'}); 
    })
}

export const deleteProductById = async (req, res) => {
    const { productId } = req.params; 
    
    const sqlQuery = 'DELETE FROM producto WHERE id = ?';

    db.query(sqlQuery, [productId], (err, result) => {
        if (err) throw error; 

        res.status(200).json({msg: 'Producto eliminado exitosamente'}); 
    })
}
