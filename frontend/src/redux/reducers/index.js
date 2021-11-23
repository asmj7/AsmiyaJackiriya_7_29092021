import { combineReducers } from 'redux';
import { userGuestReducer, userLoggedReducer, logoutReducer } from './userReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['loggedInGuest', 'loggedInUser']
}

const reducers = combineReducers({
    loggedInGuest: userGuestReducer,
    loggedInUser: userLoggedReducer,
    logout: logoutReducer,
})

export default persistReducer(persistConfig, reducers);