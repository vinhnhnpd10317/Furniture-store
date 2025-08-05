import ArticleBarChart from "./Dashboard/ArticleBarChart";
import CustomerLineChart from "./Dashboard/CustomerLineChart";
import ProductCategoryChart from "./Dashboard/ProductCategoryChart";
import Statistic from "./Dashboard/Statastis";
import TopSellingProductsChart from "./Dashboard/StatisticBestProduct";
import StatisticChart from "./Dashboard/StatisticProduct";

export default function Dashboard() {
  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">Dashboard tổng quan</h2>

      {/* Cards biểu diễn số liệu */}
      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h4 className="card-title">9.823</h4>
              <p className="card-text">Members online</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-white bg-info">
            <div className="card-body">
              <h4 className="card-title">9.823</h4>
              <p className="card-text">Members online</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-white bg-warning">
            <div className="card-body">
              <h4 className="card-title">9.823</h4>
              <p className="card-text">Members online</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-white bg-danger">
            <div className="card-body">
              <h4 className="card-title">9.823</h4>
              <p className="card-text">Members online</p>
            </div>
          </div>
        </div>
      </div>

      {/* Biểu đồ bán hàng */}
      <div className="mt-5">
        <Statistic />
      </div>

      {/* Biểu đồ sản phẩm bán ra theo ngày ... */}
      <div className="mt-5">
        <StatisticChart/>
      </div>

      {/* Biểu đồ 3 sản phẩm bán chạy nhất */}
      <div className="mt-5">
        <TopSellingProductsChart/>
      </div>

      {/* Biểu đồ đường: khách hàng theo tháng */}
      <div className="mt-5">
        <CustomerLineChart />
      </div>

      {/* Biểu đồ tròn: danh mục sản phẩm */}
      <div className="mt-5">
        <ProductCategoryChart />
      </div>

      {/* Biểu đồ cột: bài viết theo tháng */}
      <div className="mt-5">
        <ArticleBarChart />
      </div>
    </div>
  );
}
