import { useEffect, useState } from "react";
import { getCustomer, type Customer } from "../../../api/Customer";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CustomerLineChart() {
  const [chartData, setChartData] = useState<{ month: string; count: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const customers: Customer[] = await getCustomer();

      const monthlyCounts: Record<string, number> = {};

      customers.forEach((customer) => {
        const date = new Date(customer.ngay_tao);
        const monthKey = date.toLocaleString("vi-VN", {
          month: "2-digit",
          year: "numeric",
        });
        monthlyCounts[monthKey] = (monthlyCounts[monthKey] || 0) + 1;
      });

      const formattedData = Object.entries(monthlyCounts)
        .map(([month, count]) => ({ month, count }))
        .sort(
          (a, b) =>
            new Date(`01/${a.month}`).getTime() - new Date(`01/${b.month}`).getTime()
        );

      setChartData(formattedData);
    };

    fetchData();
  }, []);

  return (
    <div className="card shadow border-0 mb-4">
      <div className="card-header bg-light + border text-dark fw-bold">
        📈 Biểu đồ khách hàng theo tháng
      </div>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#007bff" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
