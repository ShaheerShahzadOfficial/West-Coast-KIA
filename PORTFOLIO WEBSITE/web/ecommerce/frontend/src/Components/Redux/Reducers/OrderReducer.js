import { CREATE_NEW_ORDER, CREATE_NEW_ORDER_FAIL, CREATE_NEW_ORDER_REQUEST } from "../Constants/constant";

const initialState = {
    order: []
}

export function OrderReducer(state = initialState, actions) {
    switch (actions.type) {

        case CREATE_NEW_ORDER_REQUEST:
            return {
                loading: true
            }

        case CREATE_NEW_ORDER:
            return {
                loading: false,
                order: actions.payload
            }
        case CREATE_NEW_ORDER_FAIL:
            return {
                loading: false,
                error: actions.payload
            }

        default:
            return state

    }
}