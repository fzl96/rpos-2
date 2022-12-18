import type { OrderType } from '@/context/OrderContext';
import { useOrder } from '@/context/OrderContext';
import { IoMdPricetag } from 'react-icons/io';
import { MdOutlineShoppingCart } from 'react-icons/md';
import Card from './ui/card';

export type OrdersCardItems = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  background: string;
};

const ordersCardItems: OrdersCardItems[] = [
  {
    title: 'Pendapatan',
    subtitle: 'Total pendapatan hari ini',
    icon: <IoMdPricetag />,
    background: 'bg-[#fdefef]',
  },
  {
    title: 'Pesanan',
    subtitle: 'Total pesanan hari ini',
    icon: <MdOutlineShoppingCart />,
    background: 'bg-[#f9f3df]',
  },
];

function OrdersCard() {
  const { orders } = useOrder();

  const today = new Date();
  const todayOrders = orders.filter((order: OrderType) => {
    const orderDate = new Date(order.date);
    if (
      orderDate.getDate() === today.getDate() &&
      orderDate.getMonth() === today.getMonth() &&
      orderDate.getFullYear() === today.getFullYear()
    ) {
      return order;
    }
    return null;
  });

  const totalSalesToday = todayOrders.reduce(
    (acc: number, order: OrderType) => acc + order.total,
    0
  );

  const totalOrdersToday = todayOrders.length;

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-5 pt-5">
      {ordersCardItems.map((item) => (
        <Card
          value={
            item.title === 'Pendapatan' ? totalSalesToday : totalOrdersToday
          }
          {...item}
          key={item.title}
        />
      ))}
    </div>
  );
}
export default OrdersCard;
