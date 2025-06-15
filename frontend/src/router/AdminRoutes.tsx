import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/Admin/Dashboard";
import AdminLayout from "../components/Admin/AdminLayout";
import HeaderAdmin from "../components/HeaderAdmin";
import Categories from "../components/Admin/Categories";
import Products from "../components/Admin/Products";

export default function AdminRoutes() {
  return (
    <>
      <HeaderAdmin />
      <AdminLayout>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="categories" element={<Categories/>}/>
          <Route path="products" element={<Products/>}/>
        </Routes>
      </AdminLayout>
    </>
  );
}
