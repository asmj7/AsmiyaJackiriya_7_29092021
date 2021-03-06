import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import reduxStore from './redux/store'
import reportWebVitals from './reportWebVitals';
import {PersistGate} from 'redux-persist/integration/react'; 

ReactDOM.render(
  <React.StrictMode>
    <Provider store={reduxStore.store}>
      <PersistGate persistor={reduxStore.persistor}>
      <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
