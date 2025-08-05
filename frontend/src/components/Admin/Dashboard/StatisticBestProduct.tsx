import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Cell
} from "recharts";
import { getBestSellingProducts, type BestSellingProduct } from "../../../api/StatisticProductApi";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"]; // màu sắc nổi bật

const TopSellingProductsChart: React.FC = () => {
  const [type, setType] = useState("day");
  const [data, setData] = useState<BestSellingProduct[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getBestSellingProducts(type);
      setData(result);
    } catch (error) {
      console.error("Lỗi khi lấy top sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [type]);

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">🔥 Top 3 sản phẩm bán chạy nhất</h3>

      <div className="d-flex justify-content-center mb-4">
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
        </select>
      </div>

      {loading ? (
        <p className="text-center">⏳ Đang tải dữ liệu...</p>
      ) : data.length === 0 ? (
        <p className="text-center text-muted">Không có dữ liệu</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 40, left: 80, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="ten_san_pham" type="category" />
            <Tooltip
              formatter={(value) => [`${value}`, "Số lượng bán"]}
              labelFormatter={(label) => `Sản phẩm: ${label}`}
            />
            <Legend />
            <Bar dataKey="tong_ban" name="Số lượng bán" barSize={30}>
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );    
};

export default TopSellingProductsChart;
