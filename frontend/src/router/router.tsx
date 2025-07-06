import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
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
import UserOrders from "../components/UserOrders";
import NewsSection from "../components/article";
// import InspirationDetail from "../components/Inspiration/InspirationDetail";
import InspirationRouter from "./InspirationRouter";
import OrderForm from "../components/OrderForm";
import FavoriteProducts from "../components/FavoriteProduct";

export default function AppRoutes() {
  return (

    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Account />} />
        <Route path="/productcart" element={<ProductCart />} />
        <Route path="/productdetail/:id" element={<ProductDetail />} />
        <Route path="/aboutpage" element={<AboutPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/inspiration" element={<InspirationPage />} />
        <Route path="/inspiration/:id" element={<InspirationRouter />} />
        <Route path="/userorder" element={<UserOrders />} />
        <Route path="/orderform" element={<OrderForm />} />
        <Route path="/article" element={<NewsSection />} />
        <Route path="/favorites" element={<FavoriteProducts />} />
      </Routes>
      <Footer />
    </>
  );
}
