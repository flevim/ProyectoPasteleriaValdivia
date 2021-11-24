import { Router } from 'express'; 
const router = Router(); 

import { 
    verifyToken,
    isAdmin,
    isSeller,
    isSellerOrAdmin
 } from '../middlewares/authJwt';

import { 
    allAccess,
    userBoard,
    adminBoard,
    sellerBoard
 } from '../controllers/user.controller'; 

router.get("/api/test/all", allAccess); 
router.get("/api/test/user", [verifyToken], userBoard); 
router.get("/api/test/seller", [verifyToken, isSeller],sellerBoard); 
router.get("/api/test/admin", [verifyToken, isAdmin] ,adminBoard); 


export default router; 


