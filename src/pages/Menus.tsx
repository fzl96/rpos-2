/* eslint-disable react-hooks/exhaustive-deps */
import Tabs from '@/components/tabs';
import AddButton from '@/components/ui/add-btn';
import PageTitle from '@/components/ui/page-title';
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

function Menus() {
  const [, setOpen]: any = useOutletContext();

  useEffect(() => {
    document.title = 'POS - Menus';
    setOpen(false);
  }, []);

  return (
    <>
      <PageTitle title="Menu" />
      <div className="mt-5 md:mb-5">
        <Tabs />
      </div>
      <AddButton toolTipTitle="Add Menu" navigateTo="/menus/add" />
    </>
  );
}
export default Menus;
