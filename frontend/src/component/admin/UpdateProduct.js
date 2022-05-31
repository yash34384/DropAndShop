import MetaData from '../layout/MetaData';
import React, { useEffect, useState } from 'react';
import './newProduct.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearErrors,
  updateProduct,
  getProductDetails
} from '../../actions/productAction';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import SquareFoot from '@material-ui/icons/SquareFoot';
import Beenhere from '@material-ui/icons/Beenhere';
import MenuBook from '@material-ui/icons/MenuBook';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useNavigate();
  const { error, product } = useSelector(state => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated
  } = useSelector(state => state.product);

  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [field, setField] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setCourse(product.course);
      setField(product.field);
      setAuthor(product.author);
      setDescription(product.description);
      setPrice(product.price);
      setOldImages(product.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success('Product updated Successfully');
      history('/admin/products');
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, history, isUpdated, id, product, updateError]);

  const updateProductSubmitHandler = e => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('name', name);
    myForm.set('course', course);
    myForm.set('field', field);
    myForm.set('author', author);
    myForm.set('price', price);
    myForm.set('description', description);

    images.forEach(image => {
      myForm.append('images', image);
    });
    dispatch(updateProduct(id, myForm));
  };

  const updateProductImagesChange = e => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach(file => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview(old => [...old, reader.result]);
          setImages(old => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Book Name"
                required
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div>
              <Beenhere />
              <input
                type="text"
                placeholder="Recommended for which Course eg-B.tech, Mba"
                required
                value={course}
                onChange={e => setCourse(e.target.value)}
              />
            </div>
            <div>
              <MenuBook />
              <input
                type="text"
                placeholder="Recommended for which field eg-Mechanical, IT, Finance"
                required
                value={field}
                onChange={e => setField(e.target.value)}
              />
            </div>
            <div>
              <SquareFoot />
              <input
                type="text"
                placeholder="Author or Publication"
                required
                value={author}
                onChange={e => setAuthor(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={e => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="name"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Book Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Book Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              UPDATE
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
