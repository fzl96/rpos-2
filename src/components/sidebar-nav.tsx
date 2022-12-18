/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
import { signOut } from 'firebase/auth';
import { motion } from 'framer-motion';
import { BiLogOut } from 'react-icons/bi';
import {
  MdLocalDining,
  MdShoppingCart,
  MdSpaceDashboard,
} from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';

export interface NavItem {
  title: string;
  icon: React.ReactNode;
  path: string;
  end: boolean;
}

export const sidebarItem: NavItem[] = [
  {
    title: 'Dashboard',
    icon: <MdSpaceDashboard />,
    path: '/',
    end: true,
  },
  {
    title: 'Pesanan',
    icon: <MdShoppingCart />,
    path: '/orders',
    end: false,
  },
  {
    title: 'Daftar Menu',
    icon: <MdLocalDining />,
    path: '/menus',
    end: false,
  },
];

function SidebarNav() {
  const navigate = useNavigate();

  const navLinkClass =
    'flex items-center font-medium gap-4 px-8 py-3 rounded-lg ';

  const logout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      signOut(auth);
      navigate('/login');
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
      console.log(err);
    }
  };

  return (
    <ul className="flex flex-col h-full px-[5.5rem] lg:pt-[8rem] lg:pb-20 pb-[10rem] pt-5">
      {sidebarItem.map((item) => (
        <motion.li
          key={item.title}
          className="mb-2 text-[#5f6368]"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
        >
          <NavLink
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              isActive
                ? `${navLinkClass}bg-[#111827] text-white`
                : `${navLinkClass}hover:bg-gray-100`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-base">{item.title}</span>
          </NavLink>
        </motion.li>
      ))}
      <li className="last:mt-auto">
        <button type="submit" className={`${navLinkClass}`} onClick={logout}>
          <span className="text-xl">
            <BiLogOut />
          </span>
          <span className="text-base">Logout</span>
        </button>
      </li>
    </ul>
  );
}
export default SidebarNav;
