import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const BasicProfileInfo = (props) => (
    <TableContainer component={Paper}>
      <Table sx={{ width: 480 }} aria-label="simple table">
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

export default BasicProfileInfo;
