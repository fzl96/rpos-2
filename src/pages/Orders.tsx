/* eslint-disable react-hooks/exhaustive-deps */
import OrdersCard from '@/components/orders-cards';
import Table from '@/components/table';
import AddButton from '@/components/ui/add-btn';
import PageTitle from '@/components/ui/page-title';
import { useOrder } from '@/context/OrderContext';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

function Orders() {
  const [, setOpen]: any = useOutletContext();
  const { orders } = useOrder();

  useEffect(() => {
    document.title = 'POS - Dashboard';
    setOpen(false);
  }, []);

  return (
    <div className="pb-20">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <PageTitle title="Pesanan" />
        <div className="flex flex-col gap-5 ">
          <OrdersCard />
        </div>
        <div className="bg-[#fafbfb] p-5 rounded-2xl shadow-lg mt-5">
          <Table rows={orders} />
        </div>
      </motion.div>
      <AddButton toolTipTitle="Add Order" navigateTo="/orders/new" />
    </div>
  );
}
export default Orders;
