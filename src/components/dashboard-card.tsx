import type { OrderType } from '@/context/OrderContext';
import { useOrder } from '@/context/OrderContext';
import { startOfToday } from 'date-fns';
import { IoMdPricetag } from 'react-icons/io';
import { MdLocalDining, MdOutlineShoppingCart } from 'react-icons/md';
import Card from './ui/card';

export type DashboardItems = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  background: string;
};

export const dashboardItems: DashboardItems[] = [
  {
    title: 'Pendapatan',
    subtitle: 'Total pendapatan bulan ini',
    icon: <IoMdPricetag />,
    background: 'bg-[#ffefe2]',
  },
  {
    title: 'Pesanan',
    subtitle: 'Total pesanan bulan ini',
    icon: <MdOutlineShoppingCart />,
    background: 'bg-[#E6F5F9]',
  },
  {
    title: 'Produk',
    subtitle: 'Jumlah produk',
    icon: <MdLocalDining />,
    background: 'bg-[#F4F6FA]',
  },
];

function DashboardCard() {
  const { orders } = useOrder();
  const today = startOfToday();
  const currentMonthOrders = orders.filter((order: OrderType) => {
    const orderDate = new Date(order.date);
    if (
      orderDate.getMonth() === today.getMonth() &&
      orderDate.getFullYear() === today.getFullYear()
    ) {
      return order;
    }
    return null;
  });

  const totalSalesThisMonth = currentMonthOrders.reduce(
    (acc: number, order: OrderType) => acc + order.total,
    0
  );

  return (
    <div className="grid md:grid-cols-3 grid-cols-2 gap-5 pt-5">
      {dashboardItems.map((item) => (
        <Card
          value={
            item.title === 'Pendapatan'
              ? totalSalesThisMonth
              : currentMonthOrders.length
          }
          {...item}
          key={item.title}
        />
      ))}
    </div>
  );
}
export default DashboardCard;
