import React, { createContext, useContext, useState, useEffect } from 'react';

// Định nghĩa loại dữ liệu cho sản phẩm trong giỏ hàng
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  material: string;
  texture: string;
  image: string;
}

// Định nghĩa loại dữ liệu cho context
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

// Tạo Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider cho toàn bộ ứng dụng
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // ✅ Khởi tạo từ localStorage khi load lần đầu
  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  // ✅ Lưu vào localStorage khi cart thay đổi
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Thêm sản phẩm vào giỏ hàng
  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const exists = prev.find(p => p.id === item.id);
      if (exists) {
        return prev.map(p =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + item.quantity }
            : p
        );
      }
      return [...prev, item];
    });
  };

  // ✅ Cập nhật số lượng sản phẩm
  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(prev =>
      prev.map(p => (p.id === id ? { ...p, quantity } : p))
    );
  };

  // ✅ Xoá sản phẩm khỏi giỏ hàng
  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(p => p.id !== id));
  };

  // ✅ Xoá toàn bộ giỏ hàng
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Hook sử dụng CartContext
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) throw new Error('CartContext must be used within CartProvider');
  return context;
};
