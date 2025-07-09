export interface CategoryItem {
    id: number;
    ten_danh_muc: string;
    mo_ta: string;
    ngay_tao: string;
}

export const fetchCategories = async (search?: string): Promise<CategoryItem[]> => {
    const url = new URL("http://localhost:3001/categorys");

    if (search && search.trim()) {
        url.searchParams.append("search", search.trim());
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
        throw new Error("Lỗi khi tải danh mục");
    }

    return await response.json();
};
