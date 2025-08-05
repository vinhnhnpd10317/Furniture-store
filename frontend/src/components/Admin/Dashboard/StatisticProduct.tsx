import React, { useEffect, useState } from "react";
import {
  ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend
} from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  getStatisticByType,
  getStatisticByRange,
  type StatisticProduct
} from "../../../api/StatisticProductApi";

const StatisticProductChart: React.FC = () => {
  const [type, setType] = useState("day");
  const [data, setData] = useState<StatisticProduct[]>([]);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      let result: StatisticProduct[] = [];
      if (type === "range" && fromDate && toDate) {
        const from = fromDate.toISOString().split("T")[0];
        const to = toDate.toISOString().split("T")[0];
        result = await getStatisticByRange(from, to);
      } else {
        result = await getStatisticByType(type);
      }
      setData(result);
    } catch (err) {
      console.error("Lỗi lấy dữ liệu:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (type !== "range") fetchData();
  }, [type]);

  const handleRangeFilter = () => {
    if (fromDate && toDate) fetchData();
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">📊 Thống kê số lượng sản phẩm bán ra</h3>

      {/* Bộ lọc */}
      <div className="d-flex flex-wrap align-items-center gap-3 mb-4 justify-content-center">
        <select
          className="form-select w-auto"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="day">Theo Ngày</option>
          <option value="week">Theo Tuần</option>
          <option value="month">Theo Tháng</option>
          <option value="quarter">Theo Quý</option>
          <option value="year">Theo Năm</option>
          <option value="range">Lọc theo ngày</option>
        </select>

        {type === "range" && (
          <>
            <DatePicker
              selected={fromDate}
              onChange={(date) => setFromDate(date)}
              className="form-control"
              placeholderText="Từ ngày"
              dateFormat="yyyy-MM-dd"
            />
            <DatePicker
              selected={toDate}
              onChange={(date) => setToDate(date)}
              className="form-control"
              placeholderText="Đến ngày"
              dateFormat="yyyy-MM-dd"
            />
            <button className="btn btn-primary" onClick={handleRangeFilter}>
              Lọc
            </button>
          </>
        )}
      </div>

      {/* Biểu đồ */}
      {loading ? (
        <p className="text-center">⏳ Đang tải dữ liệu...</p>
      ) : (
        <ResponsiveContainer width="100%" height={450}>
  <ComposedChart data={data} margin={{ top: 20, right: 30, bottom: 5, left: 10 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="thoi_gian" />
    <YAxis />
    <Tooltip
      formatter={(value) => [`${value}`, "Số lượng bán"]}
      labelFormatter={(label) => `Thời gian: ${label}`}
    />
    <Legend />

    {/* Cột biểu đồ (Bar) */}
    <Bar
      dataKey="tong_so_luong_ban"
      fill="#00C1CA"
      name="Số lượng bán (cột)"
      barSize={30}
    />

    {/* Đường biểu đồ (Line) */}
    <Line
      type="monotone"
      dataKey="tong_so_luong_ban"
      stroke="#048B9E"
      strokeWidth={3}
      name="Số lượng bán (đường)"
      activeDot={{ r: 6 }}
    />
  </ComposedChart>
</ResponsiveContainer>
      )}
    </div>
  );
};

export default StatisticProductChart;
