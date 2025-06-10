import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faYoutube, faInstagram, faTiktok, faXTwitter, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import { faMailBulk, faPhone } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
    return (
        <>
            <footer className="bg-dark text-light">
                {/* Banner footer */}
                <div
                    className="text-secondary d-flex justify-content-center align-items-end text-center"
                    style={{
                        backgroundImage: "url('/public/img/imgfooter-header/banner1.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "75vh",
                        position: "relative",
                        paddingBottom: "60px" // khoảng cách từ dưới lên
                    }}
                >
                    <div>
                        <h1 className="display-4 fw-bold text-light">Tôn vinh không gian sống của bạn</h1>
                        <div className="mt-4">
                            <a href="/contact" className="btn btn-outline-dark btn-lg">
                                Liên hệ với tôi
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="container pt-5">
                    <div className="row ms-5">
                        <div className="col-md-3 mb-4 text-start">
                            {/* tiêu đề */}
                            <h5 className="fw-bold mb-3 pb-4 position-relative d-inline-block">
                                KẾT NỐI VỚI G7 PRIMME
                                <span
                                    style={{
                                        content: '""',
                                        position: "absolute",
                                        bottom: 0,
                                        left: 0,
                                        width: "25%",
                                        height: "3px",
                                        backgroundColor: "#ccc",
                                    }}
                                />
                            </h5>

                            {/* logo */}
                            <div className="border mb-5" style={{ width: '50%' }}>
                                <img src="../public/img/logog7.jpg" alt="Logo shop" style={{ height: "50px", width: "100%" }} />
                            </div>
                            <p className="h6 fw-normal mb-2">
                                FOLLOW US
                            </p>
                            <nav className="d-flex gap-1">
                                <a href="#" className="text-light text-decoration-none">Istagram</a>
                                <span className="text-light">-</span>
                                <a href="#" className="text-light text-decoration-none">Zalo</a>
                                <span className="text-light">-</span>
                                <a href="#" className="text-light text-decoration-none">Facebook</a>
                            </nav>
                            <a href="#" className="btn btn-outline-light btn-log mt-3">Xem Cửa Hàng</a>
                        </div>

                        <div className="col-md-3 mb-4 text-start">
                            <h5 className="fw-bold mb-3 pb-4 position-relative d-inline-block">
                                G7 PRIMME - NỘI THẤT
                                <span
                                    style={{
                                        content: '""',
                                        position: "absolute",
                                        bottom: 0,
                                        left: 0,
                                        width: "25%",
                                        height: "3px",
                                        backgroundColor: "#ccc",
                                    }}
                                />
                            </h5>
                            <ul className="list-unstyled d-flex flex-column gap-4">
                                <li className="text-light text-decoration-none fw-semibold">Giới Thiệu</li>
                                <li className="text-light text-decoration-none fw-semibold">Chuyện Nhà G7 PRIME</li>
                                <li className="text-light text-decoration-none fw-semibold">Tuyển Dụng</li>
                                <li className="text-light text-decoration-none fw-semibold">Thẻ Hội Viên</li>
                                <li className="text-light text-decoration-none fw-semibold">Đổi Trả Hàng</li>
                            </ul>
                        </div>

                        <div className="col-md-3 mb-4 text-start">
                            <h5 className="fw-bold mb-3 pb-4 position-relative d-inline-block">
                                CẢM HỨNG G7 PRIMME
                                <span
                                    style={{
                                        content: '""',
                                        position: "absolute",
                                        bottom: 0,
                                        left: 0,
                                        width: "25%",
                                        height: "3px",
                                        backgroundColor: "#ccc",
                                    }}
                                />
                            </h5>
                            <ul className="list-unstyled d-flex flex-column gap-4">
                                <li className="text-light text-decoration-none fw-semibold">Sản Phẩm</li>
                                <li className="text-light text-decoration-none fw-semibold">Ý tưởng - Cảm Hứng</li>
                                <li className="text-light text-decoration-none fw-semibold">Nghệ Thuật</li>
                            </ul>
                        </div>

                        <div className="col-md-3 mb-4 text-start">
                            <h5 className="fw-bold mb-3 pb-4 position-relative d-inline-block">
                                NEWSLETER
                                <span
                                    style={{
                                        content: '""',
                                        position: "absolute",
                                        bottom: 0,
                                        left: 0,
                                        width: "45%",
                                        height: "3px",
                                        backgroundColor: "#ccc",
                                    }}
                                />
                            </h5>
                            <p className="text-light mb-3">
                                Hãy để lại email của bạn để nhận được những ý tưởng trang trí mới và những thông tin, ưu đãi từ G7 Prime
                            </p>
                            <p className="text-light mb-3">
                                Email: primeG7@gmail.com.vn
                            </p>
                            <p className="text-light mb-3">
                                Số điện thoại: <b>0352885026</b>
                            </p>
                        </div>

                    </div>
                </div>

                {/* bottom footer */}
                <div className="bg-black text-light py-5">
                    <div className="container">
                        <div className="row">
                            {/* Contact */}
                            <div className="col-md-8 fw-light text-start">
                                <p className="fw-semibold"><FontAwesomeIcon icon={faPhone}/> 0352.885.026<FontAwesomeIcon className="ms-4" icon={faMailBulk}/> vinhnhnpd10317@gmail.com </p>
                                <p>© 2025 G7 Prime – Cửa hàng chuyên nội thất cao cấp. Đã đăng ký bản quyền.</p>
                                <p className="">Nội dung trên trang web này có thể không được phép tại quốc gia/khu vực của bạn. Vui lòng kiểm tra các quy định pháp lý địa phương liên quan và thoát khỏi trang nếu cần thiết. G7 Prime từ chối mọi trách nhiệm liên quan đến việc bạn truy cập thông tin này. Một số sản phẩm có thể không có sẵn tại khu vực của bạn. Vui lòng tham khảo thông tin sử dụng được phê duyệt, vì nội dung này không dành cho các thị trường chưa được cấp phép.</p>
                            </div>
                            {/* Contact social */}
                            <div className="col-md-4 fw-light">
                                <h5 className="fw-bold">G7 Prime Shop</h5>
                                <div className="d-flex flex-wrap mt-5 text-center">
                                    <a href="" className="text-light me-5"><FontAwesomeIcon icon={faYoutube} size="2x" /></a>
                                    <a href="" className="text-light me-5"><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
                                    <a href="" className="text-light me-5"><FontAwesomeIcon icon={faFacebook} size="2x" /></a>
                                    <a href="" className="text-light me-5"><FontAwesomeIcon icon={faTiktok} size="2x" /></a>
                                    <a href="" className="text-light me-5"><FontAwesomeIcon icon={faXTwitter} size="2x" /></a>
                                    <a href="" className="text-light me-5"><FontAwesomeIcon icon={faLinkedin} size="2x" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
