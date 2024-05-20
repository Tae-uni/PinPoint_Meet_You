// index.js
import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client'; // React 18용 createRoot 가져오기

import store from './store';
import App from './App';

// 진입점 설정
const entryPoint = document.getElementById('root');
const root = createRoot(entryPoint);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
