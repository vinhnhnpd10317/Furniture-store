import "bootstrap/dist/css/bootstrap.min.css";
import "../Css/Product.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Product() {
    const [likedList, setLikedList] = useState<boolean[]>(Array(8).fill(false));

    const toggleLike = (index: number) => {
        const updated = [...likedList];
        updated[index] = !updated[index];
        setLikedList(updated);
    };

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
                    {/* Offcanvas cho mobile */}
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
                                    {[
                                        "Armchair Mimi", "Armchair Curio", "Armchair Dark", "Armchair Dream",
                                        "Armchair Garbo", "Armchair Helen", "Armchair Hùng King", "Armchair Kiko Eponj"
                                    ].map((item, index) => (
                                        <li key={index}>
                                            <a href="#" className="mb-1 d-block py-1 text-decoration-none text-dark product-sidebar-link">
                                                {item}
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

                        {/* Sidebar desktop */}
                        <div className="d-none d-md-block products-sidebar">
                            <h5 className="fw-bold mb-3">Danh Mục</h5>
                            <ul className="list-unstyled ps-0">
                                {[
                                    "Armchair Mimi", "Armchair Curio", "Armchair Dark", "Armchair Dream",
                                    "Armchair Garbo", "Armchair Helen", "Armchair Hùng King", "Armchair Kiko Eponj"
                                ].map((item, index) => (
                                    <li key={index}>
                                        <a href="#" className="mb-1 d-block py-1 text-decoration-none text-dark product-sidebar-link">
                                            {item}
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

                    {/* Products */}
                    <div className="col-md-9">
                        <div className="row">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((_, idx) => (
                                <div className="col-12 col-sm-6 col-md-4 mb-desktop-48" key={idx}>
                                    <div className="product-cards h-100 d-flex flex-column justify-content-between">
                                        <img
                                            src="img/imgproduct/product.png"
                                            alt="Armchair Mimi"
                                            className="img-fluid"
                                        />
                                        <div className="d-flex justify-content-between align-items-start mt-2">
                                            <h6 className="mb-1">Armchair Mimi</h6>
                                            <div className="text-end">
                                                <i
                                                    className={`bi ${likedList[idx] ? "bi-heart-fill" : "bi-heart"} product-heart-icon`}
                                                    style={{
                                                        fontSize: "1.2rem",
                                                        color: likedList[idx] ? "red" : "#999",
                                                        cursor: "pointer"
                                                    }}
                                                    onClick={() => toggleLike(idx)}
                                                />
                                                <div className="product-price mt-1" style={{ fontSize: 14 }}>
                                                    49.000.000₫
                                                </div>
                                            </div>
                                        </div>
                                        <div className="btn-group d-flex justify-content-center mt-3 product-btn-group">
                                            <button className="btn btn-outline-dark btn-sm">THÊM VÀO GIỎ</button>
                                            <button className="btn btn-dark btn-sm">XEM THÊM</button>
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
