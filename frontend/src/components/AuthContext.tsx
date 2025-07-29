import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

// Interface thông tin người dùng
export interface User {
  id: number;
  name: string;
  email: string;
  vai_tro: string;
  dia_chi?: string; 
}

// Interface context
interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// Tạo context mặc định
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

// Provider để bao bọc ứng dụng
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user từ localStorage khi component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Lỗi khi parse user từ localStorage:", error);
        localStorage.removeItem("user"); // Xoá nếu dữ liệu lỗi
      }
    }
  }, []);

  // Hàm đăng nhập
  const login = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  // Hàm đăng xuất
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook để sử dụng Auth
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
