import React, { useState, useEffect } from "react";
import { getcategories, getfooditems, addfooditem, deletefood, updatefooditem } from "../../api/productapi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Items() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      id: null,
      description: "",
      name: "",
      price: "",
      category: "",
      available: true,
      image: null,
    },
  });

  const watchId = watch("id"); // watch if editing

  // Fetch categories
  const getCategory = async () => {
    try {
      const result = await getcategories();
      setCategories(result.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Fetch food items
  const fetchFoodItems = async () => {
    try {
      const result = await getfooditems();
      setItems(result.data);
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };

  useEffect(() => {
    fetchFoodItems();
    getCategory();
  }, []);

  // Submit form (Add or Edit)
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("availability", data.available);
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      if (data.id) {
        // Edit item
        await updatefooditem(data.id, formData);
        toast.success("Item updated successfully");
      } else {
        // Add new item
        await addfooditem(formData);
        toast.success("Item added successfully");
      }

      reset();
      fetchFoodItems();
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to save item");
    }
  };

  // Handle Edit (populate form)
  const handleEdit = (item) => {
    setValue("id", item._id);
    setValue("description", item.description);
    setValue("name", item.name);
    setValue("price", item.price);
    setValue("category", item.category);
    setValue("available", item.availability);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await deletefood(id);
      toast.success("Item deleted successfully");
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
      toast.error("Failed to delete item");
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-orange-400 text-center md:text-left">
        Manage Items
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-900 p-4 md:p-6 rounded-lg shadow space-y-4 max-w-6xl mx-auto"
        encType="multipart/form-data"
      >
        <input
          type="text"
          placeholder="Item Name"
          {...register("name", { required: "Name is required" })}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}

        <textarea
          placeholder="Description"
          {...register("description", { required: "Description is required" })}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        {errors.description && <p className="text-red-400 text-sm">{errors.description.message}</p>}

        <input
          type="number"
          placeholder="Price"
          {...register("price", { required: "Price is required" })}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        {errors.price && <p className="text-red-400 text-sm">{errors.price.message}</p>}

        <select
          {...register("category", { required: "Category is required" })}
          className="w-full p-2 rounded bg-gray-800 text-white"
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.title}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-red-400 text-sm">{errors.category.message}</p>}

        <input
          type="file"
          accept="image/*"
          {...register("image")}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        <label className="flex items-center space-x-2">
          <input type="checkbox" {...register("available")} />
          <span>Available</span>
        </label>

        {/* Add/Edit Item Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full md:w-auto bg-green-500 px-4 py-2 rounded text-black font-semibold ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? (watchId ? "Updating..." : "Adding...") : watchId ? "Update Item" : "Add Item"}
        </button>
      </form>

      {/* Items Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border border-gray-700">
          <thead>
            <tr className="bg-gray-800 text-gray-400">
              <th className="p-3">Id</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Category</th>
              <th className="p-3">Available</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item._id}
                className="border-b border-gray-700 hover:bg-gray-800 transition"
              >
                <td className="p-3">{item._id}</td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">₹{item.price}</td>
                <td className="p-3">{item.category?.title}</td>
                <td className="p-3">{item.availability ? "Yes" : "No"}</td>
                <td className="p-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 cursor-pointer px-2 py-1 rounded text-black"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 cursor-pointer px-2 py-1 rounded text-black"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={6} className="p-3 text-center text-gray-400">
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
