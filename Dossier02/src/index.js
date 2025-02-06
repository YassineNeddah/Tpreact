// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';  // Utiliser react-dom/client
import { Provider } from 'react-redux';
//import App from './App';
import store from './redux/store';
import Ex2 from './App';

// Créer la racine de l'application en utilisant React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Ex2 />
  </Provider>
);
