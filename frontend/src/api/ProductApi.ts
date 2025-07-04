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

export async function fetchProducts(
    // chấp nhận number | undefined | object
    categoryOrOptions?: number | { categoryId?: number; search?: string }
): Promise<ProductItem[]> {
    let categoryId: number | undefined;
    let search: string | undefined;

    if (typeof categoryOrOptions === "number" || categoryOrOptions === undefined) {
        categoryId = categoryOrOptions;
    } else {
        ({ categoryId, search } = categoryOrOptions);
    }

    const params = new URLSearchParams();
    if (categoryId !== undefined) params.append("categoryId", String(categoryId));
    if (search) params.append("search", search);

    const response = await fetch(
        `http://localhost:3001/products?${params.toString()}`
    );
    if (!response.ok) throw new Error("Không thể tải sản phẩm");
    return response.json();
}


export async function fetchProductById(id: string): Promise<ProductItem> {
    const response = await fetch(`http://localhost:3001/products/${id}`);
    if (!response.ok) {
        throw new Error("Không thể tải sản phẩm");
    }
    return await response.json();
}
