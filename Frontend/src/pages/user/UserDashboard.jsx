import React from "react";

const UserDashboard = () => {
  const userOrders = [
    { id: 1, item: "Margherita Pizza", status: "Delivered" },
    { id: 2, item: "Caesar Salad", status: "Preparing" },
  ];

  return (
    <div>
      
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-orange-400 mb-2">
            User Dashboard
          </h1>
          <p className="text-gray-300">
            Welcome back! Here’s your order summary.
          </p>
        </div>

        {/* User Orders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userOrders.map((order) => (
            <div
              key={order.id}
              className="bg-gray-900 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-gray-400 text-sm">{order.item}</h2>
              <p
                className={`text-2xl font-bold mt-2 ${
                  order.status === "Delivered"
                    ? "text-green-400"
                    : order.status === "Preparing"
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {order.status}
              </p>
            </div>
          ))}
        </div>
      </div>
      );
    </div>
  );
};

export default UserDashboard;
