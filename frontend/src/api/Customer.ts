import axios from "axios";

export interface Customer {
  id: number;
  ho_ten: string;
  email: string;
  mat_khau: string;
  so_dien_thoai: string;
  dia_chi: string;
  vai_tro: string;
  ngay_tao: string;
}

export const initialCustomerForm: Omit<Customer, "id" | "ngay_tao"> = {
  ho_ten: "",
  email: "",
  mat_khau: "",
  so_dien_thoai: "",
  dia_chi: "",
  vai_tro: "",
};

const API_URL = "http://localhost:3001/customer";

export const getCustomer = async (search?: string): Promise<Customer[]> => {
  const url = search ? `${API_URL}?search=${encodeURIComponent(search)}` : API_URL;
  return (await axios.get(url)).data;
};

export const getCustomerById = async (id: number): Promise<Customer> =>
  (await axios.get(`${API_URL}/${id}`)).data;

export const createCustomer = async (data: Omit<Customer, "id" | "ngay_tao">) =>
  (await axios.post(API_URL, data)).data;

export const updateCustomer = async (
  id: number,
  data: Partial<Omit<Customer, "id" | "ngay_tao">>
) => (await axios.put(`${API_URL}/${id}`, data)).data;

export const deleteCustomer = async (id: number) =>
  (await axios.delete(`${API_URL}/${id}`)).data;

export const loginUser = async (email: string, mat_khau: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      mat_khau,
    });
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error(err.response?.data?.message || 'Email hoặc mật khẩu không đúng');
  }
};


export const changeCustomerPassword = async (
  id: number,
  currentPassword: string,
  newPassword: string
) => {
  try {
    const res = await axios.post(`${API_URL}/${id}/change-password`, {
      currentPassword,
      newPassword,
    });
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Lỗi đổi mật khẩu");
  }
};

