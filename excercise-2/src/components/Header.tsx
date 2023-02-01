import { Box, Typography } from '@mui/material/';
import RocketImg from '../assets/rocket.png';

const Header = () => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexWrap='wrap'
      mt='20px'
      mb='60px'
    >
      <img
        style={{ width: '150px', height: '150px' }}
        alt='rocket'
        src={RocketImg}
      />
      <Typography ml={5} variant='h1'>
        Rockets
      </Typography>
    </Box>
  );
};

export default Header;
