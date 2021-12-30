import { ActionTypes } from "../contants/action-types";
import Axios from 'axios';

export const loginSuccess = (user) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        payload: { user: user },
    }
}

export const loginFail = () => {
    return {
        type: ActionTypes.LOGIN_FAIL,
    }
}

export const logOut = () => {
    return {
        type: ActionTypes.LOGOUT,
        payload: { user: null },
    }
}

export const getPost = (id) => {
    return async (dispatch) => {
        const token = localStorage.getItem("email");

        const config = {
            headers: {
                "Content-Type": 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        const post = await Axios.get(`http://localhost:3000/api/post/${id}`, config)
        dispatch({
            type: ActionTypes.POSTS,
            payload: post.data
        }) 
        return post.data
        // .catch((error) => {
        //     console.log(error);
        // })
    };

}