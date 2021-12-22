import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
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
  expressAsyncHandler(async (req, res) => {
	const user = await User.findOne({ 
      	where: {
        	email: req.body.email
      	} 
    });
    
	if (user) {
		let passwordIsValid = bcrypt.compareSync(req.body.password, user.password); 
		if (passwordIsValid) {
			res.send({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				token: generateToken(user),
			});
			return;
		}
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

userRouter.post(
	'/register',
	expressAsyncHandler(async (req, res) => {
		try {
			const userCreated = await User.create({
				username: req.body.username,
				email: req.body.email,
				password: bcrypt.hashSync(req.body.password, 8),
			});
			console.log(userCreated);
			if (userCreated) {
				res.json({
					_id: userCreated._id,
					username: userCreated.username,
					email: userCreated.email,
					isAdmin: userCreated.isAdmin,
					token: generateToken(userCreated),
				});
				
			}
	
		} catch (err) {
			res.status(500).send({ msg: "Error" })
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
		const user = await User.findByPk(req.user._id);
		console.log(user); 
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
				_id: updatedUser._id,
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
			if (user.email === 'admin@example.com') {
				res.status(400).send({ message: 'Can Not Delete Admin User' });
				return;
			}
			const deleteUser = await user.destroy();
			res.send({ message: 'User Deleted', user: deleteUser });
			
		} else {
			res.status(404).send({ message: 'User Not Found' });
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
