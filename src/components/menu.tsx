import { useMenu } from '@/context/MenuContext';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

const ITEM_HEIGHT = 48;

export default function LongMenu({ id }: { id: string }) {
  const { deleteMenu } = useMenu();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    // confirm
    // eslint-disable-next-line no-alert, no-restricted-globals
    if (confirm('Hapus menu ini ??') && id) {
      deleteMenu(id);
      setAnchorEl(null);
    }
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <span className="text-base text-black">
          <BsThreeDotsVertical />
        </span>
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
            borderRadius: '0.5rem',
            padding: '0 0.5rem',
          },
        }}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
}
