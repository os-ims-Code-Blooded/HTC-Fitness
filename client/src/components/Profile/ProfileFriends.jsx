import React from "react";
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

const ProfileFriends = (props) => {

  return (
    <div className="profileFriends" style={{ width: 480, paddingTop: "32px"}}>
      <span style={{paddingBottom: "8px"}}>Your Friends</span>
      { props.user.friends_list && props.user.friends_list.length > 0 ?
        <List sx={{ width: '100%', width: 480, bgcolor: '#1E1E1E', borderRadius: '4px'}}>
          { 
            props.user.friends_list.map((friend, index) => (
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
                        sx={{ color: 'text.primary', display: 'inline'}}
                        >
                        {`${friend.email}`}
                        <br></br>
                      </Typography>
                      {
                        `
                        Goal weight: ${friend.goal_weight ? friend.goal_weight : '---'} | 
                        Exercises: ${friend.num_exercises ? friend.num_exercises : 0} | 
                        Friends: ${friend.num_friends ? friend.num_friends : 0}
                        `
                      }
                    </React.Fragment>
                  }
                  />
                <PersonRemoveIcon onClick={() => props.removeFriend(friend.googleId)} sx={{":hover": {color: 'red'}}}/>
                <Divider variant="middle"/>
              </ListItem>
            ))
          }
        </List>
        :
        <div>
          You have not added any friends.
        </div> 
      }
    </div>   
  )
}

export default ProfileFriends;