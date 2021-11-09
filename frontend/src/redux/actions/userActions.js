import { ActionTypes } from "../contants/action-types"
export const registerSuccess = (user) => {
    return {
        type:ActionTypes.REGISTER_SUCCESS,
        payload: {user:user},
        loggedIn: true
    }
}

export const registerFail = () => {
    return {
        type:ActionTypes.REGISTER_FAIL,
        loggedIn: false
    }
}

export const loginSuccess = (user) => {
    return {
        type:ActionTypes.LOGIN_SUCCESS,
        payload: {user: user},
        loggedIn: true
    }
}

export const loginFail = () => {
    return {
        type:ActionTypes.LOGIN_FAIL,
        loggedIn: false
    }
}

export const logOut = () => {
    return {
        type:ActionTypes.LOGOUT,
        loggedIn: false
    }
}