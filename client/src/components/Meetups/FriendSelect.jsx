import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
/// /////////////////////////////////////////////////////
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

/// ////////////////////////////////////////////////////

export default function FriendSelect(props) {
  console.log('PROPS.FRIENDS', props.friends);
  const friends = props.friends.map((friend) => friend);
  // console.log('FRIENDS TO SELECT', friends);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    const newAttendees = props.friends.filter((friend) => {
      const isSelected = `${friend.nameFirst} ${friend.nameLast}`;

      return event.target.value.includes(isSelected);
    });

    // console.log("Value", value)
    // console.log('Current Attendees', newAttendees);
    props.setAttendees(
      typeof value === 'string' ? props.attendees.concat(...value) : value,
    );
    props.setSubmitAttendees(newAttendees);
  };

  /// ///////////////////////////////////////////////////////////
  return (
    <Box sx={{ minWidth: 200, backgroundColor: 'grey' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Friends</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={handleChange}
          multiple

          value={props.attendees}

          input={<OutlinedInput label="Tag" />}

          renderValue={(selected) => selected.join(', ')}

          MenuProps={MenuProps}
        >
        {
          friends.map((friend, i) => (

            <MenuItem key={i} value={`${friend.nameFirst} ${friend.nameLast}`}>
              <Checkbox checked={props.attendees.includes(`${friend.nameFirst} ${friend.nameLast}`)} />
              <ListItemText primary={`${friend.nameFirst} ${friend.nameLast}`}/>
            {/* {console.log('FRIEND', `${friend.nameFirst} ${friend.nameLast}`)} */}

            </MenuItem>

          ))
        }
        </Select>

      </FormControl>
    </Box>
  );
}
