import { combineReducers } from 'redux';
import { userReducer } from './userReducer';

const reducers = combineReducers({
    loggedInUser: userReducer,
})

export default reducers;