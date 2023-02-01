import { FC, useState } from 'react';
import { Modal, TextField, Box, Grid, Typography, Button } from '@mui/material';
import axios from '../api/axios';

type CreateModalProps = {
  open: boolean;

  handleClose: () => void;
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
  display: 'flex',
  flexDirection: 'column',
  //   alignItems: 'center',
};
const CreateRocketModal: FC<CreateModalProps> = ({ open, handleClose }) => {
  const [rocketData, setRocketData] = useState({
    name: '',
    description: '',
    mass: 0,
    height: 0,
    diameter: 0,
    photo: '',
  });

  const { name, description, mass, height, diameter, photo } = rocketData;

  const submitable = !(
    name &&
    description &&
    mass > 0 &&
    height > 0 &&
    diameter > 0
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === 'height' || name === 'mass' || name === 'diameter') {
      setRocketData({ ...rocketData, [name]: parseInt(value) });
    } else {
      setRocketData({ ...rocketData, [name]: value });
    }
  };

  const onClose = () => {
    handleClose();
  };

  const handleSubmit = async () => {

    try {
      const res = axios.post('/rockets/', rocketData, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      console.log('response status is: ', res);
    } catch (error) {
      console.log(error);
    } finally {
      setRocketData({
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

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography variant='h5'>Add New Rocket</Typography>
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
              value={name}
              required
              id='outlined-required'
              label='Name'
              error={name.length === 0}
              helperText={name.length === 0 ? 'Name is required' : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              onChange={handleChange}
              id='outlined-multiline-static'
              label='Description'
              multiline
              rows={4}
              name='description'
              value={description}
              error={description.length === 0}
              helperText={
                description.length === 0 ? 'Description is required' : ''
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              onChange={handleChange}
              id='outlined-number'
              label='Height(m)'
              type='number'
              InputLabelProps={{
                shrink: true,
              }}
              name='height'
              value={height}
              error={height <= 0}
              helperText={height <= 0 ? 'Height must be greater than 0' : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              onChange={handleChange}
              id='outlined-number'
              label='Mass(Kg)'
              type='number'
              InputLabelProps={{
                shrink: true,
              }}
              name='mass'
              value={mass}
              error={mass <= 0}
              helperText={mass <= 0 ? 'Mass must be greater than 0' : ''}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              onChange={handleChange}
              id='outlined-number'
              label='Diameter(cm)'
              type='number'
              InputLabelProps={{
                shrink: true,
              }}
              name='diameter'
              value={diameter}
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
              value={photo}
              required
              id='outlined-required'
              label='Image(url)'
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              disabled={submitable}
              type='submit'
              variant='contained'
              onClick={handleSubmit}
            >
              Create rocket
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default CreateRocketModal;
