import axios from "axios"

import { FORGOT_PASSWORD_EMAIL, FORGOT_PASSWORD_EMAIL_FAIL, LOAD_USER, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOGIN_USER, LOGIN_USER_FAIL, LOGIN_USER_REQUEST, LOGOUT_USER, LOGOUT_USER_FAIL, REGISTER_USER, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, UPDATE_PROFILE_RESET, UPDATE_PROFILE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD, UPDATE_PASSWORD_FAIL, RESET_PASSWORD_EMAIL, RESET_PASSWORD_EMAIL_REQUEST, RESET_PASSWORD_EMAIL_FAIL } from "../Constants/constant";


export const RegisterUser = (name, email, password, avatar) => async (dispatch) => {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    await axios.post("http://localhost:4000/user/register", {
        name, email, password, avatar
    }, config).then((result) => {
        dispatch({
            type: REGISTER_USER,
            payload: result.data
        })
    }).catch((err) => {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: err.response.data.message
        })
    });

}


export const Login = (email, password) => async (dispatch) => {

    dispatch({ type: LOGIN_USER_REQUEST });


    // const config = { headers: { "Content-Type": "application/json" } }

    await axios.post("http://localhost:4000/user/login", {
        email, password
    }, { withCredentials: true, credentials: "include", headers: { "Content-Type": "application/json" } }).then((result) => {
        dispatch({
            type: LOGIN_USER,
            payload: result.data
        })
    }).catch((err) => {
        dispatch({
            type: LOGIN_USER_FAIL,
            payload: err.response.data

        })
    });

}



export const ForgotPasswordEmail = (email) => async (dispatch) => {

    await axios.post("http://localhost:4000/user/resetPassword", {
        email
    }, { withCredentials: true, }).then((result) => {
        dispatch({
            type: FORGOT_PASSWORD_EMAIL,
            payload: result.data
        })
    }).catch((err) => {
        dispatch({
            type: FORGOT_PASSWORD_EMAIL_FAIL,
            payload: err.response.data.message

        })
    });

}



export const Logout = () => async (dispatch) => {

    await axios.get("http://localhost:4000/user/logout", {
        withCredentials: true,
    }).then(() => {
        dispatch({
            type: LOGOUT_USER,
        })
    }).catch((err) => {
        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: err.response.data.message
        })
    });

}



export const LoadUser = () => async (dispatch) => {
    try {


        dispatch({ type: LOAD_USER_REQUEST });


        const { data } = await axios.get("http://localhost:4000/user/userDetails", { withCredentials: true, credentials: "include" })
        dispatch({
            type: LOAD_USER,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data
        })
    }

}


export const UpdateProfile = (name, email) => async (dispatch) => {
    dispatch({ type: UPDATE_PROFILE_REQUEST });


    await axios.put("http://localhost:4000/user/UpdateUserProfile", {
        name, email
    }, { withCredentials: true, credentials: "include" }).then((result) => {
        dispatch({
            type: UPDATE_PROFILE,
            payload: result.data
        })
    }).catch((err) => {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: err.response.data.message
        })
    });

}


export const UpdatePassword = (newPassword, confirmPassword) => async (dispatch) => {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });


    await axios.put("http://localhost:4000/user/UpdatePassword", {
        newPassword, confirmPassword
    }, { withCredentials: true, credentials: "include" }).then((result) => {
        dispatch({
            type: UPDATE_PASSWORD,
            payload: result.data
        })
    }).catch((err) => {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: err.response.data.message
        })
    });

}


export const ResetPassword = (token, password, confirmPassword) => async (dispatch) => {
    dispatch({ type: RESET_PASSWORD_EMAIL_REQUEST });


    await axios.put(`http://localhost:4000/user/resetPassword/${token}`, {
        password, confirmPassword
    }, { withCredentials: true, credentials: "include" }).then((result) => {
        dispatch({
            type: RESET_PASSWORD_EMAIL,
            payload: result.data
        })
    }).catch((err) => {
        dispatch({
            type: RESET_PASSWORD_EMAIL_FAIL,
            payload: err.response.data.message
        })
    });

}