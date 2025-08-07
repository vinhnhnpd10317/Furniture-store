import { useEffect, useState } from 'react';
import { getCustomer, deleteCustomer, type Customer } from '../../api/Customer';
import { Link, useLocation } from 'react-router-dom';

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const query = useQuery();
  const searchText = query.get("search")?.toLowerCase() || "";

  useEffect(() => {
    getCustomer(searchText || undefined).then(data => {
      const sorted = [...data].sort((a, b) => b.id - a.id);
      setCustomers(sorted);
    });
  }, [searchText]);

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
    <div className="container py-4">
      <style>
        {`
          .table th, .table td {
            white-space: nowrap;
          }

          @media (max-width: 576px) {
            .table th, .table td {
              font-size: 14px;
            }

            .btn {
              font-size: 14px;
              padding: 4px 8px;
            }

            .pagination {
              flex-wrap: wrap;
              justify-content: center;
            }
          }
        `}
      </style>

      <h2 className="mb-4 text-center">Quản lý khách hàng</h2>

      <div className="d-flex justify-content-end mb-3">
        <Link to="/admin/customer/add" className="btn btn-success">
          + Thêm khách hàng
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Họ tên</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Địa chỉ</th>
              <th className="text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map(c => (
              <tr key={c.id}>
                <td>{c.ho_ten}</td>
                <td>{c.email}</td>
                <td>{c.so_dien_thoai}</td>
                <td>{c.dia_chi}</td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(c.id)}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center">
                  Không có khách hàng nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <nav className="d-flex justify-content-center mt-4">
        <ul className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
