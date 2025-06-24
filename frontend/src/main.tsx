import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { CartProvider } from './components/Products/CartContext.tsx';
import { AuthProvider } from './components/AuthContext.tsx'; // ✅ thêm vào

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider> 
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
