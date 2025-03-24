"use client"; 

import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import "./globals.css"

interface Category {
  id: number;
  nameUz: string;
}

export default function HomePage() {
  const { data, isLoading, isError } = useQuery<{ totalCount: number; data: Category[] }>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  console.log(data)

  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (isError) return <p>Xatolik yuz berdi!</p>;

  return (
    <div className="p-5 max-w-fit text-center m-auto">
      <h1 className="text-2xl font-bold mb-4">Kategoriyalar</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 w-auto">
        {data?.data.map((category: {id: number, nameUz: string; }) => (
          <Link key={category.id} href={`/category/${category.id}`}  >
            <div className="bg-white shadow-md rounded-lg p-3 flex flex-col items-center cursor-pointer hover:shadow-lg transition">
              <Image 
                src={`/${category.id}.png`}
                alt={category.nameUz}
                width={200}
                height={100}
                objectFit="cover"
                className="h-[120px] w-[80%] rounded-lg "
              />
              <p>{category.nameUz}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
