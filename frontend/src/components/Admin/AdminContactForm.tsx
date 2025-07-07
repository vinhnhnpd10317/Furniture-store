import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formRef.current) return;

    emailjs
      .sendForm(
        'service_vuazo77',       // ✅ Service ID của bạn
        'template_kiycbff',      // ✅ Template ID (đúng với ảnh dashboard)
        formRef.current,         // ✅ Form reference
        'N_VEUE_HoD6g4vHJM'      // ✅ Public Key
      )
      .then(() => {
        setSent(true);
        setLoading(false);
        formRef.current?.reset();
      })
      .catch((err) => {
        console.error('Gửi lỗi:', err);
        setError('❌ Gửi thất bại. Vui lòng thử lại.');
        setLoading(false);
      });
  };

  return (
    <div className="container my-5 p-4 bg-light rounded shadow">
      <h2 className="mb-4">Liên hệ hỗ trợ</h2>

      {sent && <div className="alert alert-success">✅ Gửi thành công!</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form ref={formRef} onSubmit={handleSubmit}>
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
            type="tel"
            name="phone"
            className="form-control"
            placeholder="Số điện thoại"
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
            name="title"
            className="form-control"
            placeholder="Tiêu đề liên hệ"
            required
          />
        </div>

        <div className="mb-3">
          <textarea
            name="message"
            className="form-control"
            placeholder="Nội dung"
            rows={4}
            required
          />
        </div>

        <button type="submit" className="btn btn-dark" disabled={loading}>
          {loading ? 'Đang gửi...' : 'Gửi yêu cầu'}
        </button>
      </form>
    </div>
  );
}