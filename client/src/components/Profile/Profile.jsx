import React, { useState, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import axios from 'axios';

import BasicProfileInfo from './BasicProfileInfo.jsx';
import ProfileFriends from './ProfileFriends.jsx';

const Profile = (props) => {

  useEffect(() => {
    axios.get('/api/friends')
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(`Error on request in profile, requesting friends.`)
      })
  }, [])

  function removeFriend(id){
    axios.delete(`/api/friends/${id}`)
      .then((response) => {
        console.log(response)
        props.fetchUser();
      })
      .catch((error) => {
        console.error(`Error on delete request in profile, removing friend #${id}.`)
      })
  }

  return (
    <div id="profilePage" style={{width: 544, padding: "32px"}}>
      { props.user ?
        <div id="profileInfo-container">
          <div id="basicInfo" style={{maxWidth: 480}}>
            <span style={{paddingBottom: "8px"}}>Your Account</span>
            <BasicProfileInfo user={props.user}/>
          </div>
          <div id="friendsDisplay" style={{display: "flex", maxWidth: 520}}>
            <ProfileFriends user={props.user} removeFriend={removeFriend}/>
          </div>
        </div>
        :
        <div>
          401; user is not authenticated.
        </div>        
      }
    </div>
  )

}

export default Profile;

/*
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Account Information</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">Account ID</TableCell>
              <TableCell align="right">#{props.user.googleId}</TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">Name</TableCell>
              <TableCell align="right">{props.user.nameFirst} {props.user.nameLast}</TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">Recovery Email</TableCell>
              <TableCell align="right">{props.user.email}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
*/