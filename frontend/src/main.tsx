import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { CartProvider } from './components/Products/CartContext.tsx';
import { AuthProvider } from './components/AuthContext.tsx';
 // ✅ thêm vào
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = '30882727216-41dktfa6qf444sndjsik5ruk78utbima.apps.googleusercontent.com';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
