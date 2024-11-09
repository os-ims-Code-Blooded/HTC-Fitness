import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ProfileMeetups = (props) => {
  const [profileMeetups, setProfileMeetups] = useState([]);

  useEffect(() => {
    if (!props.meetups || props.meetups.length === 0) {
      console.error('Error in profile meetups; no meetups provided.');
      return;
    }

    // filter through the array of meetup objects
    const subbedMeetups = props.meetups.filter((meetup) =>
      // for every meetup, filter for only meetups that are associated with user
      meetup.attendees.map((attendee) => attendee.googleId).includes(props.user.googleId));

    // filter for meetups that the user is hosting
    const hostMeetups = props.meetups.filter((meetup) => meetup.host === props.user.googleId);
    setProfileMeetups([...subbedMeetups, ...hostMeetups]);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
      <TableHead>
          <TableRow>
            <TableCell>Event Name</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Exercises for Event</TableCell>
            <TableCell align="right">Number of Attendees</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        { profileMeetups.length > 0
          ? <>
          { profileMeetups.map((meetup) => (
              <TableRow
                key={`${meetup.host}-${meetup.meetupName}-${meetup.meetupDate}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {meetup.meetupName}
                </TableCell>
                <TableCell align="right">{meetup.meetupLocation}</TableCell>
                <TableCell align="right">{meetup.meetupDate}</TableCell>
                <TableCell align="right">{meetup.routine.length}</TableCell>
                <TableCell align="right">{meetup.attendees.length}</TableCell>
              </TableRow>
          ))
          }
          </>
          : <></>
        }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProfileMeetups;

/*
        <TableBody>
        {props.user.meetups_list.map((meetup) => (
            <TableRow
              key={meetup._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {meetup.meetupName}
              </TableCell>
              <TableCell align="right">{meetup.meetupLocation}</TableCell>
              <TableCell align="right">{meetup.meetupDate}</TableCell>
              <TableCell align="right">{meetup.routine.length}</TableCell>
              <TableCell align="right">{meetup.attendees.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
*/
