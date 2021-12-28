import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProductsByCategory } from '../actions/productActions';

export default function CategoryScreen() {
  const dispatch = useDispatch();
  const params = useParams(); 
  const { name: categoryName } = params;
 
  const productListByCategory = useSelector((state) => state.productListByCategory);
  const { loading, error, productsByCategory } = productListByCategory;
  
  useEffect(() => {
    dispatch(getProductsByCategory(categoryName));
  }, [dispatch]);
  

  
  return (
    <div>
      
      <h2>{ categoryName } </h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {productsByCategory.length === 0 && <MessageBox>No se encuentran productos</MessageBox>}
          <div className="row center">
            {productsByCategory.map((product) => (
              <Product key={product.id} product={product}></Product>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

