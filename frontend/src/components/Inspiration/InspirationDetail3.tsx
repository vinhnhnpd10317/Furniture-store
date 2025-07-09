import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleById, type Article } from "../../api/ArticleApi";

const InspirationDetail3 = () => {
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

        {/* nội dung tĩnh */}
        <div className="row g-4">
          <div className="col-md-9 my-5">
            <img src="../public/img/imginspiration/vinh1.jpg" alt="" className="card-img-top" style={{ width: "100%", height: "500px", borderRadius: "10px" }} />
          </div>

          <div className="col-md-3 ">
            <h5 className="mt-3">Không gian cá tính, định hình chất riêng!</h5>
            <p className="lead">Không gian sống không chỉ là nơi để nghỉ ngơi mà còn là nơi thể hiện cá tính và phong cách riêng của mỗi người. Từng món đồ nội thất, màu sắc, chất liệu hay cách bày trí đều góp phần tạo nên dấu ấn cá nhân rõ nét.

              Một chiếc ghế phá cách, bức tranh độc đáo hay ánh sáng được thiết kế tinh tế đều có thể kể câu chuyện của chính bạn. Sự kết hợp hài hòa giữa công năng và gu thẩm mỹ giúp bạn tạo nên không gian không trộn lẫn – nơi bạn được là chính mình mỗi ngày.

              Hãy để ngôi nhà nói lên chất riêng của bạn!</p>
          </div>

          <div className="col-md-3">
            <h5 className="mt-3">Đỏ vang – Sắc màu của đẳng cấp và cảm xúc</h5>
            <p className="lead">Gam màu đỏ vang mang đến cảm giác ấm áp, quyến rũ và đầy chiều sâu. Trong thiết kế nội thất, sắc đỏ này không chỉ làm nổi bật không gian mà còn thể hiện sự tinh tế, mạnh mẽ và cá tính riêng biệt.

              Dù là điểm nhấn trên sofa, tường hay phụ kiện trang trí, đỏ vang luôn tạo nên hiệu ứng thị giác cuốn hút và sang trọng. Lựa chọn màu sắc này là cách để bạn khẳng định gu thẩm mỹ và phong cách sống đầy cảm xúc.</p>
          </div>
          <div className="col-md-9 my-5">
            <img src="../public/img/imginspiration/vinh2.jpg" alt="" className="card-img-top" style={{ width: "100%", height: "500px", borderRadius: "10px" }} />
          </div>

          <div className="col-md-6 my-5">
            <img src="../public/img/imginspiration/vinh3.jpg" alt="" className="card-img-top" style={{ width: "100%", height: "600px", borderRadius: "5px" }} />
            <h5 className="mt-3">Giấc nồng ấm áp, tạm gác âu lo</h5>
            <p className="lead">Sau một ngày dài bộn bề, không gì tuyệt vời hơn khi được thả mình vào không gian êm dịu, nơi chăn ấm, đệm êm và ánh sáng dịu nhẹ cùng nhau tạo nên sự bình yên tuyệt đối.

              Thiết kế phòng ngủ với tone màu trầm ấm, chất liệu mềm mại và bố cục gọn gàng chính là “liều thuốc” xoa dịu tinh thần. Ở đó, mọi âu lo dường như tan biến, chỉ còn lại cảm giác thư thái và giấc ngủ trọn vẹn.

              Hãy để không gian ngủ là nơi chữa lành — nơi bạn được là chính mình, an yên và nhẹ nhõm mỗi đêm.

            </p>
          </div>

          <div className="col-md-6 my-5">
            <img src="../public/img/imginspiration/vinh4.jpeg" alt="" className="card-img-top" style={{ width: "100%", height: "600px", borderRadius: "5px" }} />
            <h5 className="mt-3">Yêu thương là biết chăm cho đến giấc ngủ của chính mình của như cho gia đình.</h5>
            <p className="lead">Yêu thương không chỉ là những lời nói ngọt ngào, mà còn thể hiện qua cách bạn chăm chút từng điều nhỏ nhặt – kể cả giấc ngủ. Một chiếc nệm êm, bộ chăn ga ấm áp, hay không gian phòng ngủ yên tĩnh… chính là món quà tinh tế bạn dành cho bản thân và người thân yêu.

              Bởi khi cả nhà có một giấc ngủ ngon, là khi tình yêu được bồi đắp, sức khỏe được hồi phục, và mỗi sớm mai bắt đầu trong sự nhẹ nhõm, đầy năng lượng.

              Hãy bắt đầu yêu thương từ những điều giản dị nhất – từ chính chiếc giường êm và giấc ngủ sâu.</p>
          </div>


        </div>
      </div>
    </div>
  );
};

export default InspirationDetail3;
