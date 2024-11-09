import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { GiFireSilhouette, GiFireDash, GiFireFlower } from 'react-icons/gi';
import { SlFire } from 'react-icons/sl';

const SearchUsers = (props) => {
  const [users, setUsers] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    axios.get('/api/users')
      .then((response) => {

        // filter known friends to create an array of IDs
        const friendIDs = props.user.friends_list.map((user) => {
          return user.googleId;
        })

        const filteredData = response.data.filter((user) => {
          const alreadyFriend = friendIDs.includes(user.googleId);
          const isSelf = (props.user.googleId === user.googleId);

          if (!alreadyFriend && !isSelf){
            return true;
          }
        })

        setUsers(filteredData);
      })
      .catch((error) => {
        console.error('Error on request searching users, requesting all users.');
      });
  }, []);

  function addFriend(friend) {
    const newFriend = {
      googleId: friend.googleId,
      nameFirst: friend.nameFirst,
      nameLast: friend.nameLast,
      email: friend.email,
      goal_weight: friend.goal_weight,
      num_exercises: friend.saved_exercises ? friend.saved_exercises.length : 0,
      num_friends: friend.friends_list ? friend.friends_list.length : 0,
    };

    const existingFriends = props.user.friends_list.map((friend) => friend.googleId);

    if (existingFriends.includes(friend.googleId)) {
      console.error(`Refused Request :: User #${friend.googleId} is already a friend of user #${props.user.googleId}.`);
      return;
    }

    axios.post('/api/friends', { friend: newFriend })
      .then((response) => {
        props.fetchUser();
      })
      .catch((error) => {
        console.error('Error on request searching users, adding new friend.');
      });
  }

  function searchFilter(input) {
    if (input.length === 0) {
      axios.get('/api/users')
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error('Error on request searching users, requesting all users.');
        });
    }

    setQuery(input);

    // edge conditions; what if input is empty
    if (!input || input.length === 0) { return; }

    // make sure input is set to lowercase
    const searchQuery = input.toLowerCase();

    // filter all users to see if their name contains query
    const filteredByQuery = users.filter((user) => {
      const fullName = (`${user.nameFirst} ${user.nameLast}`).toLowerCase();
      return fullName.includes(searchQuery);
    });

    setUsers(filteredByQuery);
  }

  return (
    <div id="usersPage">
      <div id="searchUsers" style={{justifySelf: 'center', width: '20%', paddingTop: '32px', display:'flex', alignContent:'center'}}>
        <TextField value={query} label="Search" sx={{ backgroundColor: 'grey' }} variant="filled" onChange={(e) => searchFilter(e.target.value)}></TextField>
      </div>
      <div id="allUsersView" style={{
        paddingTop: '32px', justifyContent: 'center', justifySelf: 'center', width: '40%',
      }}>
        { users
          ? <List sx={{ bgcolor: '#1E1E1E', borderRadius: '4px' }}>
            {
              users.map((user, index) => (
                <div key={`${user.googleId}-${index}`}>
                <ListItem alignItems="flex-start" key={user.googleId}>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp">{props.switchIcon(user.displayBadge)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${user.nameFirst} ${user.nameLast}`}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: 'text.primary', display: 'inline' }}
                          >
                          {`${user.email}`}
                          <br></br>
                        </Typography>
                        {
                          `
                          Goal weight: ${user.goal_weight ? user.goal_weight : '---'} | 
                          Exercises: ${user.num_exercises ? user.num_exercises : 0} | 
                          Friends: ${user.num_friends ? user.num_friends : 0}
                          `
                        }
                      </React.Fragment>
                    }
                    />
                    <PersonAddAlt1Icon onClick={() => addFriend(user)} sx={{":hover": {color: 'cyan'}}}/>
                </ListItem>
                <Divider variant="middle" sx={{width: '90%'}}/>
                </div>
              ))
            }
          </List>
          : <></>
        }
      </div>
    </div>
  );
};

export default SearchUsers;