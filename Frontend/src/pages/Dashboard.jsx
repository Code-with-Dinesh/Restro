import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Sample data for charts
const salesData = [
  { day: "Mon", orders: 12 },
  { day: "Tue", orders: 20 },
  { day: "Wed", orders: 8 },
  { day: "Thu", orders: 15 },
  { day: "Fri", orders: 25 },
  { day: "Sat", orders: 30 },
  { day: "Sun", orders: 18 },
];

// Sample recent orders (for admin)
const recentOrders = [
  { id: 1, customer: "John Doe", item: "Margherita Pizza", status: "Delivered" },
  { id: 2, customer: "Jane Smith", item: "Caesar Salad", status: "Preparing" },
  { id: 3, customer: "Bob Johnson", item: "Grilled Chicken", status: "Pending" },
  { id: 4, customer: "Alice Brown", item: "Chocolate Lava Cake", status: "Delivered" },
];

// Sample user orders (for user role)
const userOrders = [
  { id: 1, item: "Margherita Pizza", status: "Delivered" },
  { id: 2, item: "Caesar Salad", status: "Preparing" },
];

export default function Dashboard({ role }) {
  console.log(role)
  if (role === "admin") {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-orange-400 mb-2">Admin Dashboard</h1>
          <p className="text-gray-300">Welcome back, Admin! Here’s your restaurant overview.</p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-900 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-gray-400 text-sm">Total Orders</h2>
            <p className="text-2xl font-bold text-white mt-2">128</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-gray-400 text-sm">Revenue</h2>
            <p className="text-2xl font-bold text-white mt-2">$3,450</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-gray-400 text-sm">Customers</h2>
            <p className="text-2xl font-bold text-white mt-2">76</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-gray-400 text-sm">Menu Items</h2>
            <p className="text-2xl font-bold text-white mt-2">24</p>
          </div>
        </div>

        {/* Sales Chart */}
        <div className="bg-gray-900 p-6 rounded-xl shadow">
          <h2 className="text-gray-400 text-lg mb-4">Orders This Week</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={salesData}>
              <XAxis dataKey="day" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#F97316" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-gray-900 p-6 rounded-xl shadow overflow-x-auto">
          <h2 className="text-gray-400 text-lg mb-4">Recent Orders</h2>
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-gray-400 uppercase text-sm border-b border-gray-700">
                <th className="p-3">Customer</th>
                <th className="p-3">Item</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-700 hover:bg-gray-800 transition">
                  <td className="p-3">{order.customer}</td>
                  <td className="p-3">{order.item}</td>
                  <td className={`p-3 font-semibold ${
                    order.status === "Delivered" ? "text-green-400" :
                    order.status === "Preparing" ? "text-yellow-400" :
                    "text-red-400"
                  }`}>
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // User Dashboard
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-orange-400 mb-2">User Dashboard</h1>
        <p className="text-gray-300">Welcome back! Here’s your order summary.</p>
      </div>

      {/* User Orders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userOrders.map((order) => (
          <div key={order.id} className="bg-gray-900 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-gray-400 text-sm">{order.item}</h2>
            <p className={`text-2xl font-bold mt-2 ${
              order.status === "Delivered" ? "text-green-400" :
              order.status === "Preparing" ? "text-yellow-400" :
              "text-red-400"
            }`}>
              {order.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
