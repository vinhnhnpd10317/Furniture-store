export interface CategoryItem {
    id: number;
    ten_danh_muc: string;
    mo_ta: string;
    ngay_tao: string;
}

export const fetchCategories = async (): Promise<CategoryItem[]> => {
    const response = await fetch("http://localhost:3001/categorys");
    if (!response.ok) {
        throw new Error("Lỗi khi tải danh mục");
    }
    return await response.json();
};
