const express = require('express');
const { User } = require('../db/index');
const router = express.Router();

router.get('/', (req, res) => {

  User.find({googleId: req.user.googleId})
    .then((foundUser) => {
      if (!foundUser){
        res.sendStatus(404);
        return;
      }

      res.status(200).send(foundUser.friends_list)
    })
    .catch((error) => {
      console.error(`Error on GET request to /api/friends.`)
      res.sendStatus(500);
    })

})

router.post('/', (req, res) => {
  User.findOneAndUpdate({googleId: req.user.googleId}, {$push: {friends_list: req.body.friend}})
    .then((foundUser) => {
      if (!foundUser){
        res.sendStatus(404);
        return;
      }

      res.sendStatus(201);
    })
    .catch((error) => {
      console.error(`Error on POST request to /api/friends.`)
      res.sendStatus(500);
    })
})

router.delete('/:id', (req, res) => {
  User.findOneAndUpdate({googleId: req.user.googleId}, {$pull: {friends_list: {googleId: req.params.id}}})
    .then((foundUser) => {
      if (!foundUser){
        res.sendStatus(404);
        return;
      }

      res.status(200).send(foundUser)
    })
    .catch((error) => {
      console.error(`Error on DELETE request to /api/friends.`, error)
      res.sendStatus(500);
    })
})

router.patch('/', async (req, res) => {

  try {

    // make an array of only googleIds ['123123123123', '234234324234', '5435435341233467']
    const outdatedFriends = req.body.friends_list.map((friend) => {
      return friend.googleId
    })

    // find the current user that we are trying to update friends for
    const foundUser = await User.findOneAndUpdate({googleId: req.user.googleId})

    // find all users, filter by seeing if they exist as a friend for current user
    const updatedFriends = (await User.find({})).filter((user) => {
      return outdatedFriends.includes(user.googleId);
    })

    foundUser.friends_list = updatedFriends;
    await foundUser.save();
    res.sendStatus(200);

  } catch (error) {
    console.error(`Error on patching user friends, updating items.`, error)
    res.sendStatus(500);
  }

})

module.exports = router;