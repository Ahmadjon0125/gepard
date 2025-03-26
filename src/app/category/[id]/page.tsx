'use client'

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";
import api from "@/lib/api";
import { useState } from "react";
import ProductModal from "@/components/ProductModal";

interface Product {
  id: number;
  nameRu: string;
  price: number;
  isDollar: boolean;
  image: string;
  code: string;
  inGroup: number;
  balance: number;
}



const fetchProductById = async (id: number) => {
  const { data } = await api.post(`/product/find-many`, { where: { categoryId: id } });
  console.log(data)
  return data;

};

const fetchCategoryTitle = async (productId: number) => {
  const { data } = await api.post("/category/find-many", { where: { id: productId } });
  return data.data[0]?.nameUz
};


const ProductDetail = () => {
  const params = useParams();
  const productId = Number(params.id);
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data: title, isLoading: isTitleLoading } = useQuery({
    queryKey: ["categoryTitle", productId],
    queryFn: () => fetchCategoryTitle(productId),
    enabled: !!productId,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
    enabled: !!productId,
  });

  if (isLoading || isTitleLoading) return <div>Yuklanmoqda...</div>;
  if (error) return <div>Xatolik yuz berdi!</div>;



  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
  };
  

  return (
    <div className="max-w-3xl mx-auto p-3">
      <h1 className="text-3xl text-center font-bold my-8">{title}</h1>
      <ul className="space-y-4">
        {data.data
          ?.filter((product: any) => product.image)
          .map((product: any) => (
            <li key={product.id} className="flex items-center ">
              <img
                src={`https://magnus-backend.uz/${product.image}`}
                alt={product.nameRu}
                className="w-[100px] h-[80px] object-cover rounded"
              />
              <div className="flex-1 p-2">
                <span className="flex">
                  <p className="text-[18px] font-bold mr-4">{product.nameRu}</p>
                  <p className=" text-gray-600"><span className="text-gray font-bold mr-2">kod</span> #{product.code}</p>
                </span>
                <p className="text-sm mt-1">
                  <span className="font-bold text-[18px] mr-6 ">
                    {product.isDollar ? `$${product.price}` : `${product.price} so‘m`}
                  </span>
                  <span className="font-medium text-[16px]">{`${(product.price * 12954.12).toFixed(2)} so'm`}</span>
                </p>
              </div>
              <button onClick={() => handleOpenModal(product)} className=" ml-3 p-3 rounded-full border hover:bg-gray-100 transition">
                <ShoppingCart size={20} />
              </button>
            </li>
          ))}
      </ul>
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        title={title}
        onClose={() => setSelectedProduct(null)}
      />

      <button className="fixed bottom-4 right-4 p-4 bg-white shadow-lg rounded-full border hover:bg-gray-100 transition">
        <ShoppingCart size={28} />
      </button>
    </div>
  );
};

export default ProductDetail;
