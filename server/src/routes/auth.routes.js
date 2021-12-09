import { Router } from 'express'; 
const router = Router(); 

import { 
    checkDuplicateUsernameOrEmail, 
    checkRolesExisted 
} from '../middlewares/verifySignUp';

import { register, login } from '../controllers/auth.controller';

router.post('/register',  [
    checkDuplicateUsernameOrEmail,
    checkRolesExisted], 
    register); 

router.post('/login', login); 

export default router; 



/*
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.post("/api/auth/register",
    ,
      register
    );
  
    app.post("/api/auth/login", login);
};*/