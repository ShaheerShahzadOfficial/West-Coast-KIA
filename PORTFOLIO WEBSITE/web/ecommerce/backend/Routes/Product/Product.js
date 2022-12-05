import express from 'express';
const ProductRoute = express.Router()
import { createProduct, CreateProductReview, deleteProduct, DeleteProductReview, getAllProduct, getProductReviews, oneProductDetail, updateProduct } from "../../Controller/productController.js"
import { AuthenticatedUserRole, checkToken } from '../../middleware/Auth/auth.js';



ProductRoute.route("/getProduct").get(getAllProduct)

ProductRoute.route("/newProduct").post(checkToken, AuthenticatedUserRole("Admin"), createProduct)

ProductRoute.route("/updateProduct/:id").put(checkToken, AuthenticatedUserRole("Admin"), updateProduct)

ProductRoute.route("/deleteProduct/:id").delete(checkToken, AuthenticatedUserRole("Admin"), deleteProduct)

ProductRoute.route("/ProductDetail/:id").get(oneProductDetail)

ProductRoute.route("/addProductReview").put(checkToken, CreateProductReview)

ProductRoute.route("/getAllReviews").get(getProductReviews)

ProductRoute.route("/deleteReview").delete(checkToken, DeleteProductReview)



export default ProductRoute