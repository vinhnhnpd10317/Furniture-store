import React, { useState, ChangeEvent, FormEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface FormData {
    name: string;
    phone: string;
    email: string;
    message: string;
    file: File | null;
}

export default function Contact() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        email: '',
        message: '',
        file: null,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, files } = e.target as HTMLInputElement;
        setFormData((prevData) => ({
        ...prevData,
        [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
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
                <form onSubmit={handleSubmit}>
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
                        placeholder="+(84) 0123 456"
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
                        placeholder="Enter email"
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
                    <div className="mb-3">
                    <input
                        type="file"
                        className="form-control"
                        name="file"
                        onChange={handleChange}
                        accept=".pdf,.doc,.docx,.jpg,.png"
                    />
                    <div className="form-text">
                        {formData.file ? formData.file.name : 'Chưa chọn tệp'}
                    </div>
                    </div>
                    <button type="submit" className="btn btn-dark">
                    GỬI YÊU CẦU
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
