import { AnimatePresence, motion } from 'framer-motion';
import { useOrder } from '../../context/OrderContext';

interface ItemCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

function OrderItemCard({ id, name, price, description, image }: ItemCardProps) {
  const { cart, addToCart, removeFromCart, isItemInCart } = useOrder();

  return (
    <div className="flex md:flex-col w-full items-center bg-white rounded-lg border border-gray-200 shadow-md md:px-0 px-3 gap-2">
      <img
        className="md:rounded-t-lg md:rounded-none md:shadow-none shadow-sm rounded-lg md:w-full md:min-h-[10rem] h-20 w-20 object-cover"
        src={image}
        alt={name}
      />
      <div className="flex flex-col justify-between md:p-5 p-3 md:gap-0 gap-5 w-full h-full">
        <div>
          <h5 className="md:mb-2 text-xl font-bold tracking-tight text-gray-900 ">
            {name}
          </h5>
          <p className="md:mb-2 font-normal text-sm text-gray-700">
            {description}
          </p>
        </div>
        <div className="flex md:flex-col md:gap-4 justify-between items-center">
          <p className="font-bold text-base text-gray-900">
            {price.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            })}
          </p>
          <AnimatePresence>
            {isItemInCart(id) ? (
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
                <h3>{cart.filter((item) => item.id === id)[0].quantity}</h3>
                <motion.button
                  className="text-lg text-center font-bold h-8 w-8 border rounded-xl text-green-700 border-green-700"
                  onClick={() => addToCart(id)}
                  whileTap={{ scale: 0.9, backgroundColor: '#15803d' }}
                  whileHover={{ scale: 1.1 }}
                >
                  +
                </motion.button>
              </motion.div>
            ) : (
              <motion.button
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-sm font-semibold h-8 w-14 border rounded-xl text-green-700 border-green-700 "
                whileTap={{ scale: 0.9, backgroundColor: '#15803d' }}
                whileHover={{ scale: 1.1 }}
                onClick={() => addToCart(id)}
              >
                Add
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
export default OrderItemCard;
