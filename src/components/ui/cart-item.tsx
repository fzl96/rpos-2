/* eslint-disable react/require-default-props */
import { motion } from 'framer-motion';

interface Props {
  id: string;
  name?: string;
  image?: string;
  price?: number;
  quantity: number;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
}

function CartItem({
  id,
  name,
  image,
  price,
  quantity,
  addToCart,
  removeFromCart,
}: Props) {
  return (
    <div className="flex items-center gap-5">
      <img
        className="h-20 min-w-[7rem] w-[7rem] border rounded-lg object-cover"
        src={image}
        alt={name}
      />
      <div className="flex flex-col w-full gap-2">
        <h1 className="text-xl font-semibold">{name}</h1>
        <div className="flex md:flex-row flex-col md:gap-0 gap-2 justify-between">
          <p className="font-semibold">
            {(quantity * (price ?? 1)).toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            })}
          </p>
          <motion.div
            className="flex items-center gap-2"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <motion.button
              className="text-sm font-semibold h-8 w-8 border rounded-xl text-green-700 border-green-700"
              onClick={() => removeFromCart(id)}
              whileTap={{ scale: 0.9, backgroundColor: '#15803d' }}
              whileHover={{ scale: 1.1 }}
            >
              —
            </motion.button>
            <h3>{quantity}</h3>
            <motion.button
              className="text-lg text-center font-bold h-8 w-8 border rounded-xl text-green-700 border-green-700"
              onClick={() => addToCart(id)}
              whileTap={{ scale: 0.9, backgroundColor: '#15803d' }}
              whileHover={{ scale: 1.1 }}
            >
              +
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
export default CartItem;
