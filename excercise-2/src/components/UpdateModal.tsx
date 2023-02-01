import { FC, useState, useEffect } from 'react';
import { Modal, TextField, Box, Typography, Grid, Button } from '@mui/material';
import axios from '../api/axios';

import IRocket from '../../types/IRocket';

type UpdateModalProps = {
  open: boolean;
  id: string;
  rocket: IRocket | undefined;
  handleClose: () => void;
};

const UpdateModal: FC<UpdateModalProps> = ({
  open,
  id,
  handleClose,
  rocket,
}) => {
  const onClose = () => {
    handleClose();
  };

  const initialState = {
    _id: id,
    name: '',
    description: '',
    mass: 0,
    height: 0,
    diameter: 0,
    photo: '',
  };

  const [currentRocket, setCurrentRocket] = useState(initialState);

  const { name, description, mass, height, diameter, photo } = currentRocket;

  const submitable = !(
    name &&
    description &&
    mass > 0 &&
    height > 0 &&
    diameter > 0
  );

  useEffect(() => {
    if (rocket) {
      setCurrentRocket({
        ...rocket,
        photo: rocket?.photo ? rocket.photo : ' ',
      });
    }
  }, [rocket]);


  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === 'height' || name === 'mass' || name === 'diameter') {
      setCurrentRocket({
        ...currentRocket,
        [name]: parseInt(value),
      });
    } else {
      setCurrentRocket({ ...currentRocket, [name]: value });
    }
  };

  const handleSubmit = async () => {

    try {
      const res = axios.put(
        '/rockets/',
        { ...currentRocket, id: currentRocket?._id },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setCurrentRocket({
        _id: id,
        name: '',
        description: '',
        mass: 0,
        height: 0,
        diameter: 0,
        photo: '',
      });
      handleClose();
    }
  };

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
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography variant='h5'>Edit Rocket</Typography>
        <Grid
          justifyContent='center'
          alignItems='center'
          mt='10px'
          container
          spacing={2}
        >
          <Grid item xs={6}>
            <TextField
              onChange={handleChange}
              name='name'
              value={currentRocket?.name}
              id='outlined-basic'
              label='Name'
              variant='outlined'
              error={name.length === 0}
              helperText={name.length === 0 ? 'Name is required' : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              onChange={handleChange}
              name='description'
              value={currentRocket?.description}
              id='outlined-basic'
              label='Description'
              variant='outlined'
              error={description.length === 0}
              helperText={
                description.length === 0 ? 'Description is required' : ''
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              onChange={handleChange}
              name='height'
              value={currentRocket?.height}
              id='outlined-basic'
              label='Height(m)'
              variant='outlined'
              type='number'
              error={height <= 0}
              helperText={height <= 0 ? 'Height must be greater than 0' : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              onChange={handleChange}
              name='mass'
              value={currentRocket?.mass}
              id='outlined-basic'
              label='Mass(Kg)'
              variant='outlined'
              type='number'
              error={mass <= 0}
              helperText={mass <= 0 ? 'Mass must be greater than 0' : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              onChange={handleChange}
              name='diameter'
              value={currentRocket?.diameter}
              id='outlined-basic'
              label='Diameter(cm)'
              variant='outlined'
              type='number'
              error={diameter <= 0}
              helperText={
                diameter <= 0 ? 'Diameter must be greater than 0' : ''
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              onChange={handleChange}
              name='photo'
              value={currentRocket?.photo}
              id='outlined-basic'
              label='Image'
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              disabled={submitable}
              type='submit'
              variant='contained'
              onClick={handleSubmit}
            >
              Update rocket
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default UpdateModal;
