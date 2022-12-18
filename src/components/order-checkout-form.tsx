/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import ListBox from '@/components/ui/listbox';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { MenuType } from '../context/MenuContext';
import { useMenu } from '../context/MenuContext';
import { useOrder } from '../context/OrderContext';

const types = [{ name: 'Dine-in' }, { name: 'Takeout' }];

function OrderCheckoutForm() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(types[0]);
  const { menu } = useMenu();
  const { cart, addOrder } = useOrder();

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => {
      const itemData = menu.find((x: MenuType) => x.id === item.id);
      if (itemData) {
        return sum + itemData.price * item.quantity;
      }
      return sum;
    }, 0);
  };

  const [order, setOrder] = useState({
    type: selected.name,
    table: 0,
    cash: 0,
    change: 0,
    items: cart,
    total: getTotalPrice() * 0.1 + getTotalPrice(),
    date: new Date(),
  });

  useEffect(() => {
    setOrder({
      ...order,
      type: selected.name,
    });
  }, [selected.name]);

  useEffect(() => {
    setError('');
  }, [order.cash, selected.name, order.table]);

  const handleOrderSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      if (order.cash < order.total) {
        setError('Cash tidak cukup');
        return;
      }
      await addOrder(order);
      navigate('/orders');
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
      console.log(err);
    }
  };

  return (
    <form className="flex flex-col gap-3 mt-4" onSubmit={handleOrderSubmit}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="font-semibold">
        Order Type (Dine-in / Takeout)
        <ListBox selected={selected} setSelected={setSelected} types={types} />
      </label>
      <label htmlFor="tableNumber" className="font-semibold">
        Table Number
      </label>
      <input
        type="number"
        name="tableNumber"
        id="tableNumber"
        className={`${
          selected.name === 'Takeout' ? 'bg-gray-100' : ''
        } py-3 px-6 rounded-lg border-2`}
        placeholder="No"
        onChange={(e) =>
          setOrder({
            ...order,
            table: Number.isNaN(Number(e.target.value))
              ? 0
              : Number(e.target.value),
          })
        }
        disabled={selected.name === 'Takeout'}
      />
      <label htmlFor="price" className="font-semibold">
        Cash
      </label>
      <input
        type="number"
        name="cash"
        id="cash"
        className="py-3 px-6 rounded-lg border-2"
        placeholder="Cash"
        min={1}
        onChange={(e) => {
          setOrder({
            ...order,
            cash: Number.isNaN(Number(e.target.value))
              ? 0
              : Number(e.target.value),
            change: Number.isNaN(Number(e.target.value))
              ? 0
              : Number(e.target.value) - order.total,
          });
        }}
      />
      <div className="flex flex-col gap-3">
        <div className="flex  justify-between">
          <h2>Subtotal</h2>
          <h3>
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
            }).format(getTotalPrice())}
          </h3>
        </div>
        <div className="flex  justify-between">
          <h2>Pajak (10%)</h2>
          <h3>
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
            }).format(getTotalPrice() * 0.1)}
          </h3>
        </div>
        <div className="flex font-bold justify-between">
          <h2>Total</h2>
          <h3>
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
            }).format(getTotalPrice() * 0.1 + getTotalPrice())}
          </h3>
        </div>
        <div className="flex justify-between">
          <h2>Cash</h2>
          <h3>
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
            }).format(order.cash)}
          </h3>
        </div>
        <div className="flex font-bold justify-between">
          <h2>Kembalian</h2>
          <h3>
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
            }).format(order.cash - getTotalPrice() * 1.1)}
          </h3>
        </div>
      </div>

      <button
        type="submit"
        className="bg-[#111827] text-white rounded-lg py-4 px-6 mt-4"
      >
        Save
      </button>
      <h1 className="text-red-500">{error}</h1>
    </form>
  );
}

export default OrderCheckoutForm;
