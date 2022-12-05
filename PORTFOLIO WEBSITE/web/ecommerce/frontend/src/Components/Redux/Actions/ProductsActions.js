import axios from "axios";

import {
    ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS,
    CLEAR_ERROR,
    ADD_REVIEW_SUCCESS,
    ADD_REVIEW_FAIL
} from "../Constants/constant";


export const GetProduct = (keyword = "", CurrentPage = 1, Price = [1000, 25000], Category) => async (dispatch) => {

    dispatch({
        type: ALL_PRODUCT_REQUEST
    })

    let link = `http://localhost:4000/products/getProduct?keyword=${keyword}&page=${CurrentPage}&price[gte]=${Price[0]}&price[lte]=${Price[1]}`

    if (Category) {
        link = `http://localhost:4000/products/getProduct?keyword=${keyword}&page=${CurrentPage}&price[gte]=${Price[0]}&price[lte]=${Price[1]}&category=${Category}`
    }

    await axios.get(link).then((result) => {
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: result.data
        })
    }).catch((err) => {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: err.message
        })
    });





}


export const GetProductDetail = (id) => async (dispatch) => {

    dispatch({
        type: PRODUCT_DETAIL_REQUEST
    })

    await axios.get(`http://localhost:4000/products/ProductDetail/${id}`).then((result) => {
        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: result.data
        })
    }).catch((err) => {
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: err.message
        })
    });





}

export const ClearError = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERROR
    })
}


export const AddReviews = (productId, rating, comment) => async (dispatch) => {
    const config = {
        headers: { "Content-Type": "application/json" },
    };
    await axios.put("http://localhost:4000/products/addProductReview", {
        productId,
        rating,
        comment
    }, config).then((result) => {
        dispatch({
            type: ADD_REVIEW_SUCCESS,
            payload: result.data
        })
    }).catch((err) => {
        dispatch({
            type: ADD_REVIEW_FAIL,
            payload: err.message

        })
    });
}