import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { check, validationResult} from 'express-validator/check';
import data from '../data.js';
//import User from '../models/userModel.js';
import User from '../models/User.js'; 

import { generateToken, isAdmin, isAuth } from '../utils.js';

const userRouter = express.Router();

/*
userRouter.get(
  '/top-sellers',
  expressAsyncHandler(async (req, res) => {
    const topSellers = await User.find({ isSeller: true })
      .sort({ 'seller.rating': -1 })
      .limit(3);
    res.send(topSellers);
  })
);
*/
userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    const createdUsers = await User.bulkCreate(data.user);
    res.send({ createdUsers });
  })
);

userRouter.post(
  '/signin',
  [
	check('email', 'Email debe ser válido').isEmail(),
	check('password', 'Este campo no puede estar vacío').not().isEmpty()
	],
  expressAsyncHandler(async (req, res) => {
		const errors = validationResult(req); 
		console.log(errors); 
		
		if (!errors.isEmpty()) {
			return res.status(400).send({errors: errors.array()});
		
		} else {
			const user = await User.findOne({ 
				where: {
					email: req.body.email
				} 
			});
			
			if (user) {
				let passwordIsValid = bcrypt.compareSync(req.body.password, user.password); 
				if (passwordIsValid) {
					res.send({
						id: user.id,
						username: user.username,
						email: user.email,
						isAdmin: user.isAdmin,
						token: generateToken(user),
					});
					return;
				}
			}
			res.status(401).send({errors: [{msg: 'Correo electrónico y/o contraseña inválidas'}]});
		}

		
  })
);

userRouter.post(
	'/register',
	[
		check('username', 'Nombre de usuario debe tener más de 4 caracteres').isLength({min:5}),
		check('email', 'Email debe ser válido').isEmail(),
		check('password', 'Tu contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
		
	],
	expressAsyncHandler(async (req, res) => {
		try {
			const userExistence = await User.findOne({ 
				where: {
					email: req.body.email
				} 
			});
			console.log(userExistence);

			const errors = validationResult(req); 
			console.log(errors); 

			if (!errors.isEmpty()) {
				return res.status(400).send({errors: errors.array()});
			}

			
			if (userExistence) {
				return res.status(400).send({ errors: [{msg: "Este usuario ya existe"}]  })
				
			} else {
				const userCreated = await User.create({
					username: req.body.username,
					email: req.body.email,
					password: bcrypt.hashSync(req.body.password, 10),
				});
				if (userCreated) {
					res.json({
						id: userCreated.id,
						username: userCreated.username,
						email: userCreated.email,
						isAdmin: userCreated.isAdmin,
						token: generateToken(userCreated),
					});
					
				}
		
			}



			
		} catch (err) {
			res.status(500).send({ errors: [{msg: "Server Error"}]})
		}
		

		
	})
);

userRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
	const { id } = req.params; 
    const user = await User.findByPk(id);
    
	if (user) {
      res.send(user);
    
	} else {
      res.status(404).send({ message: 'Usuario no encontrado' });
    }
  })
);

//es necesario testear esta ruta bien
userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
	try {
		console.log(req.body.userId); 
		const user = await User.findByPk(req.body.userId);
		console.log("Usuario: "+user); 
		if (user) {
			if (req.body.password) {
				user.password = bcrypt.hashSync(req.body.password, 8);
			}
			
			let userData = {
				username: req.body.username || user.username,
				email: req.body.email || user.email,
				password: user.password
			}
		
			const updatedUser = await user.update(userData);
			
			res.send({
				id: updatedUser.id,
				username: updatedUser.username,
				email: updatedUser.email,
				isAdmin: updatedUser.isAdmin,
				token: generateToken(updatedUser),
			});
		}
	} catch (err) {
		res.status(500).send({msg: err}); 
	}
    
  })
);

userRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.findAll();
    res.send(users);
  })
);

userRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id);
		if (user) {
			if (user.isAdmin === true) {
				res.status(400).send({ message: 'No puedes eliminar a otro usuario administrador.' });
				return;
			}
			const deleteUser = await user.destroy();
			res.send({ message: 'Usuario Eliminado', user: deleteUser });
			
		} else {
			res.status(404).send({ message: 'Usuario no encontrado' });
		}
	
	} catch(err) {
		res.status(500).send({msg: err}); 
	} 
    
  })
);

userRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  
  expressAsyncHandler(async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id);
		if (user) {
			if (user.isAdmin === true && user.id !== req.params.id) {
				res.status(400).send({ message: 'No puedes editar a otro usuario administrador.' });
				return;
			}
			const userData = {
				username: req.body.username || user.username,
				email: req.body.email || user.email,
				isAdmin: Boolean(req.body.isAdmin)
			}
			console.log()
			// user.isAdmin = req.body.isAdmin || user.isAdmin;
			const updatedUser = await user.update(userData);
			res.send({ message: 'User Updated', user: updatedUser });
		} else {
			res.status(404).send({ message: 'User Not Found' });
		}
	
	} catch(err) {
		res.status(500).send({ msg: err })
	}
    
  })
);

export default userRouter;
