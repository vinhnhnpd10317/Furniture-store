import { Routes, Route, useNavigate } from "react-router-dom";

import Dashboard from "../components/Admin/Dashboard";
import AdminLayout from "../components/Admin/AdminLayout";
import HeaderAdmin from "../components/HeaderAdmin";
import Categories from "../components/Admin/Categories";
import Products from "../components/Admin/Products";
import Customer from "../components/Admin/Customer";

import AdminArticle from "../components/Admin/Article";

import ProductForm from "../components/Admin/Product/ProductForm";

// Wrapper components
function AddProductWrapper() {
  const navigate = useNavigate();
  return <ProductForm editingProduct={null} onDone={() => navigate("/admin/products")} />;
}

function EditProductWrapper() {
  const navigate = useNavigate();
  return <ProductForm onDone={() => navigate("/admin/products")} />;
}



export default function AdminRoutes() {
  return (
    <>
      <HeaderAdmin />
        <AdminLayout>
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="categories" element={<Categories/>}/>
            <Route path="products" element={<Products/>}/>
            <Route path="products/addproduct" element={<AddProductWrapper />} />
            <Route path="products/edit/:id" element={<EditProductWrapper />} />
            <Route path="customer" element={<Customer/>}/>
            <Route path="article" element={<AdminArticle/>}/>
          </Routes>
        </AdminLayout>
    </>
  );
}
