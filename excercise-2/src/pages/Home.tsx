import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useHistory } from 'react-router-dom';
import { Box, Button, Stack, Avatar, Pagination } from '@mui/material/';

import TableItem from '../components/TableItem';

import IRocket from '../../types/IRocket';
import Header from '../components/Header';
import optionalRocket from '../assets/optionalRocket.png';

type RocketState = {
  totalPage: number;
  rockets: [IRocket];
};

const Home = () => {
  const [page, setPage] = useState(1);
  const [rockets, setRockets] = useState<RocketState>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const history = useHistory();

  const onButtonClick = (id: string) => {
    history.push(`/rockets/${id}`);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const fetchRockets = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/rockets?page=${page}&limit=2`);
      setLoading(false);
      setRockets(res.data);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchRockets();
  }, [page]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error</p>;
  }
  const TableHeader = ['Image', 'Name', 'Height', 'Mass', 'Description'];
  const TableValues = rockets?.rockets.map((rocket) => {
    return [
      <Avatar
        style={{ alignSelf: 'center' }}
        alt='image of rocket'
        src={rocket?.photo ? rocket.photo : optionalRocket}
      />,
      rocket?.name,
      rocket?.height,
      rocket?.mass,
      <Button variant='contained' onClick={() => onButtonClick(rocket._id)}>
        Rocket Detail
      </Button>,
    ];
  });
  return (
    <Box
      display='flex'
      alignItems='center'
      flexDirection='column'
      height='100vh'
    >
      <Header />
      <TableItem tableHeader={TableHeader} tableValues={TableValues} />
      <Stack spacing={2} marginTop='60px'>
        <Pagination
          page={page}
          count={rockets?.totalPage}
          onChange={handlePageChange}
        />{' '}
      </Stack>
    </Box>
  );
};

export default Home;
