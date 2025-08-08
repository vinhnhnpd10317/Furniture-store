import React from "react";

const InspirationHero = () => {
  return (
    <div className="container-fluid px-4 my-5">
      {/* Inline CSS để sửa lỗi responsive trên mobile */}
      <style>{`
        .main-hero-image {
          max-height: 100%;
          object-fit: cover;
        }

        .overlay-text {
          max-width: 100%;
          z-index: 2;
        }

        @media (max-width: 767.98px) {
          .overlay-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 1rem;
            text-align: center;
          }

          .overlay-text h1 {
            font-size: 1.5rem;
            line-height: 1.8rem;
          }

          .overlay-text p {
            font-size: 1rem;
          }

          .overlay-text button {
            font-size: 0.9rem;
            padding: 0.4rem 1rem;
          }
        }
      `}</style>

      <div className="row gx-4">
        {/* Cột trái có overlay chữ */}
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

        {/* Cột phải: hai hình xếp chồng */}
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
