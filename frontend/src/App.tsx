import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppRoutes from "./router/router";
import AdminRoutes from "./router/AdminRoutes";
import './App.css';
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <AuthProvider> {/* ✅ Bọc tất cả bên trong AuthProvider */}
      <Router>
        <Routes>
          {/* User layout */}
          <Route path="/*" element={<AppRoutes />} />

          {/* Admin layout */}
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
