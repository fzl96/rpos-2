/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-shadow */
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../config/firebase';

type OrderItem = {
  id: string;
  quantity: number;
};

type Order = {
  id: string;
  type: string;
  table: number;
  cash: number;
  change: number;
  items: OrderItem[];
  total: number;
  date: Date;
};

export type OrderType = {
  type: string;
  table: number;
  cash: number;
  change: number;
  items: OrderItem[];
  total: number;
  date: Date;
};

// create order context type
type OrderContextType = {
  orders: Order[];
  cart: OrderItem[];
  loading: boolean;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  isItemInCart: (id: string) => boolean;
  addOrder: (order: OrderType) => void;
  deleteOrders: (id: string[]) => void;
};

// create order context
const OrderContext = createContext<OrderContextType>({
  orders: [],
  cart: [],
  loading: false,
  addToCart: () => {},
  removeFromCart: () => {},
  isItemInCart: () => false,
  addOrder: async () => {},
  deleteOrders: async () => {},
});

// create type for children
type Props = {
  children: React.ReactNode;
};

export function OrderProvider({ children }: Props) {
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // create a function that checks if the item is already in the cart
  const isItemInCart = (id: string) => {
    return !!cart.find((cartItem) => cartItem.id === id);
  };

  // create a function that will add item to cart
  const addToCart = (id: string) => {
    // check if item already exist in cart
    const exist = cart.find((x: OrderItem) => x.id === id);

    // if item already exist in cart, increase quantity
    if (exist) {
      setCart(
        cart.map((x: OrderItem) =>
          x.id === id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    } else {
      // if item not exist in cart, add item to cart
      setCart([...cart, { id, quantity: 1 }]);
    }
  };

  // create a function that decrease quantity of item in cart or remove item from cart
  const removeFromCart = (id: string) => {
    // find item in cart
    const exist = cart.find((x: OrderItem) => x.id === id);

    // if item quantity is 1, remove item from cart
    if (exist?.quantity === 1) {
      return setCart(cart.filter((x: OrderItem) => x.id !== id));
    }

    if (exist && exist.quantity > 1) {
      // if item quantity is more than 1, decrease quantity
      return setCart(
        cart.map((x: OrderItem) =>
          x.id === id ? { ...exist, quantity: exist?.quantity - 1 } : x
        )
      );
    }
    return null;
  };

  const addOrder = async (order: OrderType) => {
    return new Promise((resolve, reject) => {
      try {
        // add order to firebase
        addDoc(collection(db, 'orders'), order);
        // clear cart
        setCart([]);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const deleteOrders = async (ids: string[]) => {
    return new Promise((resolve, reject) => {
      try {
        // delete orders from firebase
        ids.forEach((id) => {
          deleteDoc(doc(db, 'orders', id));
        });
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(collection(db, 'orders'), (snapshot) => {
      const orders: any = [];
      snapshot.forEach((doc) => {
        orders.push({
          ...doc.data(),
          id: doc.id,
          date: doc.data().date.toDate(),
        });
      });
      // sort orders from newest to oldest
      orders.sort(
        (a: OrderType, b: OrderType) => b.date.getTime() - a.date.getTime()
      );
      setOrders(orders);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <OrderContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        isItemInCart,
        orders,
        loading,
        addOrder,
        deleteOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => useContext(OrderContext);
