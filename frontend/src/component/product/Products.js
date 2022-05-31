import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../layout/loader/Loader';
import ProductCard from '../home/ProductCard';
import Pagination from 'react-js-pagination';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';

const Products = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const alert = useAlert();

  const { products, loading, resultPerPage, productCount, error } = useSelector(
    state => state.products
  );
  const { keyword } = useParams();

  const setCurrentPageNo = e => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage));
  }, [dispatch, keyword, currentPage, alert, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="All Books" />
          <div className="heading">All Books</div>
          <div className="books-container">
            <div className="all">
              {products &&
                products.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </div>
          {resultPerPage < productCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};
export default Products;
