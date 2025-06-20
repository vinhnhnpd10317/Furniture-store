export interface ProductItem {
    id: number;
    ten_san_pham: string;
    vat_lieu: string;
    chat_lieu: string;
    mo_ta: string;
    gia: number;
    danh_muc_id: string;
    hinh_anh_dai_dien: string;
    ds_hinh_anh?: string;
    ngay_tao: string;
}

// Hàm gọi API lấy danh sách sản phẩm
// export const fetchProducts = async (): Promise<ProductItem[]> => {
//     const response = await fetch("http://localhost:3001/products");
//     if (!response.ok) {
//         throw new Error("Lỗi khi tải sản phẩm từ API");
//     }
//     return await response.json();
// };
export async function fetchProducts(categoryId?: number): Promise<ProductItem[]> {
    const url = categoryId
        ? `http://localhost:3001/products?categoryId=${categoryId}`
        : `http://localhost:3001/products`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Không thể tải sản phẩm");
    }
    return await response.json();
}

export async function fetchProductById(id: string): Promise<ProductItem> {
    const response = await fetch(`http://localhost:3001/products/${id}`);
    if (!response.ok) {
        throw new Error("Không thể tải sản phẩm");
    }
    return await response.json();
}
