import type { ProductItem } from "../../../api/ProductApi";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

type Props = {
    product: ProductItem;
    onDeleteSuccess: () => void;
    onView: (product: ProductItem) => void;
};

export default function ProductActions({ product, onDeleteSuccess, onView }: Props) {
    const handleDelete = async () => {
        if (!window.confirm("Xác nhận xoá sản phẩm này?")) return;
        try {
        const res = await fetch(`http://localhost:3001/products/${product.id}`, {
            method: "DELETE",
        });
        if (!res.ok) throw new Error("Lỗi khi xoá sản phẩm");
        onDeleteSuccess();
        } catch (error) {
        console.error(error);
        alert("Lỗi xoá sản phẩm");
        }
    };

    return (
        <>
        <td className="text-center">
            <div className="d-flex justify-content-center gap-2">
                <button
                    className="btn btn-sm btn-outline-info d-flex align-items-center gap-1"
                    onClick={() => onView(product)}
                >
                    <FaEye /> Xem
                </button>
                <Link
                    to={`edit/${product.id}`}
                    className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
                >
                    <FaEdit /> Sửa
                </Link>
                <button
                    className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                    onClick={handleDelete}
                >
                    <FaTrash /> Xoá
                </button>
            </div>
        </td>
        </>
    );
}
