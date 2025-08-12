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

        const storeLat = 16.0519181;
        const storeLng = 108.1697784;

        const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${storeLat},${storeLng}`;
        window.open(mapsUrl, "_blank");
        setLoading(false);
      },
      (error) => {
        console.error("Lỗi khi lấy vị trí:", error);

        const errorMessages: Record<number, string> = {
          1: "Bạn đã từ chối cấp quyền định vị. Vui lòng bật lại trong trình duyệt.",
          2: "Không thể lấy vị trí. Hãy thử lại sau.",
          3: "Lấy vị trí mất quá nhiều thời gian. Vui lòng thử lại.",
        };

        alert(errorMessages[error.code] || "Lỗi không xác định khi lấy vị trí.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="container my-4">
      <div className="row g-3 align-items-start">
        {/* LEFT - Bản đồ */}
        <div className="col-12 col-md-7">
          <h3 className="mb-3 fw-bold">Cửa hàng gần bạn</h3>
          <div className="ratio ratio-16x9 mb-2 shadow-sm border rounded">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d970.9490156222007!2d108.16805619236159!3d16.05189000008543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142196d9a203685%3A0x4e8027fe58d65525!2zQ2FvIMSR4bqzbmcgRlBUIEPGoSBT4bufIDI!5e0!3m2!1svi!2s!4v1754931310171!5m2!1svi!2s"
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
            {loading
              ? "🔄 Đang lấy vị trí..."
              : "📍 Lấy vị trí & Chỉ đường đến cửa hàng"}
          </button>
        </div>

        {/* RIGHT - Thông tin liên hệ */}
        <div className="col-12 col-md-5">
          <h2 className="fw-bold mb-3 text-uppercase">Liên hệ</h2>

          <div className="mb-3">
            <h5 className="fw-bold">🕒 Giờ mở cửa</h5>
            <ul className="list-unstyled mb-0">
              <li>Thứ Hai - Thứ Sáu: 8:00 - 20:00</li>
              <li>Thứ Bảy: 9:00 - 20:00</li>
              <li>Chủ Nhật: 9:00 - 17:00</li>
            </ul>
          </div>

          <div className="mb-3">
            <h5 className="fw-bold">📌 Địa chỉ</h5>
            <p className="mb-1">116 Nguyễn Huy Tưởng</p>
            <p className="mb-1">Hoà An, Liên Chiểu – Đà Nẵng 550000</p>
            <p className="mb-0">📞 0763 701 215</p>
          </div>

          <h5 className="fw-bold text-uppercase mt-4">G7 PRIME</h5>
        </div>
      </div>
    </div>
  );
}
