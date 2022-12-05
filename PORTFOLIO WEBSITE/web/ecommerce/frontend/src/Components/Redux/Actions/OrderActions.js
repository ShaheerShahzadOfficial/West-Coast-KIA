import axios from "axios"
import { CREATE_NEW_ORDER, CREATE_NEW_ORDER_FAIL, CREATE_NEW_ORDER_REQUEST } from "../Constants/constant"

const CreateOrder = (shippingInfo,
    orderItem,
    itemPrice,
    shippingPrice,
    totalPrice,
) => async (dispatch) => {

    dispatch({
        type: CREATE_NEW_ORDER_REQUEST
    })


    axios.post("http://localhost:4000/order/createOrder",
        {
            shippingInfo,
            orderItem,
            itemPrice,
            shippingPrice,
            totalPrice,
        },
        {
            withCredentials: true,
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        }
    ).then((result) => {
        dispatch({
            type: CREATE_NEW_ORDER,
            payload: result.data
        })
    }).catch((err) => {
        dispatch({
            type: CREATE_NEW_ORDER_FAIL,
            payload: err.response.data.message
        })
    });


}


export {
    CreateOrder
}