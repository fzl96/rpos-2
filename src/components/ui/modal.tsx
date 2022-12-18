import { useMenu } from '@/context/MenuContext';
import { useOrder } from '@/context/OrderContext';
import { Dialog, Transition } from '@headlessui/react';
import { format } from 'date-fns';
import { Fragment, useMemo, useState } from 'react';

export default function MyModal({ id }: { id: string }) {
  let [isOpen, setIsOpen] = useState(false);
  const { orders } = useOrder();
  const { menu } = useMenu();

  // get current order by id
  const currentOrder = useMemo(
    () => orders.find((order) => order.id === id),
    [orders, id]
  );

  if (!currentOrder) return null;

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(e: any) {
    e.stopPropagation();
    setIsOpen(true);
  }

  // creata function that search a menu by id and return the name
  const searchMenu = (id: string) => {
    const menuData = menu.find((x) => x.id === id);
    if (menuData) {
      return menuData.name;
    }
    return '';
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Lihat
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-[3.5rem] text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex justify-between"
                  >
                    Order{' '}
                    <span>
                      {format(currentOrder.date, 'MMM, dd yyyy HH:mm')}
                    </span>
                  </Dialog.Title>
                  <br />
                  <div className="mt-2 gap-2 flex flex-col">
                    {currentOrder?.items.map((item: any) => {
                      return (
                        <div key={item.id}>
                          <p className="flex justify-between">
                            {searchMenu(item.id)} <span>{item.quantity}</span>
                          </p>
                        </div>
                      );
                    })}
                    <br />
                    <p className="flex justify-between font-bold">
                      Total:{' '}
                      <span>
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                        }).format(currentOrder?.total)}
                      </span>
                    </p>
                    <p className="flex justify-between font-medium">
                      Cash:{' '}
                      <span>
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                        }).format(currentOrder.cash)}
                      </span>
                    </p>
                    <p className="flex justify-between font-medium">
                      Kembalian:{' '}
                      <span>
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                        }).format(currentOrder.change)}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
