import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../Constants/constant";

let initialState = {
    shippingInfo: {},

    // cartItem: [],
}

export function CartReducer(state = initialState, actions) {
    switch (actions.type) {
        case ADD_TO_CART:
            const item = actions.payload;

            const isItemExist = state.cartItem.find(
                (i) => i.product === item.product
            );

            if (isItemExist) {
                return {
                    ...state,
                    cartItem: state.cartItem.map((i) =>
                        i.product === isItemExist.product ? item : i
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItem: [...state.cartItem, item],
                };
            }


        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItem: state.cartItem.filter((i) => i.product !== actions.payload)
            }


        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: actions.payload
            }

        default:
            return state

    }
}






