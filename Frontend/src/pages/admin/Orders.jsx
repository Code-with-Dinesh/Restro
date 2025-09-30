import React, { useEffect, useState } from "react";
import { orderapi, updateorderApi } from "../../api/productapi";
import toast from "react-hot-toast";

const statusOptions = ["Pending", "Confirmed", "Delivered", "Canceled"];

export default function Orders() {
  const [orders, setOrders] = useState([]);

  
  const fetchOrder = async () => {
    try {
      const result = await orderapi();
      setOrders(result.data); 
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

 
  const handleStatusChange = async (id, newStatus) => {
    console.log(id,newStatus)
    try {
      
      setOrders(
        orders.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order
        )
      );

      
      const result = await updateorderApi(id, newStatus);
      toast.success("Update Status successfully")
     
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-orange-400">Manage Orders</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left border border-gray-700">
          <thead>
            <tr className="bg-gray-800 text-gray-400">
              <th className="p-3">Customer Id</th>
              <th className="p-3">Item</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b border-gray-700 hover:bg-gray-800 transition"
              >
                <td className="p-3">{order.user?.name || order.user}</td>
                <td className="p-3">
                  {order.items?.map((i) => i.food?.name || i.food).join(", ")}
                </td>
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
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
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
