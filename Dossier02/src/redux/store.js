// src/redux/store.js
import { createStore } from 'redux';
import booksReducer from './reducer';  // Assurez-vous que le fichier reducer.js existe également

const store = createStore(booksReducer);

export default store;
