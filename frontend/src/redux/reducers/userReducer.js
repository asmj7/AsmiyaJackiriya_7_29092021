import { ActionTypes } from "../contants/action-types";

const initialState = {
    token: localStorage.getItem("email"),
    isLoggedIn: null,
    user: null,
    isAdmin: false
}

export const userLoggedReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.LOGIN_SUCCESS:
            localStorage.getItem("email", payload.token)
            return {
                ...state,
                isLoggedIn: true,
                user: payload
            };
            case ActionTypes.LOGOUT:
                localStorage.removeItem("email")
                return {
                    ...state,
                    token: null,
                    user: null,
                    isLoggedIn: false
                };
        default:
            return state;
    }
}