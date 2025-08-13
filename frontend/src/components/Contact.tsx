import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSent, setIsSent] = useState(false);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    emailjs
      .sendForm(
        "service_vuazo77", // Service ID
        "template_kiycbff", // Template ID
        form.current,
        "N_VEUE_HoD6g4vHJM" // Public Key
      )
      .then(() => {
        setIsSent(true);
        form.current?.reset();
        setTimeout(() => setIsSent(false), 5000);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
      });
  };

  return (
    <div className="container my-5">
      <div className="row align-items-center g-4">
        {/* LEFT - Form liên hệ */}
        <div className="col-md-6">
          <div className="p-4 border rounded shadow-sm bg-white">
            <div className="mb-3">
              <span className="badge bg-dark text-light">
                📞 HOTLINE: 1800 7200
              </span>
            </div>
            <h3 className="fw-bold mb-3">Bạn cần hỗ trợ?</h3>
            <p>Xin vui lòng để lại yêu cầu hỗ trợ của bạn.</p>

            <form ref={form} onSubmit={sendEmail}>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Họ tên"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  placeholder="Số điện thoại"
                  pattern="[0-9]*"
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.value = target.value.replace(/[^0-9]/g, "");
                  }}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  placeholder="Địa chỉ của bạn"
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  name="message"
                  className="form-control"
                  rows={4}
                  placeholder="Nội dung liên hệ"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-dark w-100">
                GỬI YÊU CẦU
              </button>
              {isSent && (
                <div className="alert alert-success mt-3" role="alert">
                  ✅ Gửi thành công!
                </div>
              )}
            </form>
          </div>
        </div>

        {/* RIGHT - Google Maps */}
        <div className="col-md-6">
          <Link
            to="/store-map"
            className="ratio ratio-4x3 shadow-sm border rounded d-block"
            style={{ overflow: "hidden" }}
          >
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.8299964972623!2d108.1671981!3d16.0519232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142191686b4d0a7%3A0x77c8a107ad9ffd37!2zMTE2IE5ndXnhu4VuIEh1eSBUxrDhu59uZywgSG_DoCBBbiwgTGlhbiBDaGnDqnUsIMSQw6AgTuG6tW5nIDU1MDAwMA!5e0!3m2!1svi!2s!4v1721049503135!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0, pointerEvents: "none" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
