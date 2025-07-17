import React, { useEffect, useState } from "react";

export default function StoreMap() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGetDirections = () => {
    if (!navigator.geolocation) {
      alert("Trình duyệt của bạn không hỗ trợ định vị.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        // Toạ độ cửa hàng (116 Nguyễn Huy Tưởng, Đà Nẵng)
        const storeLat = 16.0519181;
        const storeLng = 108.1697784;

        const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${storeLat},${storeLng}`;
        window.open(mapsUrl, "_blank");

        setLoading(false);
      },
      (error) => {
        console.error("Lỗi khi lấy vị trí:", error);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("Bạn đã từ chối cấp quyền định vị. Vui lòng bật lại trong trình duyệt.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Không thể lấy vị trí. Hãy thử lại sau.");
            break;
          case error.TIMEOUT:
            alert("Lấy vị trí mất quá nhiều thời gian. Vui lòng thử lại.");
            break;
          default:
            alert("Lỗi không xác định khi lấy vị trí.");
        }

        setLoading(false);
      }
    );
  };

  return (
    <div className="container my-5">
      <div className="row g-4 align-items-start">
        {/* LEFT - Bản đồ */}
        <div className="col-12 col-md-6">
          <h3 className="mb-3 fw-bold">Cửa hàng gần bạn</h3>
          <div className="ratio ratio-4x3 mb-3 shadow-sm border rounded">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.8299964972623!2d108.1671981!3d16.0519232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142191686b4d0a7%3A0x77c8a107ad9ffd37!2zMTE2IE5ndXnhu4VuIEh1eSBUxrDhu59uZywgSG_DoCBBbiwgTGlhbiBDaGnDqnUsIMSQw6AgTuG6tW5nIDU1MDAwMA!5e0!3m2!1svi!2s!4v1721049503135!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <button
            className="btn btn-primary w-100"
            onClick={handleGetDirections}
            disabled={loading}
          >
            {loading ? "🔄 Đang lấy vị trí..." : "📍 Lấy vị trí & Chỉ đường đến cửa hàng"}
          </button>
        </div>

        {/* RIGHT - Thông tin liên hệ */}
        <div className="col-12 col-md-6">
          <h2 className="fw-bold mb-4 text-uppercase">Liên hệ</h2>

          <div className="mb-4">
            <h5 className="fw-bold">🕒 Giờ mở cửa</h5>
            <ul className="list-unstyled">
              <li>Thứ Hai - Thứ Sáu: 8 giờ sáng - 8 giờ tối</li>
              <li>Thứ Bảy: 9 giờ sáng - 8 giờ tối</li>
              <li>Chủ Nhật: 9 giờ sáng - 5 giờ chiều</li>
            </ul>
          </div>

          <div className="mb-4">
            <h5 className="fw-bold">📌 Địa chỉ</h5>
            <p className="mb-1">116 Nguyễn Huy Tưởng</p>
            <p className="mb-1">Cẩm Lệ – Đà Nẵng</p>
            <p className="mb-0">📞 0763 701 215</p>
          </div>

          <h5 className="fw-bold text-uppercase">G7 PRIME</h5>
        </div>
      </div>
    </div>
  );
}
