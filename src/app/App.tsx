import {Outlet} from 'react-router-dom';
import {Box} from '@mui/material';
import {Nav} from "../components/nav";


export const App = () => {
  return (
    <Box sx={{maxWidth: 800, margin: '30px auto'}}>
      <Nav/>
      <Outlet/>
    </Box>
  )
};
