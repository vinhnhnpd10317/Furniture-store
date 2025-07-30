export type TrangThaiKho = 'con_hang' | 'het_hang';

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
    trang_thai_kho: TrangThaiKho;
}

export async function fetchProducts(
    categoryOrOptions?: number | {
        categoryId?: number;
        search?: string;
        minPrice?: number;
        maxPrice?: number;
    }
): Promise<ProductItem[]> {
    let categoryId: number | undefined;
    let search: string | undefined;
    let minPrice: number | undefined;
    let maxPrice: number | undefined;

    if (typeof categoryOrOptions === "number" || categoryOrOptions === undefined) {
        categoryId = categoryOrOptions;
    } else {
        ({ categoryId, search, minPrice, maxPrice } = categoryOrOptions);
    }

    const params = new URLSearchParams();
    if (categoryId !== undefined) params.append("categoryId", String(categoryId));
    if (search) params.append("search", search);
    if (minPrice !== undefined) params.append("minPrice", String(minPrice));
    if (maxPrice !== undefined) params.append("maxPrice", String(maxPrice));

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

// gọi 3 sản phẩm mới nhất
export async function fetchLatestProducts(): Promise<ProductItem[]> {
    const response = await fetch(`http://localhost:3001/products/latest`);
    if (!response.ok) throw new Error("Không thể tải sản phẩm mới nhất");
    return response.json();
}

// Gọi 4 sản phẩm liên quan cùng danh mục, trừ sản phẩm hiện tại
export const fetchRelatedProducts = async (id: number, categoryId: number): Promise<ProductItem[]> => {
    const url = new URL(`http://localhost:3001/products/related/${id}`);
    url.searchParams.append("categoryId", categoryId.toString());

    const response = await fetch(url.toString());
    if (!response.ok) {
        throw new Error("Không thể tải sản phẩm liên quan");
    }

    return await response.json();
};



