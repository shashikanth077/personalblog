import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';

import personalReducer from './store/reducers/personal';
import aboutReducer from './store/reducers/about';
import serviceReducer from './store/reducers/services';
import contactReducer from './store/reducers/contact';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  personal: personalReducer,
  about:aboutReducer,
  services:serviceReducer,
  contact:contactReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
  </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );

serviceWorker.unregister();
