import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AppRoutes from './routes';
import store from './store';
import './styles/global.css';

console.log('🚀 Loading DMT Education App...');

const rootElement = document.getElementById('root');
if (rootElement) {
  console.log('Root element found, rendering App...');
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    rootElement
  );
  console.log('App rendered successfully!');
} else {
  console.error('Root element not found!');
}
