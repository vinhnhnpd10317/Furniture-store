/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import {
  fetchCartFromDB,
  saveCartItemToDB,
  updateCartItemInDB,
  deleteCartItemFromDB,
} from '../../api/CartApi';

export interface CartItem {
  cartItemId?: number;
  id: number;
  name: string;
  price: number;
  quantity: number;
  material: string;
  texture: string;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  cartCount: number; // ✅ Thêm cartCount vào kiểu context
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user } = useAuth();

  // Tính tổng số lượng sản phẩm
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // 1. Lấy cart từ localStorage nếu chưa login
  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored && !user) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setCartItems(parsed);
      } catch (err) {
        console.error('Lỗi khi đọc localStorage:', err);
        localStorage.removeItem('cart');
      }
    }
  }, [user]);

  // 2. Lưu cart vào localStorage nếu chưa login
  useEffect(() => {
    if (!user) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  // 3. Khi user login: đồng bộ cart từ localStorage lên DB và load từ DB
  useEffect(() => {
    const syncLocalCartToDB = async () => {
      if (user) {
        const stored = localStorage.getItem('cart');
        if (stored) {
          try {
            const localCart: CartItem[] = JSON.parse(stored);
            for (const item of localCart) {
              await saveCartItemToDB(user.id, item.id, item.quantity);
            }
            localStorage.removeItem('cart');
          } catch (err) {
            console.error('Lỗi khi đồng bộ giỏ hàng từ localStorage:', err);
          }
        }

        try {
          const dbCart = await fetchCartFromDB(user.id);
          setCartItems(dbCart);
        } catch (err) {
          console.error('Lỗi khi tải giỏ hàng từ DB:', err);
        }
      }
    };

    syncLocalCartToDB();
  }, [user]);

  // 4. Thêm vào giỏ hàng
  const addToCart = async (item: CartItem) => {
    if (user) {
      try {
        await saveCartItemToDB(user.id, item.id, item.quantity);
        const dbCart = await fetchCartFromDB(user.id);
        setCartItems(dbCart);
      } catch (error) {
        console.error('Lỗi khi lưu vào DB:', error);
      }
    } else {
      setCartItems(prev => {
        const exists = prev.find(p => p.id === item.id);
        if (exists) {
          return prev.map(p =>
            p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p
          );
        }
        return [...prev, item];
      });
    }
  };

  // 5. Cập nhật số lượng
  const updateQuantity = async (id: number, quantity: number) => {
    const item = cartItems.find(p => p.id === id);
    if (!item) return;

    if (user && item.cartItemId) {
      try {
        await updateCartItemInDB(item.cartItemId, quantity);
      } catch (error) {
        console.error('Lỗi khi cập nhật DB:', error);
      }
    }

    setCartItems(prev =>
      prev.map(p => (p.id === id ? { ...p, quantity } : p))
    );
  };

  // 6. Xoá sản phẩm
  const removeFromCart = async (id: number) => {
    const item = cartItems.find(p => p.id === id);
    if (!item) return;

    if (user && item.cartItemId) {
      try {
        await deleteCartItemFromDB(item.cartItemId);
      } catch (error) {
        console.error('Lỗi khi xoá khỏi DB:', error);
      }
    }

    setCartItems(prev => prev.filter(p => p.id !== id));
  };

  // 7. Xoá toàn bộ
  const clearCart = async () => {
    if (user) {
      try {
        const ids = cartItems.map(item => item.cartItemId).filter(Boolean) as number[];
        for (const id of ids) {
          await deleteCartItemFromDB(id);
        }
      } catch (error) {
        console.error("❌ Lỗi khi xoá toàn bộ giỏ hàng trong DB:", error);
      }
    } else {
      localStorage.removeItem('cart');
    }

    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) throw new Error('CartContext must be used within CartProvider');
  return context;
};
