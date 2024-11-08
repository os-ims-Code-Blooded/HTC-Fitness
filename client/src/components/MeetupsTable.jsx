import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// delete icon for meetup entries
import ClearIcon from '@mui/icons-material/Clear';

const MeetupTable = (props) => {
/// ////////////////////////////////////////////////////////////////

  const handleDelete = (e) => {

    axios.put('/api/meetups/delete', props.meetups[e])
      .catch((err) => {
        console.error(err);
      });
    props.setMeetups(props.meetups.filter((meetup) => meetup._id !== props.meetups[e]._id));
  };
  /// ////////////////////////////////////////////////////////////
  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Meetup Name</TableCell>
          <TableCell align="right">Date/Time</TableCell>
          <TableCell align="right">Location</TableCell>
          <TableCell align="right">Routine</TableCell>
          <TableCell align="right">Host</TableCell>
          <TableCell align="right">Attendees</TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.meetups.map((meetup, i) => (

          <TableRow key={meetup.meetupName + meetup.meetupDate}>
            <TableCell component="th" scope="row">
              {meetup.meetupName}
            </TableCell>
            <TableCell align="right">{meetup.meetupDate}</TableCell>
            <TableCell align="right">{meetup.meetupLocation}</TableCell>
            <TableCell align="right">Doing {meetup.routine.length} exercises</TableCell>

            <TableCell align="right">{`${props.user.friends_list[0].nameFirst} ${props.user.friends_list[0].nameLast}`}</TableCell>

            <TableCell align="right">{`${props.user.friends_list[0].nameFirst} ${props.user.friends_list[0].nameLast}`}</TableCell>

            <TableCell align="right">
              <ClearIcon sx={{ paddingTop: '10px', '&:hover': { color: 'rgba(200, 75, 75, .8)' } }} onClick={() => handleDelete(i)}/>
            </TableCell>
          </TableRow>

        ))}

      </TableBody>
    </Table>
  </TableContainer>
  );
};

export default MeetupTable;
