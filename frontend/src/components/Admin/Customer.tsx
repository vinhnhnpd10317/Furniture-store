import { useEffect, useState } from 'react';
import { getCustomer, deleteCustomer, type Customer } from '../../api/Customer';
import { Link, useLocation } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";
import React from 'react';

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

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container-fluid py-4">
      <style>
        {`
        @media (max-width: 768px) {
          .hide-on-tablet {
            display: none !important;
          }
        }

        @media (max-width: 576px) {
          .desktop-table {
            display: none !important;
          }
          .mobile-card {
            display: block !important;
          }
        }

        .mobile-card {
          display: none;
        }
      `}
      </style>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Quản lý khách hàng</h3>
        <Link to="/admin/customer/add" className="btn btn-success">
          + Thêm khách hàng
        </Link>
      </div>

      {/* TABLE - Desktop & Tablet */}
      <div className="table-responsive desktop-table">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr className="text-center">
              <th className="py-3">Họ tên</th>
              <th className="hide-on-tablet py-3">Email</th>
              <th className="py-3">SĐT</th>
              <th className="hide-on-tablet py-3">Địa chỉ</th>
              {/* <th className="py-3" style={{ width: 120 }}>Hành động</th> */}
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map(c => (
              <tr key={c.id}>
                <td>{c.ho_ten}</td>
                <td className="hide-on-tablet">{c.email}</td>
                <td>{c.so_dien_thoai}</td>
                <td className="hide-on-tablet">{c.dia_chi}</td>
                {/* <td className="d-flex justify-content-center">
                  <button
                    className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center gap-1"
                    onClick={() => handleDelete(c.id)}
                  >
                    <FaTrash /> Xoá
                  </button>
                </td> */}
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

      {/* CARD - Mobile only */}
      <div className="mobile-card">
        {currentCustomers.map(c => (
          <div key={c.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{c.ho_ten}</h5>
              <p className="card-text mb-1"><strong>SĐT:</strong> {c.so_dien_thoai}</p>
              <p className="card-text mb-1"><strong>Email:</strong> {c.email}</p>
              <p className="card-text mb-2"><strong>Địa chỉ:</strong> {c.dia_chi}</p>
              {/* <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(c.id)}
              >
                Xoá
              </button> */}
            </div>
          </div>
        ))}
        {customers.length === 0 && (
          <p className="text-center">Không có khách hàng nào</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="pagination" className="mt-4">
          <ul className="pagination justify-content-end mb-0">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link py-2 px-3" onClick={() => goToPage(1)}>
                &laquo;
              </button>
            </li>
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link py-2 px-3" onClick={() => goToPage(currentPage - 1)}>
                &lt;
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((n) =>
                totalPages <= 5 ||
                n === 1 ||
                n === totalPages ||
                Math.abs(currentPage - n) <= 1
              )
              .map((n, index, arr) => {
                const prev = arr[index - 1];
                const showDots = prev && n - prev > 1;

                return (
                  <React.Fragment key={n}>
                    {showDots && (
                      <li className="page-item disabled">
                        <span className="page-link">...</span>
                      </li>
                    )}
                    <li className={`page-item ${currentPage === n ? "active" : ""}`}>
                      <button
                        className="page-link py-2 px-3"
                        onClick={() => goToPage(n)}
                        style={currentPage === n ? { backgroundColor: "#ffffffff", color: "#ea580c", borderColor: "#d8d8d8ff" } : {}}
                      >
                        {n}
                      </button>
                    </li>
                  </React.Fragment>
                );
              })}

            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link py-2 px-3" onClick={() => goToPage(currentPage + 1)}>
                &gt;
              </button>
            </li>
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link py-2 px-388" onClick={() => goToPage(totalPages)}>
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
