import { ActionTypes } from "../contants/action-types"

export const loginSuccess = (user) => {
    return {
        type:ActionTypes.LOGIN_SUCCESS,
        payload: {user: user},
    }
}

export const loginFail = () => {
    return {
        type:ActionTypes.LOGIN_FAIL,
    }
}

export const logOut = () => {
    return {
        type:ActionTypes.LOGOUT,
        payload: {user: null},
    }
}