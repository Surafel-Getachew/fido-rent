import { FC, useState, useEffect } from 'react';
import { Modal, Button, Box, Typography } from '@mui/material';

type DeleteModalProps = {
  open: boolean;
  id: string;
  handleClose: () => void;
  onDeleteConfirm: (id: string) => void;
};
const DeleteRocketModal: FC<DeleteModalProps> = ({
  open,
  id,
  handleClose,
  onDeleteConfirm,
}) => {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const onClose = () => {
    handleClose();
  };
  const handleDelete = () => {
    onDeleteConfirm(id);
    onClose();
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography>Are you sure you want to delete rocket?</Typography>
        <Box mt='20px'>
          <Button color='secondary' variant='contained' onClick={handleClose}>
            No
          </Button>
          <Button
            style={{ marginLeft: '10px' }}
            color='error'
            variant='contained'
            // startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Yes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteRocketModal;
