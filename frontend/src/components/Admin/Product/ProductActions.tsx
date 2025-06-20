// import React from "react";
import type { ProductItem } from "../../../api/ProductApi";
import { Link } from "react-router-dom";

type Props = {
    product: ProductItem;
    onDeleteSuccess: () => void;
};

export default function ProductActions({ product, onDeleteSuccess }: Props) {
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
                <Link
                    to={`edit/${product.id}`}
                    className="btn btn-sm btn-outline-primary"
                >
                    Sửa
                </Link>
                <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={handleDelete}
                >
                    Xoá
                </button>
            </div>
        </td>

        </>
    );
}
