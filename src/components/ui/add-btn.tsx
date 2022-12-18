import { IconButton, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

interface Props {
  toolTipTitle: string;
  navigateTo: string;
}

function AddButton({ toolTipTitle, navigateTo }: Props) {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-10 md:right-20 right-10">
      <Tooltip title={toolTipTitle} placement="left" arrow>
        <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
          <IconButton
            sx={{
              backgroundColor: '#111827',
              color: '#fff',
              padding: '0.75rem',
              '&:hover': {
                backgroundColor: '#111827',
                color: '#fff',
              },
            }}
            onClick={() => navigate(navigateTo)}
          >
            <HiOutlinePlusSm />
          </IconButton>
        </motion.div>
      </Tooltip>
    </div>
  );
}

export default AddButton;
