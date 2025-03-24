import axios from "axios";

const api = axios.create({
  baseURL: "https://magnus-backend.uz/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchCategories = async () => {
  const res = await api.post("/category/find-many", {}); 
  return res.data; 
};

export default api;
