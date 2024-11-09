import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// delete icon for meetup entries
import ClearIcon from '@mui/icons-material/Clear';

const MeetupTable = ({ meetups, setMeetups, user }) => {
/// ////////////////////////////////////////////////////////////////
  // console.log('Table , ;
  const handleDelete = (e) => {
    console.log('target meetup', meetups[e]);

    axios.put('/api/meetups/delete', meetups[e])
      .then((data) => console.log('PUT DATA', data))
      .catch((err) => {
        console.error(err);
      });
    setMeetups(meetups.filter((meetup) => meetup._id !== meetups[e]._id));
  };
  /// ////////////////////////////////////////////////////////////
  return (
    <TableContainer component={Paper}>
          {/* {console.log("MEETUP TABLE MEETUPs", meetups)} */}
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Meetup Name</TableCell>
          <TableCell align="right"><h3>Date/Time</h3></TableCell>
          <TableCell align="right"><h3>Location</h3></TableCell>
          <TableCell align="center" sx={{ paddingLeft: '100px' }}><h3>Routine</h3></TableCell>
          <TableCell align="right"><h3>Host</h3></TableCell>
          <TableCell align="right"><h3>Attendees</h3></TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {meetups.map((meetup, i) => (

          <TableRow key={meetup.meetupName + meetup.meetupDate}>
            <TableCell component="th" scope="row">
              {meetup.meetupName}
            </TableCell>
            <TableCell align="right">{meetup.meetupDate}</TableCell>
            <TableCell align="right">{meetup.meetupLocation}</TableCell>

            <TableCell align="right">

            <Accordion sx={{ float: 'right' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                view exercises
              </AccordionSummary>
              <AccordionDetails>
                {
                  meetup.routine.map((exercise, indx) => (
                    <p key={indx}>
                      {user.saved_exercises[indx].sets ? user.saved_exercises[indx].sets : 'N/A'} sets
                      of {user.saved_exercises[indx].reps ? user.saved_exercises[indx].reps : 'N/A'} {exercise.name}
                    </p>
                  ))
                }
              </AccordionDetails>
            </Accordion>

              </TableCell>

            <TableCell align="right">{`${user.nameFirst} ${user.nameLast}`}</TableCell>

            <TableCell align="right">

              {
              meetup.attendees.map((attendee, ind, array) => (
                      <p key={`${attendee.googleId}${array.meetupName}${ind}`}>{`${attendee.nameFirst} ${attendee.nameLast}`}</p>
              ))

              }

            </TableCell>

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
