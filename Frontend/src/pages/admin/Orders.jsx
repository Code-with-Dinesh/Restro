import React, { useState } from "react";

// Sample orders data
const initialOrders = [
  { id: 1, customer: "John Doe", item: "Margherita Pizza", status: "Pending" },
  { id: 2, customer: "Jane Smith", item: "Caesar Salad", status: "Preparing" },
  { id: 3, customer: "Bob Johnson", item: "Grilled Chicken", status: "Delivered" },
  { id: 4, customer: "Alice Brown", item: "Chocolate Lava Cake", status: "Pending" },
];

// Possible status options
const statusOptions = ["Pending", "Confirmed", "Preparing", "Delivered", "Canceled"];

export default function Orders() {
  const [orders, setOrders] = useState(initialOrders);

  // Update order status
  const handleStatusChange = (id, newStatus) => {
    setOrders(
      orders.map((order) => (order.id === id ? { ...order, status: newStatus } : order))
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-orange-400">Manage Orders</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left border border-gray-700">
          <thead>
            <tr className="bg-gray-800 text-gray-400">
              <th className="p-3">Customer</th>
              <th className="p-3">Item</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-700 hover:bg-gray-800 transition"
              >
                <td className="p-3">{order.customer}</td>
                <td className="p-3">{order.item}</td>
                <td
                  className={`p-3 font-semibold ${
                    order.status === "Delivered"
                      ? "text-green-400"
                      : order.status === "Preparing"
                      ? "text-yellow-400"
                      : order.status === "Canceled"
                      ? "text-red-400"
                      : "text-orange-400"
                  }`}
                >
                  {order.status}
                </td>
                <td className="p-3 space-x-2">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="bg-gray-800 text-white p-1 rounded"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={4} className="p-3 text-center text-gray-400">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
