import React, { useEffect, useState } from "react";
import { getcategories, addcategoryApi ,deletcatrogyapi} from "../../api/productapi";
import toast from "react-hot-toast";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const fetchCategories = async () => {
    try {
      const result = await getcategories();
      setCategories(result.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories(); 
  }, []);

  const handleAddCategory = async () => {
    if (newCategory.trim() === "" || !newImageFile) {
      toast.error("Please enter category name and select an image");
      return;
    }

    const formData = new FormData();
    formData.append("title", newCategory);
    formData.append("coverimage", newImageFile);

    try {
      setLoading(true);
      const result = await addcategoryApi(formData);

      if (result.data && result.data.category) {
        const newCat = result.data.category;
        setCategories(prev => [...prev, newCat]);
        toast.success("Category added successfully");
      }
      setNewCategory("");
      setNewImageFile(null);
      setPreview("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  const handledeltecatrogy = async (id) => {
  if (!id) return toast.error("Invalid category id");

  try {
    setLoading(true)
    await deletcatrogyapi(id);
    setCategories(prev => prev.filter(cat => cat._id !== id)); // remove from UI
    toast.success("Category removed successfully");
    setLoading(false)
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete category");
  }
};

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
          disabled={loading}
          className={`px-6 py-3 rounded-lg text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-400 hover:bg-orange-500"
          }`}
        >
          {loading ? "Adding..." : "Add Category"}
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
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((cat, index) => (
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
                  <td className="p-3">
                    <button
                    onClick={()=>handledeltecatrogy(cat._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      {loading ? "Delete..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-3 text-center text-gray-400">
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
