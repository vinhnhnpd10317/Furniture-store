import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
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
    backgroundColor: 'rgba(255 255 255 / 35%)',
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

  return (
    <div style={backgroundStyle}>
      <div style={overlayStyle}></div>
      <div className="d-flex justify-content-center align-items-center h-100">
        <div style={cardStyle}>
          <h4 className="text-center mb-4 text-white">Đăng Ký</h4>
        <form>
            <div className="mb-4">
                <label htmlFor="hovaten" className="form-label text-white text-start d-block">Họ và Tên</label>
                <input type="text" id="hovaten" className="form-control" placeholder="Nhập họ và tên" style={inputStyle} />
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="form-label text-white text-start d-block">Email</label>
                <input type="email" id="email" className="form-control" placeholder="Nhập email" style={inputStyle} />
            </div>

            <div className="mb-4">
                <label htmlFor="matkhau" className="form-label text-white text-start d-block">Mật khẩu</label>
                <input type="password" id="matkhau" className="form-control" placeholder="Nhập mật khẩu" style={inputStyle} />
            </div>

            <div className="mb-4">
                <label htmlFor="sdt" className="form-label text-white text-start d-block">Số điện thoại</label>
                <input type="tel" id="sdt" className="form-control" placeholder="Nhập số điện thoại" style={inputStyle} />
            </div>

            <div className="mb-4">
                <label htmlFor="diachi" className="form-label text-white text-start d-block">Địa chỉ</label>
                <input type="text" id="diachi" className="form-control" placeholder="Nhập địa chỉ" style={inputStyle} />
            </div>

            <div className="d-grid mb-3">
                <button type="submit" className="btn btn-warning text-white">Đăng Ký</button>
            </div>

            <p className="text-center text-white mb-4">Hoặc</p>

            <div className="d-flex justify-content-between mb-3 gap-2">
                <button type="button" className="btn btn-danger w-100">Đăng ký bằng Google</button>
                <button type="button" className="btn btn-primary w-100">Đăng ký bằng Facebook</button>
            </div>

            <p className="text-center text-white">
                Đã có tài khoản? <a href="/login" className="fw-bold text-white text-decoration-underline">Đăng nhập tại đây!</a>
            </p>
        </form>

        </div>
      </div>
    </div>
  );
};

export default Signup;


