import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom';
//import { createRoot } from 'react-dom/client';

import store from './store';
import App from './App';

// ReactDOM.render 코드
/*
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
*/

// ReactDOM.createRoot 코드
const entryPoint = document.getElementById('root');
createRoot(entryPoint).render(
  <Provider store={store}>
    <App />
  </Provider>
);