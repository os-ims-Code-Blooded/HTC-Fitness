import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { GiFireSilhouette, GiFireDash, GiFireFlower, GiFireRay, GiFist } from 'react-icons/gi';

import { SlFire } from 'react-icons/sl';
import axios from 'axios';

import NavBar from './NavBar.jsx';
import HomePage from './HomePage.jsx';
import Goals from './Goals.jsx';
import Routines from './Routines.jsx';
import Login from './Login.jsx';
import Badges from './Badges.jsx';
import Profile from './Profile/Profile.jsx';
import SearchUsers from './Users.jsx';
import Meetups from './Meetups/Meetups.jsx';


const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: 'white',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
    },
  },
});

const App = () => {
  // detect user color preference
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = prefersDarkMode ? darkTheme : lightTheme;

  const [exercises, setExercises] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [meetups, setMeetups] = useState([])
  //dynamically render badges for user throughout app
  const switchIcon = (achievementName) => {
    switch (achievementName) {
      case 'Fitness Master':
        return (<GiFireDash size={50} />);
      case 'Fitness God':
        return (<GiFireSilhouette size={50} />);
      case 'Exercise Saver':
        return (<GiFireFlower size={50} />);
      case 'Competitor':
        return (<GiFireRay size={50} />);
      case 'Friendly':
        return (<GiFist size={50} />);
      default:
        return (<SlFire size={50} />);
    }
  };

  // fetch updated user data
  const fetchUser = async () => {

    try {
      // send a request to check if user needs a badge
      await axios.get('/api/badges/badgeCheck');
      const userData = await axios.get('/me');
      await axios.patch('/api/friends', {friends_list: userData.data.friends_list})

      setUserProfile(userData.data)
    } catch (error) {
        console.error('Error fetching user data');
    }
  };

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {

        const response = await axios.get('/api/check-auth');
        const meetupResponse = await axios.get('/api/meetups');
        setIsAuthenticated(response.data.isAuthenticated);

        setMeetups(meetupResponse.data.meetups)
        // Fetch user profile if authenticated
        if (response.data.isAuthenticated) {
          const profileResponse = await axios.get('/me');
          fetchUser(profileResponse.data);

        } else {
          setUserProfile(null);
        }
      } catch (error) {
        setIsAuthenticated(false);
        throw new Error('Error checking auth', error);
      }
    };
    checkAuth();
  }, []);


  const fetchRandomExercises = async (endpoint = '/api/exercises') => {
    try {
      const response = await axios.get(endpoint);
      const shuffleData = response.data.sort(() => 0.5 - Math.random());
      const selectExercises = shuffleData.slice(0, 3);
      setExercises(selectExercises);
    } catch (error) {
      console.error('Error Fetching');
    }
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          {isAuthenticated && <NavBar setIsAuthenticated={setIsAuthenticated} />}
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
            <Route path="/" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <HomePage
                  user={userProfile}
                  exercises={exercises}
                  fetchRandomExercises={fetchRandomExercises}
                  switchIcon={switchIcon}
                />
              </ProtectedRoute>
            } />
            <Route path="/routines" element={
              <ProtectedRoute>
                <Routines savedExercises={userProfile?.saved_exercises || []} userId={userProfile?._id} user={userProfile} fetchUser={fetchUser} />
              </ProtectedRoute>
            } />
            <Route path="/goals" element={
              <ProtectedRoute>
                <Goals user={userProfile} fetchUser={fetchUser}/>
              </ProtectedRoute>
            } />
            <Route path="/badges" element={
              <ProtectedRoute>
                <Badges user={userProfile} fetchUser={fetchUser} switchIcon={switchIcon}/>
              </ProtectedRoute>
            } />
            <Route path="/search/users" element={
              <ProtectedRoute>
                <SearchUsers user={userProfile} fetchUser={fetchUser} switchIcon={switchIcon}/>
              </ProtectedRoute>
            } />
            <Route path="/meetups" element={
              <ProtectedRoute>
                <Meetups meetups={meetups} setMeetups={setMeetups} user={userProfile}/>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile user={userProfile} meetups={meetups} fetchUser={fetchUser} switchIcon={switchIcon}/>
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </ThemeProvider>
    </LocalizationProvider>

  );
};

export default App;

