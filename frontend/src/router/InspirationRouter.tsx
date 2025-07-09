import { useParams } from "react-router-dom";
import InspirationDetail1 from "../components/Inspiration/InspirationDetail1";
import InspirationDetail2 from "../components/Inspiration/InspirationDetail2";
import InspirationDetail3 from "../components/Inspiration/InspirationDetail3";
import InspirationDetail4 from "../components/Inspiration/InspirationDetail4";
import InspirationDetail5 from "../components/Inspiration/InspirationDetail5";
import InspirationDetail6 from "../components/Inspiration/InspirationDetail6";
// import thêm các trang khác nếu có

export default function InspirationRouter() {
  const { id } = useParams<{ id: string }>();
  const articleId = Number(id);

  switch (articleId) {
    case 27:
      return <InspirationDetail1 />;
    case 28:
      return <InspirationDetail2 />;
    case 29:
      return <InspirationDetail3 />;
    case 30:
      return <InspirationDetail4 />;
    case 31:
      return <InspirationDetail5 />;
    case 32:
      return <InspirationDetail6 />;
    // case 23: return <InspirationDetail3 />;
    // ...
    default:
      return <div className="container py-5">Không tìm thấy trang chi tiết phù hợp</div>;
  }
}
