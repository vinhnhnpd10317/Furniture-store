import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleById, type Article } from "../../api/ArticleApi";

const InspirationDetail6 = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const data = await getArticleById(Number(id));
          setArticle(data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy bài viết:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!article) return <div className="container py-5">Loading...</div>;

  return (
    <div className="container-fluid px-0">
      <img
        src={`/img/imgproduct/${article.hinh_anh}`}
        alt={article.tieu_de}
        className="img-fluid w-100 mb-4"
        style={{ maxHeight: "500px", objectFit: "cover" }}
      />

      <div className="container py-4">
        <Link to="/inspiration" className="btn btn-outline-secondary mb-4">
          ← Quay lại
        </Link>

        <h1 className="text-uppercase text-success mb-3">{article.tieu_de}</h1>
        <p className="text-muted mb-4">
          Ngày đăng: {new Date(article.ngay_dang).toLocaleDateString()}
        </p>
        <div className="lead" style={{ whiteSpace: "pre-line" }}>
          {article.noi_dung}
        </div>
        
      </div>
       <div className="container maxine-container py-5">
      {/* Tiêu đề */}
      <h4 className="text-center fw-bold text-uppercase mb-5 title">
        Thả Mình Vào Không Gian Êm Ái Với Phòng Ngủ Maxine
      </h4>

      {/* Hàng 1: Văn bản trái + 2 ảnh phải */}
      <div className="row gx-4 gy-4 mb-4">
        <div className="col-md-6">
          <p>
            Với đường nét mềm mại cùng các chi tiết được hoàn thiện kỹ lưỡng, <strong>giường ngủ Maxine</strong> sẽ nhẹ nhàng nâng niu giấc ngủ của bạn.
            <strong> Giường Maxine</strong> được thiết kế bởi nhà thiết kế người Pháp Dominique Moal, với cảm hứng kết hợp giao thoa giữa các chất liệu cao cấp như da, gỗ,
            kim loại nổi bật lên nét hiện đại và thanh lịch. Với thiết kế độc đáo cùng tông màu gỗ nâu trầm, bạn sẽ cảm nhận được sự ấm áp và gần gũi khi chạm vào.
          </p>
        </div>
        <div className="col-md-3">
          <img
            src="https://nhaxinh.com/wp-content/uploads/2023/06/tha-minh-vao-khong-gian-em-ai-voi-phong-ngu-maxine-4-768x512.jpg"
            alt="Chair"
            className="img-fluid rounded maxine-img"
          />
        </div>
        <div className="col-md-3">
          <img
            src="https://nhaxinh.com/wp-content/uploads/2023/06/tha-minh-vao-khong-gian-em-ai-voi-phong-ngu-maxine-730x800.jpg"
            alt="Bedroom"
            className="img-fluid rounded maxine-img"
          />
        </div>
      </div>

      {/* Hàng 2: ảnh trái - mô tả giữa - ảnh phải */}
      <div className="row gx-4 gy-4 align-items-start">
        <div className="col-md-3">
          <img
            src="https://nhaxinh.com/wp-content/uploads/2023/06/tha-minh-vao-khong-gian-em-ai-voi-phong-ngu-maxine-1-534x800.jpg"
            alt="Bedside"
            className="img-fluid rounded maxine-img"
          />
        </div>
        <div className="col-md-6">
          <p>
            Trước khi đi ngủ, hãy nhẹ nhàng ngồi xuống chiếc <strong>ghế High boosy</strong> để viết vài dòng nhật ký biệt cho cho ngày hôm nay.
            Chiếc <strong>ghế làm việc</strong> này có thiết kế đặc biệt, giúp nâng đỡ cột sống cho bạn một tư thế ngồi thoải mái mà tự nhiên.
            Tông màu cam đất của ghế thật phù hợp với thiết kế ánh kim của <strong>bàn làm việc</strong> Maxine.
          </p>
          <p>
            Để có một giấc ngủ ngon, ánh đèn phòng ngủ cần có độ sáng vừa phải. Sự kết hợp đèn ánh sáng chiếu sáng giữa <strong>đèn bàn Groove ceramic</strong>
            và <strong>đèn sàn Yuks</strong> là một ý tưởng tuyệt vời. Mỗi khi cần lấy bất kỳ vật dụng nào trên chiếc <strong>bàn đầu giường</strong> Maxine,
            bạn đều có thể bật công tắc đèn bàn và thỏa sức tìm đồ. Khép lại một ngày bận rộn, đây là góc cho bạn thả mình vào không gian êm ái và tận hưởng một giấc ngủ thật ngon.
          </p>
        </div>
        <div className="col-md-3">
          <img
            src="https://nhaxinh.com/wp-content/uploads/2023/06/tha-minh-vao-khong-gian-em-ai-voi-phong-ngu-maxine-2-546x800.jpg"
            alt="Work chair"
            className="img-fluid rounded maxine-img"
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default InspirationDetail6;
