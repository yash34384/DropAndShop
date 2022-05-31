const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct, getAdminProducts } = require("../controller/productController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);  //add /products at end of exporting url and call the function to get all products

router.route("/admin/products").get(getAdminProducts);

router.route("/admin/product/new").post(isAuthenticatedUser, createProduct);  //add /product/new at end of exporting url and call the function to post new product

router.route("/admin/product/:id").put(isAuthenticatedUser, updateProduct).delete(isAuthenticatedUser, deleteProduct);  //add /product/:id at end of exporting url and call the function to update or delete product

router.route("/product/:id").get(getSingleProduct);  //get singel product

module.exports = router;  //exporting command