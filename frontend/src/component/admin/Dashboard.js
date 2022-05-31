import React from 'react';
import './dashboard.css';
// import { useSelector, useDispatch } from 'react-redux';
// import { clearErrors, getAllProduct } from '../../actions/productAction';
// import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
// import MyProduct from './MyProduct.js';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // const dispatch = useDispatch();
  // const alert = useAlert();

  // const { products, error } = useSelector(state => state.products);
  // const { user } = useSelector(state => state.user);

  // useEffect(() => {
  //   if (error) {
  //     alert.error(error);
  //     dispatch(clearErrors());
  //   }
  //   dispatch(getAllProduct());
  // }, [dispatch, alert, error]);

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <div className="dashboardContainer">
        {/* <div>Your Books</div>
        <div className="main-book-container">
          {products
            .filter(product => product.user === user._id)
            .map(filteredProduct => (
              <MyProduct filteredProduct={filteredProduct} />
            ))}
        </div> */}
        <Link to="/admin/products" className="get-link">
          YOUR BOOKS
        </Link>
        <Link to="/admin/product" className="create-link">
          CREATE NEW
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
