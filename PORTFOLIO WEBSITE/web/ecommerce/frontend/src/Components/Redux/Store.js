import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from '@redux-devtools/extension';
import { ProdutReducer, ProdutDetailReducer } from "./Reducers/productReducer";
import AuthReduers, { ProfileReduers, UpdatePasswordReduers } from "./Reducers/UserReducer";
import { CartReducer } from "./Reducers/Cart_Reducer";
import { OrderReducer } from "./Reducers/OrderReducer";


const rootReducer = combineReducers({
    products: ProdutReducer,
    productDetail: ProdutDetailReducer,
    Authentication: AuthReduers,
    profile: ProfileReduers,
    updatePassword: UpdatePasswordReduers,
    cart: CartReducer,
    orders: OrderReducer
})


const initialState = {

    cart: {
        cartItem: localStorage.getItem("cartItems") ?
            JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo: localStorage.getItem("Shipping Info") ?
            JSON.parse(localStorage.getItem("Shipping Info")) : {},
    }

}


const Store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
)


export default Store