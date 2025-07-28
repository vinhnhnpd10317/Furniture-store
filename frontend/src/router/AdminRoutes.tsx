import { Routes, Route, useNavigate } from "react-router-dom";

import Dashboard from "../components/Admin/Dashboard";
import AdminLayout from "../components/Admin/AdminLayout";
import HeaderAdmin from "../components/HeaderAdmin";
import Categories from "../components/Admin/Categories";
import Products from "../components/Admin/Products";
import Customer from "../components/Admin/Customer";
import Addcustomer from "../components/Admin/Addcustomer";
import Orders from "../components/Admin/Orders";
import ProductForm from "../components/Admin/Product/ProductForm";
import CommentManager from "../components/Admin/CommentManager";
import ArticleList from "../components/Admin/ArticleList";
import ArticleForm from "../components/Admin/ArticleForm";
import Favorites from "../components/Admin/Favorites";
import Checkout from "../components/Admin/CheckOut";

import RequireAdminAuth from "./RequireAdminAuth";

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
    <RequireAdminAuth>
    <>
      <HeaderAdmin />
        <AdminLayout>
          <Routes>
            <Route index element={<Dashboard/>}/>
            <Route path="comments" element={<CommentManager />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="categories" element={<Categories/>}/>
            <Route path="products" element={<Products/>}/>
            <Route path="products/addproduct" element={<AddProductWrapper />} />
            <Route path="products/edit/:id" element={<EditProductWrapper />} />
            <Route path="customer/add" element={<Addcustomer/>}/>
            <Route path="customer" element={<Customer/>}/>
            <Route path="article" element={<ArticleList />} />
            <Route path="article/add" element={<ArticleForm />} />
            <Route path="article/edit/:id" element={<ArticleForm />} />
            <Route path="orders" element={<Orders/>}/>
            <Route path="favorites" element={<Favorites />} />
            <Route path="checkout" element={<Checkout/>}/>
          </Routes>
        </AdminLayout>
    </>
    </RequireAdminAuth>
  );
}
