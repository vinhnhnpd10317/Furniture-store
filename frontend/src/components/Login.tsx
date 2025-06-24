import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'; // ← sửa đúng path đến AuthContext của bạn
import 'bootstrap/dist/css/bootstrap.min.css';
import { loginUser } from '../api/Customer';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const backgroundStyle = {
    backgroundImage: 'url(https://nhaxinh.com/wp-content/uploads/2025/04/Ban-Nuoc-Valencia-Mat-Da-04.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    position: 'relative',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1,
  };

  const cardStyle = {
    zIndex: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    borderRadius: '15px',
    padding: '30px',
    width: '100%',
    maxWidth: '550px',
    WebkitBackdropFilter: 'blur(10px)',
    color: 'white',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
  };

  const inputStyle = {
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '10px',
    padding: '10px 15px',
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const user = await loginUser(email, password);
    const formattedUser = {
      id: user.id,
      name: user.ho_ten, 
      email: user.email
    };

    login(formattedUser); // Lưu thông tin đã định dạng vào AuthContext
    navigate('/'); 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    setError(err.message);
  }
};


  return (
    <div style={backgroundStyle}>
      <div style={overlayStyle}></div>
      <div className="d-flex justify-content-center align-items-center h-100">
        <div style={cardStyle}>
          <h4 className="text-center mb-4 text-white">Đăng Nhập</h4>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="form-label text-white">Email</label>
              <input
                type="email"
                className="form-control"
                style={inputStyle}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label htmlFor="password" className="form-label text-white">Mật khẩu</label>
              <input
                type="password"
                className="form-control"
                style={inputStyle}
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-warning text-white">Đăng Nhập</button>
            </div>
            <p className="text-center text-white mb-4">Hoặc</p>
            <div className="d-flex justify-content-between mb-3 gap-2">
              <button type="button" className="btn btn-danger w-100">Google</button>
              <button type="button" className="btn btn-primary w-100">Facebook</button>
            </div>
            <p className="text-center text-white">
              Không có tài khoản? <a href="/signup" className="fw-bold text-white text-decoration-underline">Đăng ký tại đây!</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
