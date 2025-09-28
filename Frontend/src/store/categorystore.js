import { create } from "zustand";

const useCategorystore = create((set) => ({
  categories: [],
  loading: false,
  error: null,

  setCategories: (categories) => set({ categories }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

export default useCategorystore;
