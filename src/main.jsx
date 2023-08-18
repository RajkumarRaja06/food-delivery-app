import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

import { UserProvider } from './context/userContext.jsx';
import { CreateItemProvider } from './context/createItemContext.jsx';
import { CartProvider } from './context/cartContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <CreateItemProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </CreateItemProvider>
    </CartProvider>
  </React.StrictMode>
);
