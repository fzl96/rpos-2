import OrderItemCard from '@/components/ui/order-item-card';
import { Tooltip } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { BsFillHandbagFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { MenuType, useMenu } from '../context/MenuContext';
import { useOrder } from '../context/OrderContext';

function OrderNew() {
  const { menu, loading } = useMenu();
  const { cart } = useOrder();

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => {
      const itemData = menu.find((x: MenuType) => x.id === item.id);
      if (itemData) {
        return sum + itemData.price * item.quantity;
      }
      return sum;
    }, 0);
  };

  const getTotalQuantity = () => {
    return cart.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className="text-2xl font-semibold">Pilih item</h1>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 md:col-span-1 col-span-full grid-cols-1 gap-5 mt-5 pb-20">
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            menu.map((food: any) => <OrderItemCard key={food.id} {...food} />)
          )}
        </div>
      </motion.div>
      <Tooltip title="View Cart" placement="left" arrow>
        <AnimatePresence>
          {cart.length !== 0 ? (
            <motion.div
              key="cart"
              className="bg-green-700 py-3 px-6 rounded-3xl shadow-lg fixed bottom-10 md:left-[50%] text-white md:w-[30rem] w-[21.5rem]"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
            >
              <Link to="/orders/new/checkout">
                <div className="flex justify-between">
                  <p>{getTotalQuantity()} items</p>
                  <p className="flex items-center gap-2 text-lg">
                    {getTotalPrice().toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    })}
                    <span>
                      <BsFillHandbagFill />
                    </span>
                  </p>
                </div>
              </Link>
            </motion.div>
          ) : (
            <div />
          )}
        </AnimatePresence>
      </Tooltip>
    </>
  );
}
export default OrderNew;
