import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Box, Button, Stack, Pagination } from '@mui/material/';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import Header from '../components/Header';
import UpdateModal from '../components/UpdateModal';
import CreateRocketModal from '../components/CreateRocketModal';
import DeleteRocketModal from '../components/DeleteRocketModal';
import TableItem from '../components/TableItem';
import IRocket from '../../types/IRocket';
import optionalRocket from '../assets/optionalRocket.png';

type RocketState = {
  totalPage: number;
  rockets: [IRocket];
};
const Admin = () => {
  const [page, setPage] = useState(1);
  const [updateModal, setUpdateModal] = useState(false);
  const [updateRowId, setUpdateRowId] = useState('');
  const [deleteRowId, setDeleteRowId] = useState('');
  const [updateRowDetail, setUpdateRowDetail] = useState<IRocket | undefined>();
  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [rockets, setRockets] = useState<RocketState>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const history = useHistory();

  const fetchRockets = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8000/rockets?page=${page}&limit=2`
      );
      setLoading(false);
      setRockets(res.data);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  useEffect(() => {
    fetchRockets();
  }, [page]);

  const onButtonClick = (id: string) => {
    history.push(`/rockets/${id}`);
  };

  const onCreateRocketClick = () => {
    setCreateModal(true);
  };

  const onUpdateClick = (id: string, rocket: IRocket) => {
    setUpdateModal(true);
    setUpdateRowId(id);
    setUpdateRowDetail(rocket);
  };

  const onDeleteClick = async (id: string) => {
    setDeleteModal(true);
    setDeleteRowId(id);
  };

  const onDeleteConfirm = async (id: string) => {
    try {
      const res = await axios.delete(`http://localhost:8000/rockets/${id}`, {
        headers: {
          Accept: 'application/json',
        },
      });
      console.log('response status is: ', res.status);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error</p>;
  }

  const TableHeader = [
    'Image',
    'Name',
    'Height',
    'Mass',
    'Description',
    'Update',
    'Delete',
  ];
  const TableValues = rockets?.rockets.map((rocket) => {
    return [
      <img
        style={{
          maxWidth: '50px',
          width: '50px',
          height: '50px',
          maxHeight: '50px',
          borderRadius: '50%',
        }}
        alt='rocket'
        src={rocket?.photo ? rocket.photo : optionalRocket}
      />,
      rocket?.name,
      rocket?.height,
      rocket?.mass,
      <Button variant='contained' onClick={() => onButtonClick(rocket._id)}>
        Rocket Detail
      </Button>,
      <Button
        color='secondary'
        variant='contained'
        onClick={() => onUpdateClick(rocket._id, rocket)}
      >
        Update
      </Button>,
      <Button
        color='error'
        variant='contained'
        startIcon={<DeleteIcon />}
        onClick={() => onDeleteClick(rocket._id)}
      >
        Delete
      </Button>,
    ];
  });

  const closeUpdateModal = () => {
    setUpdateModal(false);
  };

  const closeCreateModal = () => {
    setCreateModal(false);
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  return (
    <Box
      display='flex'
      alignItems='center'
      flexDirection='column'
      height='100vh'
    >
      <Header />
      <Box width='90%'>
        <Button
          onClick={onCreateRocketClick}
          startIcon={<AddIcon />}
          variant='outlined'
        >
          Create Rocket
        </Button>
      </Box>
      <CreateRocketModal open={createModal} handleClose={closeCreateModal} />
      <UpdateModal
        open={updateModal}
        id={updateRowId}
        handleClose={closeUpdateModal}
        rocket={updateRowDetail}
      />
      <DeleteRocketModal
        open={deleteModal}
        id={deleteRowId}
        handleClose={closeDeleteModal}
        onDeleteConfirm={onDeleteConfirm}
      />
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

export default Admin;
