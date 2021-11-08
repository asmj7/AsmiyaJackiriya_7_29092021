import { ActionTypes } from "../contants/action-types";

const initialState = {
    user: 
        {
            firstName: "Jackiriya",
            LastName: "Asmiya",
            email: "test12@gmail.com",
            password: "12345"
        }
}

const initialStateTwo = {
    user: {

    }
}

export const userReducer = (state= initialStateTwo, action) => {
    switch (action.type) {
        case ActionTypes.REGISTER_SUCCESS:
            return {...state, user:action.payload.user};
        default:
            return state;
    }
}