import { ActionTypes } from "../contants/action-types";

// const initialState = {
//     user: 
//         {
//             firstName: "Jackiriya",
//             LastName: "Asmiya",
//             email: "test12@gmail.com",
//             password: "12345"
//         }
// }
const user = localStorage.getItem("email");

const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

console.log(initialState.isLoggedIn)

const initialStateTwo = {
    user: {

    }
}

export const userGuestReducer = (state = initialStateTwo, action) => {
    switch (action.type) {
        case ActionTypes.REGISTER_SUCCESS:
            return { ...state, isLoggedIn: initialState.isLoggedIn, user: action.payload.user };
        default:
            return state;
    }
}

export const userLoggedReducer = (state = initialStateTwo, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_SUCCESS:
            return { ...state, isLoggedIn: initialState.isLoggedIn, user: action.payload.user };
        default:
            return state;
    }
}

export const logoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGOUT:
            return { ...state, isLoggedIn: state.isLoggedIn, user: null };
        default:
            return state;
    }
}