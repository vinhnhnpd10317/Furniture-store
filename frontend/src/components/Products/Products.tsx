import "bootstrap/dist/css/bootstrap.min.css";
import "../Css/Product.css";
import { useCart } from "../Products/CartContext";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import Offcanvas from "bootstrap/js/dist/offcanvas";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { fetchProducts, type ProductItem } from "../../api/ProductApi";
import { fetchCategories, type CategoryItem } from "../../api/CategoryApi";

export default function Product() {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [products, setProducts] = useState<ProductItem[]>([]);
    const [categories, setCategories] = useState<CategoryItem[]>([]);
    const [likedList, setLikedList] = useState<boolean[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const categoryIdParam = searchParams.get("categoryId");
    const searchKeyword = searchParams.get("search") || undefined;
    const selectedCategoryId = categoryIdParam ? +categoryIdParam : null;

    const showAllProducts = () => {
        setSearchParams({});
    };

    const handleCategoryClick = (id: number) => {
        setSearchParams({ categoryId: String(id) });
    };

    const handleAddToCart = (item: ProductItem) => {
        addToCart({
            id: item.id,
            name: item.ten_san_pham,
            price: Number(item.gia),
            quantity: 1,
            image: item.hinh_anh_dai_dien
                ? `/img/imgproduct/${item.hinh_anh_dai_dien}`
                : "/img/imgproduct/default.jpg",
            material: item.vat_lieu || "N/A",
            texture: item.chat_lieu || "N/A",
        });
        alert("Đã thêm vào giỏ hàng!");
    };

    const toggleLike = (index: number) => {
        const updated = [...likedList];
        updated[index] = !updated[index];
        setLikedList(updated);
    };

    useEffect(() => {
        fetchCategories()
            .then(setCategories)
            .catch((err) => console.error("Lỗi khi tải danh mục:", err));
    }, []);

    useEffect(() => {
        fetchProducts({
            categoryId: selectedCategoryId ?? undefined,
            search: searchKeyword,
        })
            .then((data) => {
                setProducts(data);
                setLikedList(new Array(data.length).fill(false));
            })
            .catch((err) => console.error("Lỗi khi tải sản phẩm:", err));
    }, [searchKeyword, searchParams, selectedCategoryId]);

    return (
        <>
            {/* Banner */}
            <div className="container-fluid p-0 position-relative">
                <img
                    src="img/imgproduct/banner.jpg"
                    alt="Banner"
                    className="img-fluid w-100"
                    style={{ height: "auto", maxHeight: 500, objectFit: "cover" }}
                />
                <div
                    className="position-absolute text-white product-banner-text d-none d-md-block"
                    style={{ top: "40%", left: "12%", zIndex: 2 }}
                >
                    <h2 className="fw-bold text-white">Sản phẩm</h2>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb product-breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="#" className="text-white-50 text-decoration-none">
                                    Trang chủ
                                </a>
                            </li>
                            <li className="breadcrumb-item active fw-bold text-white" aria-current="page">
                                Sản phẩm
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Nút mở sidebar ở mobile */}
            <div className="d-md-none mt-3 ">
                <button
                    className="btn btn-outline-dark"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#categorySidebar"
                    aria-controls="categorySidebar"
                >
                    <i className="bi bi-list me-2"></i> Danh Mục
                </button>
            </div>

            <div className="container my-4">
                <div className="row align-items-stretch">
                    {/* Sidebar Mobile */}
                    <div className="col-md-3 mb-md-0">
                        <div
                            className="offcanvas offcanvas-start d-md-none"
                            tabIndex={-1}
                            id="categorySidebar"
                            aria-labelledby="categorySidebarLabel"
                        >
                            <div className="offcanvas-body">
                                <div className="offcanvas-header">
                                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                </div>
                                <h5 className="fw-bold mb-3">Danh Mục</h5>
                                <ul className="list-unstyled ps-0">
                                    <li>
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                showAllProducts();

                                                const sidebarElement = document.getElementById("categorySidebar");
                                                if (sidebarElement) {
                                                    const bsOffcanvas = Offcanvas.getInstance(sidebarElement) || new Offcanvas(sidebarElement);
                                                    bsOffcanvas.hide();
                                                }
                                            }}
                                            className="mb-1 d-block py-1 text-decoration-none text-dark product-sidebar-link"
                                        >
                                            Tất cả sản phẩm
                                        </a>
                                    </li>
                                    {categories.map((cat) => (
                                        <li key={cat.id}>
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleCategoryClick(cat.id);

                                                    const sidebarElement = document.getElementById("categorySidebar");
                                                    if (sidebarElement) {
                                                        const bsOffcanvas = Offcanvas.getInstance(sidebarElement) || new Offcanvas(sidebarElement);
                                                        bsOffcanvas.hide();
                                                    }
                                                }}
                                                className="mb-1 d-block py-1 text-decoration-none text-dark product-sidebar-link"
                                            >
                                                {cat.ten_danh_muc}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Sidebar Desktop */}
                        <div className="d-none d-md-block products-sidebar">
                            <h5 className="fw-bold mb-3">Danh Mục</h5>
                            <ul className="list-unstyled ps-0">
                                <li>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            showAllProducts();
                                        }}
                                        className="mb-1 d-block py-1 text-decoration-none text-dark product-sidebar-link"
                                    >
                                        Tất cả sản phẩm
                                    </a>
                                </li>
                                {categories.map((cat) => (
                                    <li key={cat.id}>
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleCategoryClick(cat.id);
                                            }}
                                            className="mb-1 d-block py-1 text-decoration-none text-dark product-sidebar-link"
                                        >
                                            {cat.ten_danh_muc}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <h5 className="fw-bold mt-4 mb-3">Màu sắc</h5>
                            <ul className="list-unstyled ps-0">
                                {["Màu trắng", "Màu be", "Màu đỏ", "Màu nâu cafe", "Màu xanh lá", "Màu vàng"].map((color, index) => (
                                    <li key={index}>
                                        <a href="#" className="d-block py-1 text-decoration-none text-dark product-sidebar-link">
                                            {color}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Danh sách sản phẩm */}
                    <div className="col-md-9">
                        <div className="row">
                            {products.map((item, idx) => (
                                <div className="col-12 col-sm-6 col-md-4 mb-desktop-48" key={item.id}>
                                    <div className="product-cards h-100 d-flex flex-column justify-content-between">
                                        <img
                                            src={item.hinh_anh_dai_dien ? `/img/imgproduct/${item.hinh_anh_dai_dien}` : "img/imgproduct/product.png"}
                                            alt={item.ten_san_pham}
                                            className="img-fluid"
                                            style={{ height: "135px", objectFit: "cover" }}
                                        />
                                        <div className="d-flex justify-content-between align-items-start mt-2">
                                            <h6 className="mb-1">{item.ten_san_pham}</h6>
                                            <div className="text-end">
                                                <i
                                                    className={`bi ${likedList[idx] ? "bi-heart-fill" : "bi-heart"} product-heart-icon`}
                                                    style={{
                                                        fontSize: "1.2rem",
                                                        color: likedList[idx] ? "red" : "#999",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => toggleLike(idx)}
                                                />
                                                <div className="product-price mt-1" style={{ fontSize: 14 }}>
                                                    {item.gia.toLocaleString("vi-VN")}₫
                                                </div>
                                            </div>
                                        </div>
                                        <div className="btn-group d-flex justify-content-center mt-3 product-btn-group">
                                            <button className="btn btn-outline-dark btn-sm" onClick={() => handleAddToCart(item)}>
                                                THÊM VÀO GIỎ
                                            </button>
                                            <button className="btn btn-dark btn-sm" onClick={() => navigate(`/productdetail/${item.id}`)}>
                                                XEM THÊM
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
