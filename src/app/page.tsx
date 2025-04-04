"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchProducts } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import ProductModal from "@/components/ProductModal";
import CartModal from "@/components/CartModal";

interface Category {
  id: number;
  nameUz: string;
}

interface Product {
  id: number;
  nameUz: string;
  nameRu: string;
  price: number;
  isDollar: boolean;
  image: string;
  code: string;
  inGroup: number;
  balance: number;
}

export default function HomePage() {

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false); 

  const { data: categoriesData, isLoading: categoriesLoading, isError: categoriesError } =
    useQuery<{ totalCount: number; data: Category[] }>({
      queryKey: ["categories"],
      queryFn: fetchCategories,
    });

   const { data : productsData, isLoading : productsLoading, error : productsError} = useQuery
   <{totalCount: number; data: Product[]}>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });


  const [searchText, setSearchText] = useState("");

  if (categoriesLoading || productsLoading) return <p>Yuklanmoqda...</p>;
  if (categoriesError || productsError) return <p>Xatolik yuz berdi!</p>;


  const filteredProducts = productsData?.data.filter((product) =>
    (product.nameRu.toLowerCase().includes(searchText.toLowerCase()) ||
    product.nameUz.toLowerCase().includes(searchText.toLowerCase()) ) && product.image
  );
 filteredProducts?.map(pro => console.log(pro.image))

  return (
    <div className="p-5 max-w-fit  mx-auto">
      <SearchBar onSearch={setSearchText} />

      {searchText ? (
        <>
        <div className="max-w-3xl mx-auto p-3">

          <h1 className="text-2xl font-bold mb-4">Mahsulotlar</h1>
          <ul className="space-y-4">
        { 
          filteredProducts?.map((product: any) => (
            <li key={product.id} className="flex items-center">
              <img
                src={`https://magnus-backend.uz/${product.image}`}
                alt={product.nameRu}
                className="w-[100px] h-[80px] object-cover rounded"
              />
              <div className="flex-1 p-1">
                <span className="flex">
                  <p className="text-[18px] font-bold mr-1">{product.nameRu}
                  <span className="text-gray-600 ml-2">
                    <span className="text-gray font-bold ">kod</span> #{product.code}
                  </span>
                  </p>
                </span>
                <p className="text-sm mt-1 ">
                  <span className="font-bold text-[18px] mr-6">
                    {product.isDollar ? `$${product.price}` : `${product.price} so‘m`}
                  </span>
                  <span className="font-medium text-[16px]">
                    {`${(product.price * 12954.12).toFixed(2)} so'm`}
                  </span>
                </p>
              </div>
              <button
                onClick={() => setSelectedProduct(product)}
                className="ml-3 p-3 rounded-full border hover:bg-gray-100 transition"
              >
                <ShoppingCart size={20} />
              </button>
            </li>
          ))}
      </ul>
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        title="Mahsulotlar"
        onClose={() => setSelectedProduct(null)}
      />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

<button
  onClick={() => setIsCartOpen(true)}
  className="fixed bottom-4 right-4 p-4 bg-white shadow-lg rounded-full border hover:bg-gray-100 transition"
>
  <ShoppingCart size={35} />
</button>
        </div>
        </>
      ) : (
        <>
        <div className="p-5 max-w-fit text-center m-auto">
          <h1 className="text-2xl font-bold mb-4 ">Kategoriyalar</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 w-auto">
            {categoriesData?.data?.map((category) => (
              <Link key={category.id} href={`/category/${category.id}`}>
                <div className="bg-white shadow-md rounded-lg p-3 flex flex-col items-center cursor-pointer hover:shadow-lg transition">
                  <Image
                    src={`/${category.id}.png`}
                    alt={category.nameUz}
                    width={200}
                    height={100}
                    objectFit="cover"
                    className="h-[100px] w-[100%] rounded-lg"
                  />
                  <p>{category.nameUz}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        </>
      )}
    </div>
  );
}
