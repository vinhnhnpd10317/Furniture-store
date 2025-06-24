import axios from 'axios';

// Lưu sản phẩm vào giỏ hàng (DB)
export const saveCartItemToDB = async (nguoi_dung_id: number, san_pham_id: number, so_luong: number) => {
  const res = await axios.post('http://localhost:3001/cart', {
    nguoi_dung_id,
    san_pham_id,
    so_luong,
  });
  return res.data;
};

// Lấy giỏ hàng từ DB theo userId
export const fetchCartFromDB = async (nguoi_dung_id: number) => {
  const res = await axios.get(`http://localhost:3001/cart/${nguoi_dung_id}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return res.data.map((item: any) => ({
    cartItemId: item.gio_hang_id, // 👈 phải có dòng này
    id: item.san_pham_id,
    name: item.ten_san_pham,
    price: item.gia,
    quantity: item.so_luong,
    image: item.hinh_anh_dai_dien 
    ? `/img/imgproduct/${item.hinh_anh_dai_dien}` 
    : '/default.jpg',
    material: item.vat_lieu || '',
    texture: item.chat_lieu || '',
  }));
};



export const updateCartItemInDB = async (id: number, so_luong: number) => {
  return await axios.put(`http://localhost:3001/cart/${id}`, { so_luong });
};

export const deleteCartItemFromDB = async (id: number) => {
  return await axios.delete(`http://localhost:3001/cart/${id}`);
};
