import { createStore, applyMiddleware, compose } from "redux";
import reducers from './reducers/index';
import { persistStore } from 'redux-persist';
import ReduxThunk from 'redux-thunk';

const store = compose(
    applyMiddleware(ReduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ?window.__REDUX_DEVTOOLS_EXTENSION__() : f =>f
)(createStore)(reducers);

const persistor = persistStore(store);

export default {store, persistor};