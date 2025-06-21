import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { CartProvider } from './components/Products/CartContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
    <App />
    </CartProvider>
  </StrictMode>,
)
