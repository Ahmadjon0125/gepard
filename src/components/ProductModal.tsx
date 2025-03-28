"use client";

import { Modal, Button, Spin } from "antd";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { cartStore } from "@/store/cart";


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

interface ProductModalProps {
    product: Product | null;
    isOpen: boolean;
    title: string;
    onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = observer(({ product, isOpen, title, onClose }) => {

    const [modalWidth, setModalWidth] = useState("600px");
  
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 768) {
          setModalWidth("100vw"); 
        } else {
          setModalWidth("500px"); 
        }
      };
  
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [karobka, setKarobka] = useState(0);
    const [dona, setDona] = useState(1);


    if (!product) {
        return (
            <div className="p-4 text-center">
                <Spin size="large" />
                <p>Yuklanmoqda...</p>
            </div>
        );
    }

    const increaseKarobka = () => {
        if ((karobka + 1) * product.inGroup + dona <= product.balance) {
            setKarobka(karobka + 1);
        }
    };

    const decreaseKarobka = () => {
        if (karobka > 0) setKarobka(karobka - 1);
    };

    const increaseDona = () => {
        if (karobka * product.inGroup + dona < product.balance) {
            setDona(dona + 1);
        }
    };

    const decreaseDona = () => {
        if (dona > 1) setDona(dona - 1);
    };

    const totalQuantity = karobka * product.inGroup + dona;
    const totalPrice = totalQuantity * product.price;

   

    if (!product) return null;

    return (
        <Modal title={title} open={isOpen} onCancel={onClose} footer={null} bodyStyle={{ maxHeight: "90vh", overflowY: "auto" }}  width={modalWidth} className="max-w-[500px]" getContainer={false}>
            <img
                src={`https://magnus-backend.uz/${product.image}`}
                alt={product.nameRu}
                className="w-[300px] h-[400px] object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold mb-3" >{product.nameRu}</h2>
            <p className="text-black font-bold" >kod: <span className="text-gray-600 text-[20px] font-medium ">#{product.code}</span></p>
            <div className="font-bold text-[16px] border-b-1 border-b-gray-400 pb-8">
                <p className="text-[16px] font-bold mt-2">
                    Narxi: {product.price}$
                </p >
                <p className="font-bold text-[16px] mb-3">{`${(product.price * 12954.12).toFixed(2)} so'm`}</p>
                <p className="mb-3">Har bir karobkada <span className="text-green-600">{product.inGroup} dona</span> dan mahsulot bor</p>
                <p>Omborda <span className="text-green-600">{product.balance} </span> dona qoldi</p>
            </div>
            <div className="p-4  rounded-md font-bold">
                <div className="flex items-center ">
                    <p>Karobka:</p>
                    <div className="flex items-center gap-2 ml-5">
                        <Button shape="circle" onClick={decreaseKarobka} >
                            -
                        </Button>
                        <span>{karobka}</span>
                        <Button shape="circle" onClick={increaseKarobka}>+</Button>
                    </div>
                </div>

                <div className="flex items-center  mt-2">
                    <p>Dona:</p>
                    <div className="flex items-center ml-10 gap-2">
                        <Button shape="circle" onClick={decreaseDona} >
                            -
                        </Button>
                        <span>{dona}</span>
                        <Button shape="circle" onClick={increaseDona}>+</Button>
                    </div>
                </div>

                <div className="mt-4 font-bold text-[18px]">
                    <p> Jami: <strong>{totalPrice.toFixed(1)}  $</strong></p>
                    <p> <strong>{(totalPrice * 12954.12).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}  so'm</strong></p>
                </div>

                <div className="flex justify-end mt-4">
                    <Button onClick={onClose} className="mr-3">Bekor qilish</Button>
                    <Button onClick={()=> cartStore.addToCart(
                        {
                            id: product.id.toString(),
                            name: product.nameRu,
                            price: product.price,
                            quantity: totalQuantity,
                            image: product.image,
                            code: product.code,
                            isDollar: product.isDollar
})} type="primary" >+ Qo‘shish</Button>
                </div>
            </div>
        </Modal>
    );
});

export default ProductModal;
