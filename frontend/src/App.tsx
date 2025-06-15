import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppRoutes from "./router/router";
import AdminRoutes from "./router/AdminRoutes";
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* User layout */}
        <Route path="/*" element={<AppRoutes />} />

        {/* Admin layout */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
