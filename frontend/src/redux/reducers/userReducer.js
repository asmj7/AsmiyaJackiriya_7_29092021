import { ActionTypes } from "../contants/action-types";

const initialState = {
    user: [
        {
            firstName: "Jackiriya",
            LastName: "Asmiya",
            email: "test12@gmail.com",
            password: "12345"
        }
    ]
}

export const userReducer = (state= initialState, action) => {
    switch (action.type) {
        case ActionTypes.REGISTER_SUCCESS:
            return state;
        default:
            return state;
    }
}