// src/components/Statistic.tsx
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  getStatisticByType,
  getStatisticByRange,
  type StatisticData,
} from "../../../api/StatasticApi";
import { FaChartLine, FaFilter, FaCalendarAlt } from "react-icons/fa";

const Statistic = () => {
  const [data, setData] = useState<StatisticData[]>([]);
  const [type, setType] = useState<string>("month");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, [type]);

  const fetchData = async () => {
    try {
      if (type === "custom" && from && to) {
        const result = await getStatisticByRange(from, to);
        setData(result);
      } else {
        const result = await getStatisticByType(type);
        setData(result);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu thống kê:", error);
    }
  };

  const formatCurrency = (value: number) =>
    value.toLocaleString("vi-VN") + " ₫";

  return (
    <div className="container mt-5">
      {/* Tiêu đề */}
      <div className="text-center mb-5">
        <h2 className="fw-bold text-dark">
          <FaChartLine className="me-2 text-primary" />
          BÁO CÁO DOANH THU BÁN HÀNG
        </h2>
        <p className="text-muted">Tổng hợp theo thời gian với biểu đồ trực quan</p>
      </div>

      {/* Bộ lọc */}
      <div className="card border-0 shadow-sm p-4 mb-4">
        <div className="row g-3 align-items-end">
          <div className="col-md-4">
            <label className="form-label fw-semibold text-dark">
              Loại thống kê:
            </label>
            <select
              className="form-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="day">Theo ngày</option>
              <option value="week">Theo tuần</option>
              <option value="month">Theo tháng</option>
              <option value="quarter">Theo quý</option>
              <option value="year">Theo năm</option>
              <option value="custom">Tùy chọn ngày</option>
            </select>
          </div>

          {type === "custom" && (
            <>
              <div className="col-md-3">
                <label className="form-label fw-semibold text-dark">
                  <FaCalendarAlt className="me-2 text-primary" />
                  Từ ngày:
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label fw-semibold text-dark">
                  <FaCalendarAlt className="me-2 text-primary" />
                  Đến ngày:
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-outline-primary w-100"
                  onClick={fetchData}
                  disabled={!from || !to}
                >
                  <FaFilter className="me-1" />
                  Lọc
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Biểu đồ */}
      <div className="card border-0 shadow p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold text-secondary m-0">
            Biểu đồ đường:{" "}
            <span className="text-primary">
              {type === "custom" ? "Tùy chọn ngày" : `Theo ${type}`}
            </span>
          </h5>
        </div>

        {data.length === 0 ? (
          <p className="text-muted text-center">Không có dữ liệu để hiển thị.</p>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
              <Line
                type="monotone"
                dataKey="doanh_thu"
                stroke="#00b894"
                strokeWidth={3}
                dot={{ r: 4, fill: "#00b894" }}
                name="Doanh thu"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default Statistic;
