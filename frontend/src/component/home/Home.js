import React, { useEffect } from 'react';
import poster from '../../images/poster.png';
import '../home/Home.css';
import ProductCard from './ProductCard.js';
import MetaData from '../layout/MetaData';
import { clearErrors, getProduct } from '../../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../layout/loader/Loader';
import { useAlert } from 'react-alert';

function Home() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
      {
        loading ? (
          <Loader />
        ) : (
          <>
            <MetaData title="DropAndShop" />
            <img src={poster} alt="poster" className="poster" />
            <div className="feature">
              <div className="feature-title">Featured Books</div>
              <div className="container">
                {products && products.map((product) => (
                  <ProductCard product={product} />
                ))}
              </div>
            </div>
          </>
        )
      }
    </>
  );
}

export default Home;
