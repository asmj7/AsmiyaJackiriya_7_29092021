import { ActionTypes } from "../contents/action-types";

const initialState = {
    token: localStorage.getItem("email"),
    isLoggedIn: null,
    user: null,
    isAdmin: false
}

const stateTwo = {
    post: {},
    posts: []
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

export const postsReducer = (state = stateTwo, action) => {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.POST:
            return {
                ...state,
                post: payload
            }
        case ActionTypes.DELETEPOST:
            return {
                ...state,
                post: payload
            }
        case ActionTypes.POSTS:
            return {
                ...state,
                posts: payload
            }
        case ActionTypes.COMMENTS:
            return {
                ...state,
                comments: payload
            };
        default:
            return state;
    }
}