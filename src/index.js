import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";

import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux'
import ReduxPromise from 'redux-promise'
import reducer from './reducers'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore)

ReactDOM.render(
  <React.StrictMode>
  <Provider store={createStoreWithMiddleware(reducer)}>
    <Router>
      <App/>
    </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

window.store = createStore(reducer)