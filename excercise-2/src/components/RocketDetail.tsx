import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';

import Header from './Header';
import IRocket from '../../types/IRocket';
import optionalRocket from '../assets/optionalRocket.png';

type RocketDetailParams = {
  id: string;
};

const RocketDetail = () => {
  const { id } = useParams<RocketDetailParams>();
  const [rocket, setRockets] = useState<IRocket>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchRocket = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/rockets/${id}`);
      setLoading(false);
      setRockets(res.data);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchRocket();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error</p>;
  }

  return (
    <Box>
      <Header />
      <Box
        mt='40px'
        display='flex'
        flexWrap='wrap'
        justifyContent='center'
        alignItems='center'
        // border='2px solid red'
      >
        <img
          style={{
            minWidth: '200px',
            maxWidth: '400px',
            maxHeight: '400px',
            minHeight: '200px',
          }}
          alt='rocket'
          src={rocket?.photo ? rocket.photo : optionalRocket}
        />
        <Box ml='40px' sx={{ mt: '20px' }}>
          <div>
            <Typography fontWeight='bold'>Name:</Typography>
          </div>
          <p>{rocket?.name}</p>
          <div>
            <Typography fontWeight='bold'>Height:</Typography>
          </div>
          <p>{rocket?.height} m</p>
          <div>
            <Typography fontWeight='bold'>Diameter:</Typography>
          </div>
          <p>{rocket?.diameter} cm</p>
          <div>
            <Typography fontWeight='bold'>Mass:</Typography>
          </div>
          <p>{rocket?.mass} Kg</p>
          <div>
            <Typography fontWeight='bold'>Description:</Typography>
          </div>
          <p>{rocket?.description}</p>
        </Box>
      </Box>
    </Box>
  );
};

export default RocketDetail;
