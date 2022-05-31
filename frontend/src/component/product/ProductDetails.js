import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import '../product/ProductDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProductDetails } from '../../actions/productAction';
import Loader from '../layout/loader/Loader';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';

function ProductDetails() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    state => state.productDetails
  );
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert]);

  let details;
  if (product.user !== undefined) {
    details = Object.values(product.user);
  }
  let data;
  if (product.user !== undefined) {
    data = details.slice(2, -2);
  }
  if (product.user !== undefined) {
    console.log(details, data);
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="productDetails">
          <MetaData title={`${product.name}`} />
          <div className="carousel-div">
            <Carousel className="carousel">
              {product.images &&
                product.images.map((items, i) => (
                  <img
                    className="CarouselImage"
                    key={items.url}
                    src={items.url}
                    alt={`${i} slide`}
                  />
                ))}
            </Carousel>
          </div>
          <div className="side-div">
            <div className="NameOfBook">{product.name}</div>
            <div className="Author">By- {product.author}</div>
            <div className="Price">₹{product.price}</div>
            <div className="Description">{product.description}</div>
            <div className="Recommended">
              Recommended for :- {product.course} {product.field}
            </div>
            <div className="uploadBy">
              Contact to - {data && data[0]} ({data && data[2]}), email -{' '}
              {data && data[1]}, student of - {data && data[3]}{' '}
              {data && data[4]} year
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
