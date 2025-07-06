import { useEffect, useState } from "react";
import { fetchProducts, type ProductItem } from "../../../api/ProductApi";
import { fetchCategories, type CategoryItem } from "../../../api/CategoryApi";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Colors = ["#0088fe", "#00c49f", "#ffbb28", "#ff8042", "#cc65fe", "#ff6384", "#00bcd4"];

export default function ProductCategoryChart() {
    const [dataChart, setDataChart] = useState<{ category: string, count: number }[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const [products, categories] = await Promise.all([fetchProducts(), fetchCategories(),]);

            // map id theo danh mục 
            const categoryMap: Record<number, string> = {};
            categories.forEach((cat) => { 
                categoryMap[cat.id] = cat.ten_danh_muc 
            });

            // đếm số sản phẩm theo danh mục
            const counts: Record<string, number> = {};
            products.forEach((pro) =>{
                const categoryName = categoryMap[+pro.danh_muc_id] || "Không xác định";
                counts[categoryName] = (counts[categoryName] || 0) + 1;
            });

            // chuyển về dạng mảng cho biểu đồ
            const formattedData = Object.entries(counts).map(([category, count])=>({
                category,
                count,
            }));
            setDataChart(formattedData);
        };
        fetchData();
    }, []);

    return(
        <div className="card shadow border-0 mb-4">
            <div className="card-header bg-light + border text-dark fw-bold">
                🧾 Biểu đồ sản phẩm theo danh mục
            </div>
            <div className="card-body">
                {dataChart.length === 0 ? (
                    <p className="text-muted">Không có dữ liệu để hiển thị.</p>
                ):(
                    <div style={{width: "100%", height: 400}}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={dataChart} dataKey="count" nameKey="category" cx="50%" cy="50%" outerRadius={130} label>
                                    {dataChart.map((_, index) =>(
                                        <Cell key={`cell-${index}`} fill={Colors[index % Colors.length]}/>
                                    ))}
                                </Pie>
                                <Tooltip/>
                                <Legend/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    )
}