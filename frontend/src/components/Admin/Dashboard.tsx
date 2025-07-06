import ArticleBarChart from "./Dashboard/ArticleBarChart";
import CustomerLineChart from "./Dashboard/CustomerLineChart";
import ProductCategoryChart from "./Dashboard/ProductCategoryChart";

export default function Dashboard() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard tổng quan</h2>
      {/* Biểu đồ đường: khách hàng theo tháng */}
      <div className="mt-8">
        <CustomerLineChart />
      </div>

      {/* Biểu đồ tròn: hiển thị danh mục và sản phẩm */}
      <div className="mt-8">
        <ProductCategoryChart />
      </div>

      {/* Biểu đồ cột: hiển thị bài viết theo tháng */}
      <div className="mt-8">
        <ArticleBarChart/>
      </div>

    </div>
  );

}