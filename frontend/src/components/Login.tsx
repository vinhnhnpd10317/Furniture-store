import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { loginUser, loginWithGoogle } from '../api/Customer';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const backgroundStyle: React.CSSProperties = {
    backgroundImage: 'url(https://nhaxinh.com/wp-content/uploads/2025/04/Ban-Nuoc-Valencia-Mat-Da-04.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    position: 'relative',
  };

  const overlayStyle: React.CSSProperties = {
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
        email: user.email,
        vai_tro: user.vai_tro,
      };
      login(formattedUser);
      navigate('/');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    try {
      if (credentialResponse.credential) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decoded: any = jwtDecode(credentialResponse.credential);
        const googleUser = {
          id: decoded.sub,
          name: decoded.name,
          email: decoded.email,
          picture: decoded.picture,
        };

        // Gọi API để kiểm tra hoặc tạo user trong DB
        const user = await loginWithGoogle(googleUser);
        const formattedUser = {
          id: user.id,
          name: user.ho_ten,
          email: user.email,
          vai_tro: user.vai_tro,
        };

        login(formattedUser); // Lưu vào AuthContext và localStorage
        navigate('/');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Đăng nhập Google thất bại');
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

            <div className="d-flex justify-content-center mb-3">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                  setError('Đăng nhập Google thất bại');
                }}
                useOneTap
                shape="circle"
                size="large"
                logo_alignment="center"
              />
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