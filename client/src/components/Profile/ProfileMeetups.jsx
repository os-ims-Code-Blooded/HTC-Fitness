import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ProfileMeetups = (props) => {

  useEffect(() => {
    console.log(props.user)
  }, [])

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
      </Table>
    </TableContainer>
  )
}

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