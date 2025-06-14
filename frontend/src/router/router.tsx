import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Product from "../components/Products/Products";
import Login from "../components/Login";
import Signup from "../components/SignUp";
import Account from "../components/Account";
import ProductCart from "../components/Products/ProductCart";
import ProductDetail from "../components/Products/ProductDetail";
import AboutPage from "../components/Abouts/AboutPage";
import Contact from "../components/Contact";
// import InspirationHero from "../components/Inspiration/InspirationHero";
import InspirationPage from "../components/Inspiration/InspirationPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Product />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/account" element={<Account />} />
      <Route path="/productcart" element={<ProductCart />} />
      <Route path="/productdetail" element={<ProductDetail />} />
      <Route path="/aboutpage" element={<AboutPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/inspiration" element={<InspirationPage />} />
    </Routes>
  );
}

export default AppRoutes;
