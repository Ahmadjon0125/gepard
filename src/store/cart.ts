import { makeObservable, observable, action, computed } from "mobx";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  code: string;
  isDollar: boolean
}

class CartStore {
  cart: CartItem[] = [];

  constructor() {
    makeObservable(this, {
      cart: observable,
      addToCart: action,
      removeFromCart: action,
      clearCart: action,
      totalPrice: computed,
    });
  }

  addToCart(item: CartItem) {
    const existingItem = this.cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cart.push(item);
    }
  }

  removeFromCart(id: string) {
    this.cart = this.cart.filter((item) => item.id !== id);
  }

  clearCart() {
    this.cart = [];
  }

  get totalPrice() {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}

export const cartStore = new CartStore();
