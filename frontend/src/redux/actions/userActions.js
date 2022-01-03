import { ActionTypes } from "../contents/action-types";
import Axios from 'axios';

export const loginSuccess = (user) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        payload: { user: user },
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
            type: ActionTypes.POST,
            payload: post.data
        })
        return post.data
    };
}

export const getUsers = () => {
    return async (dispatch) => {
        const token = localStorage.getItem("email");

        const config = {
            headers: {
                "Content-Type": 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        const user = await Axios.get("http://localhost:3000/api/auth/", config)
        dispatch({
            type: ActionTypes.USERS,
            payload: user.data
        })
        return user.data
    };
}

export const deleteUserRedux = (id) => {
    return async (dispatch) => {
        const token = localStorage.getItem("email");

        const config = {
            headers: {
                "Content-Type": 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        const user = await Axios.delete(`http://localhost:3000/api/auth/delete/${id}`, config)
        dispatch({
            type: ActionTypes.DELETEUSER,
            payload: user.data
        })
        return user.data
    };

}

// Posts
export const getPosts = () => {
    return async (dispatch) => {
        const token = localStorage.getItem("email");

        const config = {
            headers: {
                "Content-Type": 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        const post = await Axios.get("http://localhost:3000/api/post/", config)
        dispatch({
            type: ActionTypes.POSTS,
            payload: post.data
        })
        return post.data
    };

}

export const deleteOnePost = (id) => {
    return async (dispatch) => {
        const token = localStorage.getItem("email");

        const config = {
            headers: {
                "Content-Type": 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        const post = await Axios.delete(`http://localhost:3000/api/post/delete/${id}`, config)
        if (post) {
            alert('Le post a été supprimé')
        }
        dispatch({
            type: ActionTypes.DELETEPOST,
            payload: post.data
        })
        return post.data
    };

}

export const getComments = () => {
    return async (dispatch) => {
        const token = localStorage.getItem("email");

        const config = {
            headers: {
                "Content-Type": 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        const comment = await Axios.get(`http://localhost:3000/api/comment/`, config)
        dispatch({
            type: ActionTypes.COMMENTS,
            payload: comment.data
        })
        return comment.data
    };
}

export const deleteCommentRedux = (commentId) => {
    return async (dispatch) => {
        const token = localStorage.getItem("email");

        const config = {
            headers: {
                "Content-Type": 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
        const comment = await Axios.delete(`http://localhost:3000/api/comment/delete/${commentId}`, config)
        dispatch({
            type: ActionTypes.DELETECOMMENT,
            payload: comment.data
        })
        return comment.data
    };

}