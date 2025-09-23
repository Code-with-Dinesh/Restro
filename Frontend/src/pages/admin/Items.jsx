import React, { useState } from "react";

const initialItems = [
  { id: 1, name: "Margherita Pizza", price: 10, category: "Pizza", available: true },
  { id: 2, name: "Veg Burger", price: 8, category: "Burger", available: true },
  { id: 3, name: "Caesar Salad", price: 6, category: "Salad", available: true },
];

export default function Items() {
  const [items, setItems] = useState(initialItems);
  const [form, setForm] = useState({ id: null, name: "", price: "", category: "", available: true });
  const [isEditing, setIsEditing] = useState(false);

  // Handle form change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  // Add item
  const handleAdd = () => {
    if (!form.name || !form.price || !form.category) return alert("Fill all fields");
    const newItem = { ...form, id: Date.now(), price: Number(form.price) };
    setItems([...items, newItem]);
    setForm({ id: null, name: "", price: "", category: "", available: true });
  };

  // Edit item
  const handleEdit = (item) => {
    setIsEditing(true);
    setForm(item);
  };

  // Update item
  const handleUpdate = () => {
    setItems(items.map((i) => (i.id === form.id ? { ...form, price: Number(form.price) } : i)));
    setIsEditing(false);
    setForm({ id: null, name: "", price: "", category: "", available: true });
  };

  // Delete item
  const handleDelete = (id) => {
    setItems(items.filter((i) => i.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-orange-400">Manage Items</h1>

      {/* Form */}
      <div className="bg-gray-900 p-4 rounded-lg shadow space-y-2">
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="available"
            checked={form.available}
            onChange={handleChange}
          />
          <span>Available</span>
        </label>
        {isEditing ? (
          <button onClick={handleUpdate} className="bg-orange-400 px-4 py-2 rounded text-black">
            Update Item
          </button>
        ) : (
          <button onClick={handleAdd} className="bg-green-500 px-4 py-2 rounded text-black">
            Add Item
          </button>
        )}
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border border-gray-700">
          <thead>
            <tr className="bg-gray-800 text-gray-400">
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Category</th>
              <th className="p-3">Available</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-800 transition">
                <td className="p-3">{item.name}</td>
                <td className="p-3">${item.price}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3">{item.available ? "Yes" : "No"}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 px-2 py-1 rounded text-black"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 px-2 py-1 rounded text-black"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="p-3 text-center text-gray-400">
                  No items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
