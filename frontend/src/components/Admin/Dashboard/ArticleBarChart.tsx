import { useEffect, useState } from "react";
import { getArticles, type Article } from "../../../api/ArticleApi";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";
export default function ArticleBarChart() {
    const [chartData, setChartData] = useState<{ month: string, count: number }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const articles: Article[] = await getArticles();

            const monthlyCounts: Record<string, number> = {};

            articles.forEach((article) => {
                const date = new Date(article.ngay_dang);
                const monthKey = date.toLocaleString("vi-VN", {
                    month: "2-digit",
                    year: "numeric",
                });
                monthlyCounts[monthKey] = (monthlyCounts[monthKey] || 0) + 1;
            });

            const formattedData = Object.entries(monthlyCounts)
                .map(([month, count]) => ({ month, count }))
                .sort(
                    (a, b) => new Date(`01/${a.month}`).getTime() - new Date(`01/${b.month}`).getTime()
                );

            setChartData(formattedData);
        };
        fetchData();
    }, []);

    return (
        <div className="card shadow border-0 mb-4">
            <div className="card-header bg-light + border text-dark fw-bold">
                🧾 Thống kê bài viết theo tháng
            </div>
            <div className="card-body">
                {chartData.length === 0 ? (
                    <p className="text-muted">Không có dữ liệu để hiển thị.</p>
                ) : (
                    <div style={{ width: "100%", height: 350 }}>
                        <ResponsiveContainer>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray={"3 3"} />
                                <XAxis dataKey="month" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#28a745" name="Số bài viết" barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
}