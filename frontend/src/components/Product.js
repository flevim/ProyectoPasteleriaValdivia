import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
  const { product } = props;
  return (
    
    <div key={product.id} className="card">
      <Link to={`/product/${product.id}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
          <h2>{product.name}</h2>
        <div className="row">
          <div className="category-product">{product.category}</div>
          
          
        </div>
        <div className="row">
          {product.countInStock > 0 ? (
                          <span className="stock success">Disponible</span>
                        ) : (
                          <span className="stock danger">No Disponible</span>
          )}
          
        </div>
        
        <div className="row">
          <div className="price">${product.price}</div>
          
        </div>
        <div className="row">
          <div className="details-product"><Link to={`/product/${product.id}`}>
          Detalles →
        </Link></div>
          
        </div>
        
        
      </div>
    </div>
  );
}
