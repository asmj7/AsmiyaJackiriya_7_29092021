import { combineReducers } from 'redux';
import { userGuestReducer, userLoggedReducer } from './userReducer';

const reducers = combineReducers({
    loggedInGuest: userGuestReducer,
    loggedInUser: userLoggedReducer,
})

export default reducers;