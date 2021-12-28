import { combineReducers } from 'redux';
import { userLoggedReducer, postsReducer } from './userReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['loggedInUser']
}

const reducers = combineReducers({
    loggedInUser: userLoggedReducer,
    posts: postsReducer
})

export default persistReducer(persistConfig, reducers);