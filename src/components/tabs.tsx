import { Tab } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import type { MenuType } from '../context/MenuContext';
import { useMenu } from '../context/MenuContext';
import MenuCard from './ui/menus-card';

const classNames = (...classes: [string, string, string]) => {
  return classes.filter(Boolean).join(' ');
};

function Tabs() {
  const { menu, loading } = useMenu();

  const categories = ['Food', 'Drinks'];

  const foods = useMemo(
    () => menu?.filter((item: MenuType) => item.type === 'Makanan'),
    [menu]
  );

  const drinks = useMemo(
    () => menu?.filter((item: MenuType) => item.type === 'Minuman'),
    [menu]
  );

  return (
    <Tab.Group>
      <Tab.List className="flex space-x-1 border-b-2 py-3">
        {categories.map((category) => (
          <Tab
            key={category}
            className={({ selected }) =>
              classNames(
                'px-8 rounded-lg py-2.5 text-md font-medium leading-5',
                'ring-[#1c253a] ring-opacity-60 ring-offset-2 ring-offset-white focus:outline-none focus:ring-2',
                selected
                  ? 'bg-[#111827] shadow text-white'
                  : 'text-[#797a7b] hover:bg-white/[0.12] hover:text-black'
              )
            }
          >
            {category}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-3">
        <Tab.Panel className="grid md:grid-cols-3 grid-cols-2 gap-4">
          {loading ? (
            <h1>loading...</h1>
          ) : (
            foods.map((food: MenuType, i: number) => (
              <motion.div
                key={food.id}
                initial={{ opacity: 0, translateX: -50 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <MenuCard {...food} />
              </motion.div>
            ))
          )}
        </Tab.Panel>
        <Tab.Panel className="grid md:grid-cols-3 grid-cols-2 gap-4">
          {loading ? (
            <h1>load</h1>
          ) : (
            drinks.map((drink: MenuType, i: number) => (
              <motion.div
                key={drink.id}
                initial={{ opacity: 0, translateX: -50 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 0.2, delay: i * 0.1 }}
              >
                <MenuCard {...drink} />
              </motion.div>
            ))
          )}
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
export default Tabs;
