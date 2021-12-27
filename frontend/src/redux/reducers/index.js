import { combineReducers } from 'redux';
import { userGuestReducer, userLoggedReducer, logoutReducer } from './userReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['loggedInUser']
}

const reducers = combineReducers({
    loggedInUser: userLoggedReducer,
})

export default persistReducer(persistConfig, reducers);