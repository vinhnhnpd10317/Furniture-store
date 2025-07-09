import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import 'bootstrap/dist/css/bootstrap.min.css';

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formRef.current) return;

    emailjs
      .sendForm(
        'service_vuazo77',
        'template_kiycbff',
        formRef.current,
        'N_VEUE_HoD6g4vHJM'
      )
      .then(() => {
        setSent(true);
        setLoading(false);
        formRef.current?.reset();
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: '',
        });
      })
      .catch((err) => {
        console.error('Gửi thất bại:', err);
        setError('❌ Gửi thất bại. Vui lòng thử lại.');
        setLoading(false);
      });
  };

  return (
    <div className="container my-5 p-4 bg-light rounded shadow">
      <div className="row">
        <div className="col-md-6">
          <div className="mb-2">
            <span className="badge bg-secondary">📞 HOTLINE: 1800 7200</span>
          </div>
          <h3 className="fw-bold">Bạn cần hỗ trợ?</h3>
          <p>Xin vui lòng để lại yêu cầu hỗ trợ của bạn.</p>

          {sent && <div className="alert alert-success">✅ Gửi thành công!</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Họ tên"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="tel"
                className="form-control"
                placeholder="Số điện thoại"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="Nội dung liên hệ"
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-dark" disabled={loading}>
              {loading ? 'Đang gửi...' : 'GỬI YÊU CẦU'}
            </button>
          </form>
        </div>

        <div className="col-md-6 d-flex align-items-center justify-content-center mt-4 mt-md-0">
          <img
            src="/img/lienhe.jpg"
            alt="Decor"
            className="img-fluid rounded"
            style={{ maxHeight: '400px', objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  );
}