import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&: hover fieldset': {
      borderColor: 'white',
    },
    '& input': {
      color: 'white',
    },
  },
});

const NavBar = ({ setIsAuthenticated }) => {
  const [searchInput, setSearchInput] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const isRoutines = location.pathname === '/routines';

  const handleSearch = () => {
    setSearchInput('');
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLogout = () => {
    axios.post('/logout')
      .then(() => {
        setIsAuthenticated(false);
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error logging out', error);
      });
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1A237E' }}>
      <Toolbar>
        <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
          HTC Fitness
        </Typography>
        {/* Render search bar only on routines page */}
        {isRoutines && (
          <Box sx={{ alignItems: 'center' }}>
            <CustomTextField
              variant="outlined"
              placeholder="Exercises..."
              size="small"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
              onKeyDown={handleEnter}
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              color="white"
              sx={{ height: '40px', backgroundColor: '#0D1C61' }}
              >
              Search
            </Button>
          </Box>
        )}
        <Box>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/routines">Routines</Button>
          <Button color="inherit" component={Link} to="/goals">Goals</Button>
          <Button color="inherit" component={Link} to="/badges">Badges</Button>
          <Button color="inherit" component={Link} to="/meetups">Meetups</Button>
          <Button color="inherit" component={Link} to="/search/users">Users</Button>
          <Button color="inherit" component={Link} to="/profile">Profile</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
