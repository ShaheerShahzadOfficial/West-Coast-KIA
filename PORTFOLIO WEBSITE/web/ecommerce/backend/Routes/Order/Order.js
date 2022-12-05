import express from 'express';
import { DeleteOrder, GetAllOrder, GetSingleOrder, MyOrder, NewOrder, updateOrderStatus } from '../../Controller/OrderController.js';
const OrderRoute = express.Router()
import { AuthenticatedUserRole, checkToken } from '../../middleware/Auth/auth.js';


OrderRoute.route("/createOrder").post(checkToken, NewOrder)
OrderRoute.route("/admin/getSingleOrder/:id").get(checkToken, AuthenticatedUserRole("Admin"), GetSingleOrder)
OrderRoute.route("/myOrder").get(checkToken, MyOrder)
OrderRoute.route("/admin/getAllOrder").get(checkToken, AuthenticatedUserRole("Admin"), GetAllOrder)
OrderRoute.route("/admin/updateOrderStatus/:id").put(checkToken, AuthenticatedUserRole("Admin"), updateOrderStatus)
OrderRoute.route("/admin/deleteOrder/:id").delete(checkToken, AuthenticatedUserRole("Admin"), DeleteOrder)

export default OrderRoute;