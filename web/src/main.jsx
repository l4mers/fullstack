import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/base.css';
import './styles/components.css';
import './styles/utilities.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  // The Provider wrapps the App so I can access the states anywhere
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
