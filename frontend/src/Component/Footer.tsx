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
                    <div className="row mx-3">
                        <div className="col-md-3 mb-4">
                            <h6 className="fw-semibold mb-3 d-md-block d-flex justify-content-between align-items-center">
                                KẾT NỐI VỚI G7 PRIME
                            </h6>
                            <ul className="list-unstyled d-flex flex-column gap-4">
                                <li className="text-light text-decoration-none fw-light">Follow Us</li>
                                <li className="text-light text-decoration-none fw-light">Follow Us</li>
                                <li className="text-light text-decoration-none fw-light">Follow Us</li>
                                <li className="text-light text-decoration-none fw-light">Follow Us</li>
                                <li className="text-light text-decoration-none fw-light">Follow Us</li>
                            </ul>
                        </div>

                        <div className="col-md-3 mb-4">
                            <h6 className="fw-semibold mb-3 d-md-block d-flex justify-content-between align-items-center">
                                G7 PRIME
                            </h6>
                            <ul className="list-unstyled d-flex flex-column gap-4">
                                <li className="text-light text-decoration-none fw-light">Follow Us</li>
                                <li className="text-light text-decoration-none fw-light">Follow Us</li>
                                <li className="text-light text-decoration-none fw-light">Follow Us</li>
                                <li className="text-light text-decoration-none fw-light">Follow Us</li>
                                <li className="text-light text-decoration-none fw-light">Follow Us</li>
                            </ul>
                        </div>

                        <div className="col-md-3 mb-4">
                            <h6 className="fw-semibold mb-3 d-md-block d-flex justify-content-between align-items-center">
                                DỊCH VỤ G7 PRIME
                            </h6>
                            <ul className="list-unstyled d-flex flex-column gap-4">
                                <li className="text-light text-decoration-none fw-light">Follow Us</li>
                                <li className="text-light text-decoration-none fw-light">Follow Us</li>
                                <li className="text-light text-decoration-none fw-light">Follow Us</li>
                                <li className="text-light text-decoration-none fw-light">Follow Us</li>
                                <li className="text-light text-decoration-none fw-light">Follow Us</li>
                            </ul>
                        </div>

                        <div className="col-md-3 mb-4">
                            <h6 className="fw-semibold mb-3 d-md-block d-flex justify-content-between align-items-center">
                                GIẢI PHÁP
                            </h6>
                            <ul className="list-unstyled d-flex flex-column gap-4">
                                <li className="text-light text-decoration-none fw-light">Follow Us</li>
                                <li className="text-light text-decoration-none fw-light">Follow Us</li>
                                <li className="text-light text-decoration-none fw-light">Follow Us</li>
                                <li className="text-light text-decoration-none fw-light">Follow Us</li>
                                <li className="text-light text-decoration-none fw-light">Follow Us</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
