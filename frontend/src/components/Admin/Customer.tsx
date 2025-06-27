// src/pages/CustomerList.tsx
import { useEffect, useState } from 'react';
import { getCustomer, deleteCustomer, type Customer } from '../../api/Customer';
import { Link } from 'react-router-dom';

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    getCustomer().then(data => {
      const sorted = [...data].sort((a, b) => b.id - a.id); // Mới nhất lên đầu
      setCustomers(sorted);
    });
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm('Bạn có chắc muốn xoá khách hàng này?')) {
      deleteCustomer(id).then(() => {
        setCustomers(prev => prev.filter(c => c.id !== id));
      });
    }
  };

  const totalPages = Math.ceil(customers.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const currentCustomers = customers.slice(startIndex, startIndex + perPage);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Quản lý khách hàng</h2>
      <div className="text-end mb-3">
        <Link to="/admin/customer/add" className="btn btn-success">+ Thêm khách hàng</Link>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Họ tên</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Địa chỉ</th>
            <th>Vai trò</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.map(c => (
            <tr key={c.id}>
              <td>{c.ho_ten}</td>
              <td>{c.email}</td>
              <td>{c.so_dien_thoai}</td>
              <td>{c.dia_chi}</td>
              <td>{c.vai_tro}</td>
              <td>
                {/* Bạn có thể làm trang sửa riêng nếu cần */}
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(c.id)}>
                  Xoá
                </button>
              </td>
            </tr>
          ))}
          {customers.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center">Không có khách hàng nào</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Phân trang */}
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
