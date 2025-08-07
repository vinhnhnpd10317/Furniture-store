import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { faFacebook, faYoutube, faInstagram, faTiktok, faXTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faMailBulk, faPhone } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
    return (
        <footer className="mt-5 bg-dark text-light">
            {/* Banner */}
            <div
                className="d-flex justify-content-center align-items-end text-center text-secondary"
                style={{
                    backgroundImage: "url('/public/img/imgfooter-header/banner1.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "50vh",
                    paddingBottom: "60px",
                }}
            >
                <div>
                    <h1 className="display-5 fw-bold text-light">Tôn vinh không gian sống của bạn</h1>
                    <a href="/contact" className="btn btn-outline-light btn-lg mt-3">
                        Liên hệ với tôi
                    </a>
                </div>
            </div>

            {/* Footer content */}
            <div className="container py-5">
                <div className="row gy-4">
                    <div className="col-12 col-md-3">
                        <h5 className="fw-bold position-relative mb-3">KẾT NỐI VỚI G7 PRIME</h5>
                        <div className="mb-3">
                            <img src="../public/img/logog7.jpg" alt="Logo" className="img-fluid" style={{ maxWidth: "150px" }} />
                        </div>
                        <p className="h6 mb-2">THEO DÕI CHÚNG TÔI</p>
                        <nav className="d-flex gap-2 flex-wrap">
                            <a href="" className="text-light text-decoration-none">Instagram</a>
                            <a href="#" className="text-light text-decoration-none">Zalo</a>
                            <a href="https://www.facebook.com/vinhkonzin.nguyen" className="text-light text-decoration-none">Facebook</a>
                        </nav>
                        <a href="/products" className="btn btn-outline-light btn-sm mt-3">Xem Cửa Hàng</a>
                    </div>

                    <div className="col-12 col-md-3">
                        <h5 className="fw-bold mb-3">G7 PRIME - NỘI THẤT</h5>
                        <ul className="list-unstyled">
                            <li><a href="AboutPage" className="text-light text-decoration-none">Giới Thiệu</a></li>
                            <li><a href="/interior-design" className="text-light text-decoration-none">Thiết Kế Nội Thất</a></li>
                            <li><a href="/contact" className="text-light text-decoration-none">Liên Hệ</a></li>
                            <li><a href="/rooms/living-room" className="text-light text-decoration-none">Phòng</a></li>
                            <li><a href="#" className="text-light text-decoration-none">Đổi Trả Hàng</a></li>
                        </ul>
                    </div>

                    <div className="col-12 col-md-3">
                        <h5 className="fw-bold mb-3">CẢM HỨNG G7 PRIME</h5>
                        <ul className="list-unstyled">
                            <li><a href="/products" className="text-light text-decoration-none">Sản Phẩm</a></li>
                            <li><a href="/inspiration" className="text-light text-decoration-none">Ý tưởng - Cảm Hứng</a></li>
                            <li><a href="/favorites" className="text-light text-decoration-none">Sản Phẩm Yêu Thích</a></li>
                        </ul>
                    </div>

                    <div className="col-12 col-md-3">
                        <h5 className="fw-bold mb-3">BẢN TIN</h5>
                        <p>Hãy để lại email của bạn để nhận ý tưởng trang trí và ưu đãi từ G7 Prime</p>
                        <p>Email: primeG7@gmail.com.vn</p>
                        <p>SĐT: <strong>0352 885 026</strong></p>
                    </div>
                </div>
            </div>

            {/* Bottom footer */}
            <div className="bg-black text-light py-4">
                <div className="container">
                    <div className="row gy-3">
                        <div className="col-12 col-md-8">
                            <p><FontAwesomeIcon icon={faPhone} /> 0352.885.026 &nbsp;
                                <FontAwesomeIcon icon={faMailBulk} /> vinhnhnpd10317@gmail.com
                            </p>
                            <p>© 2025 G7 Prime – Cửa hàng nội thất cao cấp. Đã đăng ký bản quyền.</p>
                            <p className="small">
                                Nội dung trên trang web có thể không được phép tại quốc gia/khu vực của bạn. Vui lòng kiểm tra các quy định pháp lý địa phương liên quan.
                            </p>
                        </div>
                        <div className="col-12 col-md-4">
                            <h6 className="fw-bold mb-3">G7 Prime Shop</h6>
                            <div className="d-flex flex-wrap gap-3">
                                <a href="https://www.youtube.com/@Phato-wx3kv" className="text-light"><FontAwesomeIcon icon={faYoutube} size="lg" /></a>
                                <a href="https://www.instagram.com/_t.hieuz.13_/?hl=en" className="text-light"><FontAwesomeIcon icon={faInstagram} size="lg" /></a>
                                <a href="https://www.facebook.com/vinhkonzin.nguyen" className="text-light"><FontAwesomeIcon icon={faFacebook} size="lg" /></a>
                                <a href="https://www.tiktok.com/@vinh_nguyenhuunhat?lang=vi-VN" className="text-light"><FontAwesomeIcon icon={faTiktok} size="lg" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
