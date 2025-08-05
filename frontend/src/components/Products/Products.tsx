    import "bootstrap/dist/css/bootstrap.min.css";
    import "../Css/Product.css";
    import { useCart } from "../Products/CartContext";
    import "bootstrap/dist/js/bootstrap.bundle.min.js";
    import "bootstrap-icons/font/bootstrap-icons.css";
    import { addFavorite } from "../../api/FavoriteApi";
    import { useAuth } from "../../components/AuthContext";
    import Offcanvas from "bootstrap/js/dist/offcanvas";
    import { useNavigate, useSearchParams } from "react-router-dom";
    import { useEffect, useState, useRef } from "react";
    import { fetchProducts, type ProductItem } from "../../api/ProductApi";
    import { fetchCategories, type CategoryItem } from "../../api/CategoryApi";
    import { getFavoritesByUser } from "../../api/FavoriteApi";

    export default function Product() {
        const navigate = useNavigate();
        const { addToCart } = useCart();
        const { user } = useAuth();
        const nguoi_dung_id = user?.id;

        const [products, setProducts] = useState<ProductItem[]>([]);
        const [categories, setCategories] = useState<CategoryItem[]>([]);
        const [likedList, setLikedList] = useState<boolean[]>([]);
        const [searchParams, setSearchParams] = useSearchParams();

        const [currentPage, setCurrentPage] = useState(1);
        const productsPerPage = 30;
        const productListRef = useRef<HTMLDivElement>(null);

        const categoryIdParam = searchParams.get("categoryId");
        const searchKeyword = searchParams.get("search") || undefined;
        const selectedCategoryId = categoryIdParam ? +categoryIdParam : null;

        const showAllProducts = () => setSearchParams({});
        const handleCategoryClick = (id: number) => setSearchParams({ categoryId: String(id) });

        // lọc sản phẩm theo giá
        const minPriceParam = searchParams.get("minPrice");
        const maxPriceParam = searchParams.get("maxPrice");

        const selectedMinPrice = minPriceParam ? parseInt(minPriceParam) : undefined;
        const selectedMaxPrice = maxPriceParam ? parseInt(maxPriceParam) : undefined;

        const [minPrice, setMinPrice] = useState<number | undefined>();
        const [maxPrice, setMaxPrice] = useState<number | undefined>();

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

        useEffect(() => {
            window.scrollTo(0, 0);
        }, []);

        useEffect(() => {
            fetchCategories()
                .then(setCategories)
                .catch((err) => console.error("Lỗi khi tải danh mục:", err));
        }, []);

        useEffect(() => {
            fetchProducts({
                categoryId: selectedCategoryId ?? undefined,
                search: searchKeyword,
                minPrice: selectedMinPrice,
                maxPrice: selectedMaxPrice,
            })
                .then((data) => {
                    setProducts(data);
                    setLikedList(new Array(data.length).fill(false));
                    setCurrentPage(1); // reset về trang đầu khi lọc mới
                })
                .catch((err) => console.error("Lỗi khi tải sản phẩm:", err));
        }, [searchKeyword, searchParams, selectedCategoryId, selectedMaxPrice, selectedMinPrice]);

        useEffect(() => {
            if (productListRef.current) {
                productListRef.current.scrollIntoView({ behavior: "smooth" });
            }
        }, [currentPage]);

        const toggleLike = async (index: number, productId: number) => {
            const updated = [...likedList];
            updated[index] = !updated[index];
            setLikedList(updated);

            if (!nguoi_dung_id) {
                alert("Vui lòng đăng nhập để thêm vào yêu thích!");
                return;
            }

            try {
                if (updated[index]) {
                    await addFavorite(nguoi_dung_id, productId);
                    alert("Đã thêm vào danh sách yêu thích!");
                }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if (error.response?.status === 409) {
                    alert("Sản phẩm này đã có trong danh sách yêu thích!");
                } else {
                    console.error("Lỗi khi lưu mục yêu thích:", error);
                    alert("Có lỗi xảy ra khi lưu yêu thích!");
                }
            }
        };

        const totalPages = Math.ceil(products.length / productsPerPage);
        const currentProducts = products.slice(
            (currentPage - 1) * productsPerPage,
            currentPage * productsPerPage
        );
        
        useEffect(() => {
            if (!nguoi_dung_id || products.length === 0) return;

            getFavoritesByUser(nguoi_dung_id)
                .then((favorites) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const likedProductIds = favorites.map((fav: any) => fav.san_pham_id);
                    const updatedLikedList = products.map((product) => likedProductIds.includes(product.id));
                    setLikedList(updatedLikedList);
                })
                .catch((err) => {
                    console.error("Lỗi khi tải danh sách yêu thích:", err);
                });
        }, [products, nguoi_dung_id]);

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

                <div className="container my-4" ref={productListRef}>
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

                                <div className="mt-4">
                                    <h5 className="fw-bold mb-3">Lọc theo giá</h5>

                                    {/* Bộ lọc nhanh */}
                                    <div className="d-flex flex-column gap-2 mb-3">
                                        <button
                                            className="btn btn-outline-secondary btn-sm"
                                            onClick={() => {
                                                const params = new URLSearchParams(searchParams);
                                                params.set("minPrice", "100000");
                                                params.set("maxPrice", "1000000");
                                                setSearchParams(params);
                                                setMinPrice(100000);
                                                setMaxPrice(1000000);
                                            }}
                                        >
                                            Từ 100k - 1 triệu
                                        </button>
                                        <button
                                            className="btn btn-outline-secondary btn-sm"
                                            onClick={() => {
                                                const params = new URLSearchParams(searchParams);
                                                params.set("minPrice", "1000000");
                                                params.set("maxPrice", "10000000");
                                                setSearchParams(params);
                                                setMinPrice(1000000);
                                                setMaxPrice(10000000);
                                            }}
                                        >
                                            Từ 1 triệu - 10 triệu
                                        </button>
                                        <button
                                            className="btn btn-outline-secondary btn-sm"
                                            onClick={() => {
                                                const params = new URLSearchParams(searchParams);
                                                params.set("minPrice", "10000000");
                                                params.delete("maxPrice");
                                                setSearchParams(params);
                                                setMinPrice(10000000);
                                                setMaxPrice(undefined);
                                            }}
                                        >
                                            Trên 10 triệu
                                        </button>
                                    </div>

                                    {/* Tùy chọn giá */}
                                    <div className="mb-2">
                                        <label className="form-label">Giá từ:</label>
                                        <input
                                        type="number"
                                        className="form-control"
                                        value={minPrice ?? ""}
                                        onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Đến:</label>
                                        <input
                                        type="number"
                                        className="form-control"
                                        value={maxPrice ?? ""}
                                        onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
                                        />
                                    </div>
                                    <button
                                        className="btn btn-dark w-100"
                                        onClick={() => {
                                        const params = new URLSearchParams(searchParams);
                                        if (minPrice !== undefined) params.set("minPrice", String(minPrice));
                                        else params.delete("minPrice");
                                        if (maxPrice !== undefined) params.set("maxPrice", String(maxPrice));
                                        else params.delete("maxPrice");
                                        setSearchParams(params);
                                        }}
                                    >
                                        Áp dụng
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Danh sách sản phẩm */}
                        <div className="col-md-9">
                            <div className="row">
                                {currentProducts.map((item, idx) => (
                                    <div className="col-12 col-sm-6 col-md-4 mb-desktop-48" key={item.id}>
                                        <div className="product-cards h-100 d-flex flex-column justify-content-between">
                                            <img
                                                src={item.hinh_anh_dai_dien ? `/img/imgproduct/${item.hinh_anh_dai_dien}` : "img/imgproduct/product.png"}
                                                alt={item.ten_san_pham}
                                                className="img-fluid"
                                                style={{ height: "135px", objectFit: "cover", opacity: item.trang_thai_kho === "het_hang" ? 0.6 : 1 }}
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
                                                        onClick={() => toggleLike(idx, item.id)}
                                                    />
                                                    <div className="product-price mt-1" style={{ fontSize: 14 }}>
                                                        {item.gia.toLocaleString("vi-VN")}₫
                                                    </div>
                                                </div>
                                            </div>

                                            {item.trang_thai_kho === "het_hang" ? (
                                                <div className="text-center mt-2 text-danger fw-bold">HẾT HÀNG</div>
                                                ) : (
                                                <div className="btn-group d-flex justify-content-center mt-3 product-btn-group">
                                                    <button className="btn btn-outline-dark btn-sm" onClick={() => handleAddToCart(item)}>
                                                        THÊM VÀO GIỎ
                                                    </button>
                                                    <button className="btn btn-dark btn-sm" onClick={() => navigate(`/productdetail/${item.id}`)}>
                                                        XEM THÊM
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Phân trang */}
                            {totalPages > 1 && (
                                <nav className="mt-4 d-flex justify-content-center">
                                    <ul className="pagination gap-2">
                                        {[...Array(totalPages)].map((_, i) => (
                                            <li key={i} className="page-item">
                                                <button
                                                    className={`page-link border rounded px-3 py-2 ${
                                                        currentPage === i + 1
                                                            ? "bg-secondary text-white fw-bold"
                                                            : "bg-light text-dark"
                                                    }`}
                                                    style={{ borderRadius: "6px", border: "1px solid #ccc" }}
                                                    onClick={() => setCurrentPage(i + 1)}
                                                >
                                                    {i + 1}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
