import React, { useEffect, useState } from "react";
import { getcategories } from "../../api/productapi";

const Category = () => {
  const [categories, setCategories] = useState([]);

  const [newCategory, setNewCategory] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
      setPreview(URL.createObjectURL(file)); // preview the image
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim() === "" || !newImageFile) return;

    setCategories([
      ...categories,
      { _id: Date.now(), title: newCategory.trim(), coverimage: preview },
    ]);

    setNewCategory("");
    setNewImageFile(null);
    setPreview("");
  };

  const fetchCategories = async () => {
    try {
      const result = await getcategories();
      setCategories(result.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-orange-400 mb-6">Manage Categories</h1>

      {/* Add category form */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          onClick={handleAddCategory}
          className="bg-orange-400 text-white px-6 py-3 rounded-lg hover:bg-orange-500 transition"
        >
          Add Category
        </button>
      </div>

      {/* Preview selected image */}
      {preview && (
        <div className="mb-4">
          <p className="text-gray-300 mb-2">Preview:</p>
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Categories table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-700 text-left">
          <thead className="bg-gray-800 text-gray-400">
            <tr>
              <th className="p-3">Id</th>
              <th className="p-3">Name</th>
              <th className="p-3">Image</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => (
              <tr
                key={cat._id || index}
                className="border-b border-gray-700 hover:bg-gray-800 transition"
              >
                <td className="p-3">{cat._id}</td>
                <td className="p-3">{cat.title}</td>
                <td className="p-3">
                  <img
                    src={cat.coverimage}
                    alt={cat.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={3} className="p-3 text-center text-gray-400">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
