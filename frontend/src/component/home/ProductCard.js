import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <>
      <Link className="productCard" to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name} />
        <div className="author">By {product.author}</div>
        <div className="name">
          <div>{product.name}</div>
          <div>{` ₹${product.price}`}</div>
        </div>
        <div className="description">{product.description}</div>
      </Link>
    </>
  );
};

export default ProductCard;