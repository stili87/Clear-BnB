import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import Footer from './components/footer/footer';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
        <Footer />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
