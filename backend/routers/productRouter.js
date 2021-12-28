import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
//import Product from '../models/productModel.js';
import Product from '../models/Product.js'; 
import User from '../models/User.js';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';

const productRouter = express.Router();

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const pageSize = 6;
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name || '';
    const category = req.query.category || '';
    const order = req.query.order || '';
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    
      /*
    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const categoryFilter = category ? { category } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const sortOrder =
      order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : { _id: -1 };
    *
    const count = await Product.count({
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      
    });
    */
    const products = await Product.findAll({
      //...nameFilter,
      //...categoryFilter,
      //...priceFilter,
      
    });
    //  .sort(sortOrder)
    //  .skip(pageSize * (page - 1))
    //  .limit(pageSize);
    res.send({ products, page});
    //pages: Math.ceil(count / pageSize)
  })
);

productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    let categories = await Product.findAll({
        attributes: ['category']
      
    });
    
    categories = categories.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.place === value.place && t.category === value.category
    )))
     
    res.send(categories);
  })
);

productRouter.get('/categories/:categoryName', 
  expressAsyncHandler(async (req, res) => {
    
    try {
      const category = req.params.categoryName;

      console.log(category);  
      const productsByCategory = await Product.findAll({
        where: {
          category: category 
        }
      })
      
      console.log("Products by category: "+productsByCategory);
      if (productsByCategory) {
        res.status(200).send(productsByCategory); 
      
      } else {
        res.status(400).send({ msg: "Categoría no encontrada" })
      }
    
    } catch (err) {
       res.status(500).send({msg: err})
    }
        

    
  }))

productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const admin = await User.findOne({ where: { isAdmin: true }});
    console.log(admin);
    if (admin) {
      const products = data.products.map((product) => ({
        ...product,
        admin: admin.id,
      }));
      const createdProducts = await Product.bulkCreate(products);
      res.send({ createdProducts });
    } else {
      res
        .status(500)
        .send({ message: 'No existe un usurio administrador. Primero ejecute /api/users/seed' });
    }
  })
);

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findByPk(req.params.id); 
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Producto no encontrado' });
    }
  })
);

productRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const product = await Product.create({
        name: 'sample name ' + Date.now(),
        image: '/images/p1.jpg',
        price: 0,
        category: 'sample category',
        countInStock: 0,
        description: 'sample description',
      });
      //const createdProduct = await product.create();
      res.send({ message: 'Product Created', product: product }); 
      
    } catch (err) {
      res.status(500).send({ msg: err });
    }
    
  })
);
productRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;

    try {
      const product = await Product.findByPk(productId);
      if (product) {
        let productData = {
          name: req.body.name,
          price: req.body.price,
          image: req.body.image,
          category: req.body.category,
          countInStock: req.body.countInStock,
          description: req.body.description
        
        }
        const updatedProduct = await product.update(productData);
        res.send({ message: 'Product Updated', product: updatedProduct });
      } else {
        res.status(404).send({ message: 'Product Not Found' });
      }
    
    } catch (err) {
      res.status(500).send({ msg: err })
    }
    
  })
);

productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      const deleteProduct = await product.destroy();
      res.send({ message: 'Product Deleted', product: deleteProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

/*
productRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'You already submitted a review' });
      }
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: 'Review Created',
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);
*/ 
export default productRouter;
