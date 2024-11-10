/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Select } from '@mui/material';

// mui components
import { Box } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { styled } from '@mui/material/styles';

import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';

// delete icon for meetup entries
import FriendSelect from './FriendSelect.jsx';
import MeetupTable from './MeetupsTable.jsx';

const MeetBox = styled(Box)`
background-image: url("https://i.imgur.com/UHtnNpg.png");
background-size: cover;

`;

const SubmitButt = styled(Button)`
background-color: #5e5e5e;
color: #bbbbbb;
`;

/// ////////////////////////////////////////////////////////////////////////////////////////////////

const Meetups = (props) => {
  const [value, setValue] = useState(null);
  const [meetupName, setMeetupName] = useState('');
  const [location, setLocation] = useState('');
  const [attendees, setAttendees] = useState([]);
  const [submitAttendees, setSubmitAttendees] = useState([]);

  /// /////////////////////////////////////////////////////////////////////////////////////////////

  const handleCreate = () => {
    if (value !== null && meetupName.length) {
      let date = value.$d;
      date = date.toString().split(':').slice(0, 2).join(':');

      axios.post('/api/meetups', {
        host: props.user.googleId,
        meetupName,
        routine: props.user.saved_exercises,
        meetupLocation: location,
        meetupDate: date,
        attendees: submitAttendees,
      });

      const updateMeetupResponse = async () => {
        const meetupResponse = await axios.get('/api/meetups');
        props.setMeetups(meetupResponse.data.meetups);
      };

      updateMeetupResponse();
    }
    setAttendees([]);
    setSubmitAttendees([]);
  };
  /// ///////////////////////////////////////////////////
  const handleNameChange = (e) => {
    setMeetupName(e.target.value);
  };
  /// /////////////////////////////////////////////////
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };
  /// //////////////////////////////////////////////////
  const selectRef = React.useRef(null);
  /// ///////////////////////////////////////////////////////
  React.useEffect(() => {
    if (selectRef.current) {
      const scrollbarWidth = getScrollbarWidth(selectRef.current);
      // Use the scrollbar width as needed
    }
  }, [selectRef]);

  function getScrollbarWidth(element) {
    const scrollbarWidth = element.offsetWidth - element.clientWidth;
    return scrollbarWidth;
  }
  /// ///////////////////////////////////////////////////
  return (
    <MeetBox sx={{ padding: '15px' }}>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>

      <h1 style={ { color: 'orange', textAlign: 'center', paddingLeft: '20px' } }>MEETUPS</h1>

    </Box>

{/* ///////////////////////////////////////////////////////////////////// */}

{/* ///////////////////////////////////////////////////////////////////// */}
    <Box sx={{ display: 'flex', alignItems: 'center', padding: '15px' }}>

      <TextField value={meetupName} label="Meetup Name" sx={ { backgroundColor: 'grey' } } variant="filled" onChange={(e) => handleNameChange(e)}></TextField>
      <div style={{ padding: '15px' }}></div>
      <TextField value={location} label="Location" sx={ { backgroundColor: 'grey' } } variant="filled" onChange={(e) => handleLocationChange(e)}></TextField>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer sx={ { transform: 'scale(.75)' } } components={['DateTimePicker']}>
          <DateTimePicker
          value={value}
          onChange={ (newValue) => setValue(newValue) }
          sx={ { background: 'grey' } }
          />

        </DemoContainer>
      </LocalizationProvider>
{/* ////////////////////////////////////////////////////////////////////// */}
        <div style={{ padding: '15px' }}></div>
        <>
      <FriendSelect
      ref={selectRef}
      submitAttendees={submitAttendees}
      setSubmitAttendees={setSubmitAttendees}
      attendees={attendees}
      setAttendees={setAttendees}
      friends={props.user.friends_list}
      sx={{ backgroundColor: 'grey' }}
      />
      </>
      <div style={{ padding: '15px' }}></div>
{/* /////////////////////////////////////////////////////////////////////// */}
      < SubmitButt sx={{
        backgroundColor: '#5e5e5e',
        color: '#bbbbbb',
        '&:hover': { color: 'rgba(0, 0, 0, 0.4)' },
      }}
        onClick={handleCreate}
        >Create Meetup</SubmitButt>
    </Box>
{/* /////////////////////////////////////////////////////////////////////// */}

      <MeetupTable
      meetups={props.meetups}
      setMeetups={props.setMeetups}
      user={props.user}
      attendees={attendees}
      setAttendees={setAttendees}
      />
      <br></br>
      <Box sx={{ height: '' }}></Box>

    </MeetBox>
  );
};
export default Meetups;
