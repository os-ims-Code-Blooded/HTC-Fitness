import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { GiFireSilhouette, GiFireDash, GiFireFlower } from 'react-icons/gi';
import { SlFire } from 'react-icons/sl';
import axios from 'axios';

const ProfileFriends = (props) => {

  const [localFriends, setLocalFriends] = useState([]);

  const fetchFriends = () => {
    axios.get(`/api/friends`)
    .then((friendsList) => {

      // makes an array of only friendIds
      if (friendsList.data.length !== 0){
        const friendIdList = friendsList.data.map((friend) => {
          return friend.friendId;
        })

        axios.get(`/api/users`)
          .then((allUsers) => {
            setLocalFriends(
              allUsers.data.filter((user) => {
                return friendIdList.includes(user.googleId);
              })
            );
          })
          .catch((error) => {
            console.error(`Error on request for all users during friends retrieval.`, error)
          })
      } else {
        setFriends([]);
      }

    })
    .catch((error) => {
      console.error(`Error retrieving simple friends list.`, error)
    })
  }

  useEffect(() => {
    fetchFriends();
    console.log(`fuck`)
  }, [])

  return (
    <div className="profileFriends" style={{ width: 480, paddingTop: '32px' }}>
      <span style={{ paddingBottom: '8px' }}>Your Friends</span>
      { localFriends && localFriends.length > 0
        ? <List sx={{
          width: '100%', width: 480, bgcolor: '#1E1E1E', borderRadius: '4px',
        }}>
          {
            localFriends.map((friend, index) => (
              <div key={`${friend.googleId}-${index}`}>
              <ListItem alignItems="flex-start" key={friend.googleId}>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp">{props.switchIcon(friend.displayBadge)}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${friend.nameFirst} ${friend.nameLast}`}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: 'text.primary', display: 'inline' }}
                        >
                        {`${friend.email}`}
                        <br></br>
                      </Typography>
                      {
                        `
                        Goal weight: ${friend.goal_weight ? friend.goal_weight : '---'} | 
                        Exercises: ${friend.numOfSavedExercises ? friend.numOfSavedExercises : 0} | 
                        Friends: ${friend.numOfFriends ? friend.numOfFriends : 0}
                        `
                      }
                    </React.Fragment>
                  }
                  />
                <PersonRemoveIcon onClick={() => props.removeFriend(friend.googleId)} sx={{ ':hover': { color: 'red' } }}/>
                <Divider variant="middle"/>
              </ListItem>
              <Divider variant="middle" sx={{width: '90%'}}/>
              </div>              
            ))
          }
        </List>
        : <div>
          You have not added any friends.
        </div>
      }
    </div>
  )
};

export default ProfileFriends;
