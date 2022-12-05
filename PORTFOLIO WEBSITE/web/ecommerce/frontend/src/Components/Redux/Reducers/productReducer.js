import { ADD_REVIEW_FAIL, ADD_REVIEW_SUCCESS, ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERROR, PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS } from "../Constants/constant";

const initialState = {
    products: [],
    error: {},
    productReview: {}
}

export function ProdutReducer(state = initialState, actions) {
    switch (actions.type) {
        case ALL_PRODUCT_REQUEST:

            return {
                loading: true,
                products: []
            }
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: actions.payload.products,
                productsCount: actions.payload.productsCount,
                resultPerPage: actions.payload.resultPerPage,
                filteredProductCount: actions.payload.filteredProductCount
            }

        case ALL_PRODUCT_FAIL:
            return {
                loading: false,
                error: actions.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        case ADD_REVIEW_SUCCESS:
            return {
                productReview: actions.payload
            }

        case ADD_REVIEW_FAIL:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}




const initialStates = {
    product: {},
    error: {}
}

export function ProdutDetailReducer(state = initialStates, actions) {
    switch (actions.type) {
        case PRODUCT_DETAIL_REQUEST:

            return {
                loading: true,
                ...state
            }
        case PRODUCT_DETAIL_SUCCESS:
            return {
                loading: false,
                product: actions.payload.product,
            }

        case PRODUCT_DETAIL_FAIL:
            return {
                loading: false,
                error: actions.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}
