/* eslint-disable import/extensions */
// eslint-disable-next-line import/order
import SidebarNav from '@/components/sidebar-nav';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { CgClose, CgMenuLeftAlt } from 'react-icons/cg';
import { Navigate, Outlet } from 'react-router-dom';
import Loaders from './components/ui/loading-icon';
import { useAuth } from './context/AuthContext';

interface Props {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Shell({ children, open, setOpen }: Props) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loaders />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="lg:hidden fixed bg-white w-full p-5 z-10">
        <button
          type="submit"
          className="text-3xl"
          onClick={() => setOpen(true)}
        >
          <CgMenuLeftAlt />
        </button>
      </div>
      <motion.div
        animate={open ? 'open' : 'closed'}
        className={`lg:w-96 w-full fixed lg:left-0 ${
          open ? 'left-0' : 'left-full'
        } h-screen bg-white border-r-[1.5px] border-[#D1D5DB] z-10`}
      >
        <div className="right-0 lg:hidden p-5">
          <button
            type="submit"
            className="text-2xl"
            onClick={() => setOpen(false)}
          >
            <CgClose />
          </button>
        </div>

        <SidebarNav />
      </motion.div>

      <div className="bg-white lg:ml-96 min-h-screen lg:pb-0 md:pb-0 lg:py-[3rem] py-20 lg:px-20  px-6">
        {children}
      </div>
    </>
  );
}

function Layout() {
  const [open, setOpen] = useState(false);
  return (
    <Shell open={open} setOpen={setOpen}>
      <Outlet context={[open, setOpen]} />
    </Shell>
  );
}
export default Layout;
