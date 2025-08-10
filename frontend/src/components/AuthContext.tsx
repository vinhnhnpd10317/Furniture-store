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
  is_google_user?: boolean;
}

// Interface context
interface AuthContextType {
  user: User | null;
  isLoading: boolean; 
  login: (user: User) => void;
  logout: () => void;
}

// Tạo context mặc định
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true, // ← default ban đầu là loading
  login: () => {},
  logout: () => {},
});

// Provider để bao bọc ứng dụng

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user từ localStorage khi component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Lỗi khi parse user từ localStorage:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false); // ← Kết thúc load
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
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook để sử dụng Auth
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
