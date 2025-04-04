import axios from "axios";

const api = axios.create({
  baseURL: "https://magnus-backend.uz/api",
  headers: {
    "Content-Type": "application/json",
  },
});


export const fetchProductById = async (id: number) => {
  const { data } = await api.post(`/product/find-many`, { where: { categoryId: id } });
  if(data.data.code === "WE-0165") return null
  return data;
};

export const fetchProducts = async () => {
  const { data } = await api.post(`/product/find-many`, {});
  if(data.data.code === "WE-0165") return null
  return data;
};

export const fetchCategoryTitle = async (productId: number) => {
  const { data } = await api.post("/category/find-many", { where: { id: productId } });
  if(data.data.code === "WE-0165") return null
  return data.data[0]?.nameUz;
};

export const fetchCategories = async () => {
  const res = await api.post("/category/find-many", {}); 
  return res.data; 
};

export default api;
