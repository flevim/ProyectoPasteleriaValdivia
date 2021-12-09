import { Router } from 'express';
const router = Router(); 

/* importar controladores */ 
import {
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    createProduct
} from '../controllers/products.controller';
/* */ 


router.get('/', getProducts); 
router.post('/', createProduct); 
router.get('/:id', getProductById); 
router.put('/:id', updateProductById); 
router.delete('/:id', deleteProductById); 


export default router; 