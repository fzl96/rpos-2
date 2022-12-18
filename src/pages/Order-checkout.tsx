/* eslint-disable react-hooks/exhaustive-deps */
import OrderCheckoutForm from '@/components/order-checkout-form';
import CartItem from '@/components/ui/cart-item';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { MenuType, useMenu } from '../context/MenuContext';
import { useOrder } from '../context/OrderContext';

const types = [{ name: 'Dine-in' }, { name: 'Takeout' }];

function OrderCheckout() {
  const [selected, setSelected] = useState(types[0]);
  const { menu } = useMenu();
  const { cart, removeFromCart, addToCart } = useOrder();

  return (
    <motion.div
      className="grid md:grid-cols-2 grid-cols-1"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex flex-col md:pr-20">
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold">Order Summary</h2>
          <p className="text-gray-500">
            Check the items before saving the order.
          </p>
        </div>
        <div className="rounded-xl flex flex-col border-2 p-6 gap-5 mt-6">
          {cart.map((item) => {
            const itemData = menu.find((x: MenuType) => x.id === item.id);
            return (
              <CartItem
                key={item.id}
                id={item.id}
                {...itemData}
                quantity={item.quantity}
                removeFromCart={removeFromCart}
                addToCart={addToCart}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col md:mt-0 mt-10">
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold">Order Details</h2>
          <p className="text-gray-500">Fill out the details of the order.</p>
        </div>
        <OrderCheckoutForm />
      </div>
    </motion.div>
  );
}

export default OrderCheckout;
