
"use client";

import { Modal, Button, Select, Input } from "antd";
import { observer } from "mobx-react-lite";
import { cartStore } from "@/store/cart";
import { useState } from "react";

const CartModal = observer(({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [paymentType, setPaymentType] = useState("Naqd pul");
  return (
    <Modal title="Savatcha" open={isOpen} onCancel={onClose} footer={null}>
      {cartStore.cart.length === 0 ? (
        <p>Savatcha bo‘sh</p>
      ) : (
        cartStore.cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center p-2 border-b">
            <img src={`https://magnus-backend.uz/${item.image}`} alt={item.name} className="w-24 h-24 object-cover rounded" />
            <div className="flex-1 p-2">
                  <p className="text-[18px] font-bold mr-4">{item.name}</p>
                  <p className="text-gray-600">
                    <span className="text-gray font-bold mr-2">kod</span> #{item.code}
                  </p>
                <p className="text-sm mt-1">
                  <span className="font-bold text-[18px] mr-6">
                    {item.isDollar ? `$${item.price}` : `${item.price} so‘m`}
                  </span>
                  <span className="font-medium text-[16px]">
                    {`${(item.price * 12954.12).toFixed(2)} so'm`}
                  </span>
                </p>
              </div>
            <Button shape="circle" onClick={() => cartStore.removeFromCart(item.id)}>-</Button>
          </div>
        ))
      )}
      <div className="mt-4">
        <p className="font-bold">To‘lov turi</p>
        <Select value={paymentType} onChange={setPaymentType} className="w-full">
          <Select.Option value="Naqd pul">Naqd pul</Select.Option>
          <Select.Option value="Plastik karta">Click</Select.Option>
          <Select.Option value="Plastik karta">Payme</Select.Option>
        </Select>
      </div>
      <div className="mt-4">
        <p className="font-bold">Izoh</p>
        <Input placeholder="Izoh yozing..." />
      </div>
      <h3 className="text-lg font-bold mt-4">
        Jami narx: {cartStore.totalPrice} $
        <p>
        {(cartStore.totalPrice * 12954.12).toLocaleString()} so‘m
        </p>
        <p className="text-gray-600">Toshkent shahar ichida yetkazib berish: 25000 so‘m</p>
      </h3>
      <div className="flex justify-end mt-6">
        <Button className="mr-3" onClick={onClose}>Bekor qilish</Button>
        <Button type="primary" onClick={onClose}>Buyurtma qilish</Button>
      </div>
    </Modal>
  );
});

export default CartModal;
