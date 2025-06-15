import { useEffect, useState } from "react";

export default function Dashboard(){
    interface DashboardData {
  tongDonHang: number;
  tongDoanhThu: number;
  tongKhachHang: number;
  tongSanPham: number;
}
const [data, setData] = useState<DashboardData>({
    tongDonHang: 0,
    tongDoanhThu: 0,
    tongKhachHang: 0,
    tongSanPham: 0,
  });

  const [donHangGanNhat, setDonHangGanNhat] = useState<any[]>([]);
  const [topSanPham, setTopSanPham] = useState<any[]>([]);

  useEffect(() => {
    // Giả lập lấy dữ liệu từ API (thay bằng fetch/axios khi có API)
    setData({
      tongDonHang: 150,
      tongDoanhThu: 50000000,
      tongKhachHang: 80,
      tongSanPham: 40,
    });

    setDonHangGanNhat([
      { id: 1, tenKhach: "Nguyễn Văn A", tongTien: 1200000, ngayDat: "2025-06-14" },
      { id: 2, tenKhach: "Trần Thị B", tongTien: 850000, ngayDat: "2025-06-13" },
    ]);

    setTopSanPham([
      { id: 1, ten: "Túi xách da", soLuong: 30 },
      { id: 2, ten: "Đồng hồ nam", soLuong: 25 },
    ]);
  }, []);
    return(
        <div className="container-fluid p-3">
      <h4>📊 Dashboard tổng quan</h4>

      <div className="row mt-3">
        <div className="col-md-3 mb-3">
          <div className="card text-bg-primary shadow">
            <div className="card-body">
              <h5 className="card-title">Đơn hàng</h5>
              <p className="card-text fs-4">{data.tongDonHang}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-bg-success shadow">
            <div className="card-body">
              <h5 className="card-title">Doanh thu</h5>
              <p className="card-text fs-4">{data.tongDoanhThu.toLocaleString()} VNĐ</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-bg-warning shadow">
            <div className="card-body">
              <h5 className="card-title">Khách hàng</h5>
              <p className="card-text fs-4">{data.tongKhachHang}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-bg-info shadow">
            <div className="card-body">
              <h5 className="card-title">Sản phẩm</h5>
              <p className="card-text fs-4">{data.tongSanPham}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header">🛒 Đơn hàng gần nhất</div>
            <ul className="list-group list-group-flush">
              {donHangGanNhat.map((don) => (
                <li key={don.id} className="list-group-item">
                  {don.tenKhach} - {don.tongTien.toLocaleString()} VNĐ - {don.ngayDat}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header">🔥 Sản phẩm bán chạy</div>
            <ul className="list-group list-group-flush">
              {topSanPham.map((sp) => (
                <li key={sp.id} className="list-group-item">
                  {sp.ten} - {sp.soLuong} sản phẩm
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
    )
}