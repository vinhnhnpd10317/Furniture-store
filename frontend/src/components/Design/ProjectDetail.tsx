import React, { type JSX } from "react";
import { useParams } from "react-router-dom";

const projectData: Record<
  string,
  {
    title: string;
    description: string;
    image: string;
    content?: JSX.Element;
  }
> = {
  "can-ho-trieu-do-1": {
    title: "Tham quan căn hộ triệu đô với nội thất sang trọng",
    description:
      "Ấn tượng đầu tiên khi ghé thăm căn hộ rộng rãi này là view triệu đô nhìn ra bờ sông Sài Gòn. Gia chủ ưa thích sự tối giản và mong muốn giữ trọn vẹn được góc nhìn thoáng đãng cùng ánh sáng tự nhiên cho không gian. Đội ngũ thiết kế tập trung vào các chi tiết ốp trần tường tinh tế và các sản phẩm nội thất bọc da mang tới màu sắc trầm ấm và sang trọng.",
    image:
      "https://nhaxinh.com/wp-content/uploads/2024/02/noi-that-phong-khach-sang-trong-1.jpg",
    content: (
      <div className="row mt-5">
        <div className="col-md-6">
          <h3><strong>Phòng khách sang trọng, hiện đại</strong></h3>
          <p>
            Không gian nhiều ánh sáng từ những khung cửa kính lớn, <strong>phòng khách</strong> sẽ tràn đầy năng lượng.
            Nội thất phòng khách với các đường nét đơn giản, tinh tế mang đến vẻ đẹp đẳng cấp và sang trọng.
          </p>
          <p>
            Chiếc sofa góc Metro Next làm nổi bật vẻ đẹp hiện đại và mở rộng không gian.
            <strong> Bàn nước Around</strong> và <strong>bàn bên Atollo</strong> đều là các sản phẩm được ưa chuộng của Calligaris với kiểu dáng thanh lịch,
            đường nét tối giản, là sự kết hợp hài hòa cùng sofa.
          </p>
          <p>
            Vị trí: Nguyễn Xiển, Q.9. Tp.HCM
          </p>
          <p>
            Mặt bằng tổng thể: Căn hộ 3 Phòng Ngủ
          </p>
          <p>
            Phong cách thiết kế: Scandinavian, sự kết hợp giữa những thiết kế tối giản với tone màu paste nhẹ nhàng.
          </p>
        </div>
        <div className="col-md-6">
          <img
            src="https://nhaxinh.com/wp-content/uploads/2024/02/noi-that-phong-khach-sang-trong-2.jpg"
            alt="Phòng khách hiện đại"
            className="img-fluid rounded mb-3"
          />
        </div>
      </div>
    ),
  },
  "can-ho-trieu-do-2": {
    title: "Biệt thự tân cổ điển phong cách châu Âu",
    description:
      "Dự án biệt thự lấy cảm hứng từ phong cách châu Âu, với các chi tiết phào chỉ và màu sắc quý tộc. Không gian nội thất sử dụng ánh sáng vàng ấm, kết hợp cùng chất liệu gỗ tự nhiên tạo cảm giác sang trọng và ấm cúng.",
    image:
      "https://nhaxinh.com/wp-content/uploads/2023/06/thiet-ke-can-ho-the-collection-1.jpg",
    content: (
      <div className="row mt-5">
<div className="col-md-6">
          <h3><strong>Căn hộ The Collection</strong></h3>
          <p>
            Dự án thiết kế nội thất The Collection dưới đây sẽ giúp ích cho bạn.
          </p>
          <p>
            – Phong cách thiết kế: Trải dài xuyên suốt cùng tông gỗ và màu be là điểm nhấn của các sản phẩm nội thất màu xanh navy, nhằm mang đến tổ ấm sang trọng và hiện đại. Ánh sáng trong căn hộ được bố trí hài hòa, ưu tiên sử dụng ánh đèn vàng tán sắc vừa đủ để mỗi không gian tựa như một tác phẩm nghệ thuật.
          </p>
          <p>
            Vị trí: Đỗ Đức Dục, Mễ Trì, Nam Từ Liêm, Hà NộiVị trí: Đỗ Đức Dục, Mễ Trì, Nam Từ Liêm, Hà Nội
          </p>
          <p>
            Mặt bằng tổng thể: Căn hộ 2 Phòng Ngủ, DT: 122 m2
          </p>
          <p>
            Phong cách thiết kế:
          </p>
        </div>
        <div className="col-md-6">
          <img
            src="https://nhaxinh.com/wp-content/uploads/2023/06/thiet-ke-can-ho-the-collection-2.jpg"
            alt="Phòng khách biệt thự"
            className="img-fluid rounded mb-3"
          />
        </div>
      </div>
    ),
  },
  "can-ho-the-cove": {
    title: "Nhà phố phong cách tối giản hiện đại",
    description:
      "Dự án nhà phố tối giản mang lại cảm giác thoáng đãng và thư thái. Tường sơn trắng, sàn gỗ sáng màu và đồ nội thất gọn gàng giúp tối ưu hóa không gian và ánh sáng tự nhiên.",
    image:
      "https://nhaxinh.com/wp-content/uploads/2023/05/Thiet-ke-can-ho-The-Cove-Empire-4PN-2.jpg",
    content: (
      <div className="row mt-5">
        <div className="col-md-6">
          <h3><strong>Căn hộ The Cove Empire 4PN</strong></h3>
          <p>
            Những gợi ý thiết kế nội thất Dự án The Cove Empire dưới đây sẽ giúp ích cho bạn.
          </p>
          <p>
            – Phong cách thiết kế: Màu sắc tổng thể của căn hộ là sự kết hợp giữa tông màu kem và nâu cùng ánh sáng vàng, nhằm mang đến không gian ấm cúng và tao nhã. Mỗi khu vực đều được bài trí các món đồ nội thất màu xám hoặc cam đất để vừa tạo điểm nhấn, vừa giúp không gian thêm sang trọng và hiện đại. 
          </p>
          <p>
            Vị trí: Đỗ Đức Dục, Mễ Trì, Nam Từ Liêm, Hà Nội.
          </p>
          <p>
            Mặt bằng tổng thể: Căn hộ 3 Phòng Ngủ, DT: 93m2
          </p>
           <p>
           Phong cách thiết kế: Scandinavian, sự kết hợp giữa những thiết kế tối giản với tone màu paste nhẹ nhàng.
          </p>
        </div>
        <div className="col-md-6">
          <img
            src="https://nhaxinh.com/wp-content/uploads/2023/05/Thiet-ke-can-ho-The-Cove-Empire-4PN.jpg"
            alt="Phòng khách tối giản"
className="img-fluid rounded mb-3"
          />
          <img
            src="https://nhaxinh.com/wp-content/uploads/2023/05/Thiet-ke-can-ho-The-Cove-Empire-4PN-1.jpg"
            alt="Không gian bếp tối giản"
            className="img-fluid rounded"
          />
        </div>
      </div>
    ),
  },
  "the-collection": {
    title: "Căn hộ 1 phòng ngủ dành cho người trẻ năng động",
    description:
      "Căn hộ tuy nhỏ nhưng được thiết kế khéo léo, thông minh và hiện đại. Màu sắc tươi sáng, bố cục mở và nội thất đa năng giúp không gian luôn thoải mái và tiện nghi.",
    image:
      "https://nhaxinh.com/wp-content/uploads/2023/05/Thiet-ke-biet-thu-Nine-South-5.jpg",
    content: (
      <div className="row mt-5">
        <div className="col-md-6">
          <h3><strong>Biệt thự Nine South</strong></h3>
          <p>
            Những gợi ý thiết kế nội thất Dự án Nine South dưới đây sẽ giúp ích cho bạn.
          </p>
          <p>
            – Phong cách thiết kế: Với sự kết hợp của phong cách cổ điển pha lẫn nét hiện đại, không gian căn hộ mang sắc thái lãng mạn cùng điểm nhấn là tông màu xanh navy trang nhã.
          </p>
        </div>
        <div className="col-md-6">
          <img
            src="https://nhaxinh.com/wp-content/uploads/2023/05/Thiet-ke-biet-thu-Nine-South-1-1.jpg"
            alt="Phòng ngủ căn hộ 1PN"
            className="img-fluid rounded mb-3"
          />
          <img
            src="https://nhaxinh.com/wp-content/uploads/2023/05/Thiet-ke-biet-thu-Nine-South-2-1.jpg"
            alt="Khu bếp căn hộ 1PN"
            className="img-fluid rounded"
          />
        </div>
      </div>
    ),
  },
};

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectData[id || ""];

  if (!project) return <p className="text-center text-danger">Dự án không tồn tại!</p>;

  return (
    <div className="container py-5">
      <h1 className="mb-4">{project.title}</h1>
      <p className="lead">{project.description}</p>
      <img
        src={project.image}
        alt={project.title}
        className="img-fluid rounded shadow"
        style={{ maxHeight: "600px", objectFit: "cover", width: "100%" }}
      />
      {project.content}
    </div>
  );
};

export default ProjectDetail;