import React from "react";
import "../CSs/InspirationHero.css"; // Đừng quên import file CSS

const InspirationHero = () => {
  return (
    <div className="container-fluid px-4 my-5">
        <div className="row gx-4">
            {/* Left image with text overlay */}
            <div className="col-md-8 position-relative mb-4 mb-md-0">
            <img
                src="https://decoviet.vn/wp-content/uploads/thi-cong-noi-that-vung-tau.jpg"
                alt="Main Inspiration"
                className="img-fluid w-100 main-hero-image"
            />
            <div className="overlay-text position-absolute top-50 start-0 translate-middle-y text-white ps-5">
                <p className="fs-5 fst-italic">Góc cảm hứng...</p>
                <h1 className="fw-bold display-4">
                Ý TƯỞNG
                <br />
                KHÔNG GIAN
                <br />
                SỐNG
                </h1>
                <button className="btn btn-outline-light mt-3 px-4">XEM THÊM</button>
            </div>
            </div>

            {/* Right column with two stacked images */}
            <div className="col-md-4 d-flex flex-column justify-content-between gap-4">
                <img
                    src="https://noithatgoki.vn/wp-content/uploads/2023/07/noi-that-da-nang.jpeg"
                    alt="Inspiration 1"
                    className="img-fluid w-100 side-hero-image"
                    style={{ height: "235px", objectFit: "cover" }}
                />
                <img
                    src="https://noithatgoki.vn/wp-content/uploads/2023/07/noi-that-da-nang.jpeg"
                    alt="Inspiration 2"
                    className="img-fluid w-100 side-hero-image"
                    style={{ height: "235px", objectFit: "cover" }}
                />
            </div>
        </div>
    </div>
  );
};

export default InspirationHero;
