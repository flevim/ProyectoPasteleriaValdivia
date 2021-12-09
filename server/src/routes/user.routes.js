import { Router } from 'express'; 
const router = Router(); 

import { 
    verifyToken,
    isAdmin,
    isSeller,
    isSellerOrAdmin
 } from '../middlewares/authJwt';

import { 
    userBoard,
    adminBoard,
    sellerBoard,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
 } from '../controllers/user.controller'; 

router.get("/", getAllUsers); 
router.get("/:id", getUserById); 
router.put("/:id", updateUserById); 
router.delete("/:id", deleteUserById);
//router.get("/api/test/seller", [verifyToken, isSeller],sellerBoard); 
//router.get("/api/test/admin", [verifyToken, isAdmin] ,adminBoard); 


export default router; 


