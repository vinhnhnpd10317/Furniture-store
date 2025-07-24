import React from "react";

export type OrderStatus =
  | "cho_xu_ly"
  | "dang_xu_ly"
  | "dang_van_chuyen"
  | "da_giao"
  | "da_huy";

interface Props {
  selectedStatus: OrderStatus;
  onChange: (status: OrderStatus) => void;
}

const ORDER_STATUSES: { label: string; value: OrderStatus }[] = [
  { label: "Chờ xử lý", value: "cho_xu_ly" },
  { label: "Đang xử lý", value: "dang_xu_ly" },
  { label: "Đang vận chuyển", value: "dang_van_chuyen" },
  { label: "Đã giao", value: "da_giao" },
  { label: "Đã hủy", value: "da_huy" },
];

const OrderStatusTabs: React.FC<Props> = ({ selectedStatus, onChange }) => {
  return (
    <ul className="nav nav-tabs mb-3">
      {ORDER_STATUSES.map((status) => (
        <li className="nav-item" key={status.value}>
          <button
            className={`nav-link ${status.value === selectedStatus ? "active" : ""}`}
            onClick={() => onChange(status.value)}
          >
            {status.label}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default OrderStatusTabs;
