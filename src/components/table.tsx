import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';
import { useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { useOrder } from '../context/OrderContext';
import MyModal from './ui/modal';

interface RowsType {
  id: string;
  type: string;
  table: number;
  date: Date;
  total: number;
}

export default function Table({ rows }: { rows: RowsType[] }) {
  const { deleteOrders } = useOrder();
  const [selected, setSelected] = useState<any>([]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID Pesanan', width: 200 },
    { field: 'type', headerName: 'Tipe', width: 100 },
    {
      field: 'table',
      headerName: 'Meja',
      type: 'number',
      width: 50,
    },
    { field: 'date', headerName: 'Tanggal', width: 100 },
    { field: 'time', headerName: 'Jam', width: 70 },
    {
      field: 'total',
      headerName: 'Total',
      type: 'number',
      width: 150,
    },
    {
      field: 'action',
      headerName: 'Aksi',
      width: 100,
      renderCell: (params) => {
        return <MyModal id={params.row.id} />;
      },
    },
    {
      field: 'delete',
      width: 50,
      sortable: false,
      disableColumnMenu: true,
      renderHeader: () => {
        const handleClick = async () => {
          if (selected.length === 0) return;
          if (confirm('Hapus menu ini ??') && selected.length > 0) {
            await deleteOrders(selected);
          }
        };
        return (
          <button className="text-center text-lg" onClick={handleClick}>
            <BiTrash />
          </button>
        );
      },
    },
  ];

  return (
    <div style={{ height: 400, width: '100%', border: 'none' }}>
      <DataGrid
        onSelectionModelChange={(ids) => setSelected(ids)}
        className="border-none"
        rows={rows.map((row) => ({
          ...row,
          time: format(new Date(row.date), 'HH:mm'),
          date: format(new Date(row.date), 'dd/MM/yyyy'),
          total: new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
          }).format(row.total),
        }))}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
