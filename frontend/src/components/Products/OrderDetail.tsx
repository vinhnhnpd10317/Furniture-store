import { useEffect, useState } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import axios from "axios";

const formatCurrency = (value: number) =>
  value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("vi-VN");
};

const trangThaiMap: Record<string, string> = {
  cho_xu_ly: "Chờ xử lý",
  dang_xu_ly: "Đang xử lý",
  dang_van_chuyen: "Đang vận chuyển",
  da_giao: "Đã giao",
  da_huy: "Đã huỷ",
};

const trangThaiThanhToan: Record<string, string> = {
  tien_mat: "Thanh toán khi nhận hàng",
  chuyen_khoan: "Trả trước",
};


const OrderDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/orderdetails/${id}`)
        .then((res) => setOrder(res.data))
        .catch((err) => console.error("Lỗi lấy chi tiết:", err));
    }
  }, [id]);

  const handleCancelOrder = async () => {
    const confirmCancel = window.confirm("Bạn có chắc muốn huỷ đơn hàng này?");
    if (!confirmCancel) return;

    try {
      await axios.put(`http://localhost:3001/orderdetails/orders/${id}/cancel`);
      alert("Đơn hàng đã được huỷ!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setOrder((prev: any) => ({ ...prev, trang_thai: "da_huy" }));
      navigate("/userorder");
    } catch (err) {
      console.error("Lỗi huỷ đơn:", err);
      alert("Không thể huỷ đơn hàng. Vui lòng thử lại sau.");
    }
  };

  if (!order)
    return <div className="text-center mt-5">Đang tải dữ liệu đơn hàng...</div>;

  return (
    <div className="container py-5">
      <div className="card shadow p-4">
        <h3 className="mb-4">Chi tiết đơn hàng #{order.id}</h3>

        <div className="row mb-3">
          <div className="col-md-6"><strong>Ngày đặt:</strong> {formatDate(order.ngay_dat)}</div>
          <div className="col-md-6"><strong>Trạng thái:</strong> {trangThaiMap[order.trang_thai] || order.trang_thai}</div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6"><strong>Tên khách:</strong> {order.ho_ten}</div>
          <div className="col-md-6"><strong>Email:</strong> {order.email}</div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6"><strong>Số điện thoại:</strong> {order.so_dien_thoai}</div>
          <div className="col-md-6"><strong>Địa chỉ:</strong> {order.dia_chi}</div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <strong>Ghi chú:</strong> {order.ghi_chu || "(Không có ghi chú)"}
          </div>
          <div className="col-md-6"><strong>Tổng tiền:</strong> <span className="text-danger">{formatCurrency(order.tong_tien)}</span></div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6"><strong>Phương thức thanh toán:</strong> {trangThaiThanhToan[order.phuong_thuc_thanh_toan] || order.phuong_thuc_thanh_toan}</div>
        </div>

        <h5 className="mb-3 text-success">Danh sách sản phẩm:</h5>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Hình</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {order.chi_tiet.map((item: any) => (
                <tr key={item.id}>
                  <td style={{ width: 120 }}>
                    <img
                      src={`/img/imgproduct/${item.hinh_anh}`}
                      alt={item.ten_san_pham}
                      className="img-fluid rounded shadow-sm"
                      style={{ maxHeight: "80px", objectFit: "contain" }}
                    />
                  </td>
                  <td>{item.ten_san_pham}</td>
                  <td>{item.so_luong}</td>
                  <td>{formatCurrency(item.don_gia)}</td>
                  <td>{formatCurrency(item.so_luong * item.don_gia)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {order.trang_thai === 'cho_xu_ly' && (
          <div className="text-end mt-3">
            <button className="btn btn-dark" onClick={handleCancelOrder}>
              Huỷ đơn hàng
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
