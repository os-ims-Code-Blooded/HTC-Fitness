import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchUsers = (props) => {

  const [users, setUsers] = useState(null);

  useEffect(() => {
    axios.get('/api/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(`Error on request searching users, requesting all users.`)
      })
  }, [])

  function addFriend(friend){

    const newFriend = {
      googleId: friend.googleId,
      nameFirst: friend.nameFirst,
      nameLast: friend.nameLast,
      email: friend.email,
      goal_weight: friend.goal_weight,
      num_exercises: friend.saved_exercises.length,
      num_friends: friend.friends_list.length
    }

    console.log(`Adding new friend: `, newFriend)

    const existingFriends = props.user.friends_list.map((friend) => {
      return friend.googleId;
    })

    if (existingFriends.includes(friend.googleId)){
      console.error(`Refused Request :: User #${friend.googleId} is already a friend of user #${props.user.googleId}.`)
      return;
    }

    axios.post(`/api/friends`, {friend: newFriend})
      .then((response) => {
        props.fetchUser();
      })
      .catch((error) => {
        console.error(`Error on request searching users, adding new friend.`)
      })

  }

  return (
    <div id="searchUsers">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Goal Weight</th>
            <th>Recent Weight</th>
            <th>Number of Exercises</th>
            <th>Number of Friends</th>
          </tr>
        </thead>
        <tbody>
          { users ?
            users.map( (user) => {
              return (
                <tr key={user.googleId}>
                  <td>{user.nameFirst} {user.nameLast}</td>
                  <td>{user.email}</td>
                  { user.goal_weight ?
                    <td>{user.goal_weight}</td>
                    :
                    <td>N/A</td>
                  }
                  { user.weights.length > 0 ?
                    <td>{user.weights[user.weights.length - 1].weight}</td>
                    :
                    <td>N/A</td>
                  }                  
                  <td>{user.saved_exercises.length}</td>
                  <td>{user.friends_list.length}</td>
                  <td><button type='button' onClick={() => addFriend(user)}>Add Friend</button></td>
                </tr>
              )
            })
            :
            <tr>
              <td>No users could be found.</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default SearchUsers;

/*
  googleId: { type: String, required: true, unique: true },
  nameFirst: String,
  nameLast: String,
  email: String,
  goal_weight: Number,
  weights: [weightSchema],
  saved_exercises: [SavedExerciseSchema],
  friends_list: [friendsSchema],
*/