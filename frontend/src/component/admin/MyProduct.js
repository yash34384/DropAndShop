import React from 'react';
import './MyProduct.css';

const MyProduct = ({ filteredProduct }) => {
  return (
    <>
      <div className="book-card">
        <div>{filteredProduct.name}</div>
        <div>By :- {filteredProduct.author}</div>
        <div>Rs.{filteredProduct.price}</div>
        <button>DELETE</button>
      </div>
    </>
  );
};

export default MyProduct;
