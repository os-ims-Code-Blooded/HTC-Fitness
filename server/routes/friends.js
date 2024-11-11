const express = require('express');
const { User, Friends } = require('../db/index');
const router = express.Router();

router.get('/', (req, res) => {

  Friends.find({googleId: req.user.googleId})
    .then((friendsFound) => {

      if (!friendsFound){ res.sendStatus(404)};
      res.status(200).send(friendsFound); // if error then maybe {friends: friendsFound}
    })
    .catch((error) => {
      console.error(`Error search for friends associated with #${req.user.googleId}.`)
      res.sendStatus(500);
    })

})

router.post('/', async (req, res) => {

  try{

    const newFriend = {
      googleId: req.user.googleId,
      friendId: req.body.friendId
    }
  
    await Friends.create(newFriend)

    const userFound = await User.findOne({googleId: req.user.googleId})

    if (userFound) {
      userFound.numOfFriends++;
      await userFound.save();
      res.sendStatus(201);
    } else {
      res.sendStatus(404);
    }

  } catch(error) {    
    console.error(`Error on create friend association for user #${req.user.googleId}.`)
    res.sendStatus(500);
  }

})

router.delete('/:id', async (req, res) => {
  
  try {

    const filter = {
      googleId: req.user.googleId,
      friendId: req.params.id
    }
  
    await Friends.findOneAndDelete(filter)

    const userFound = await User.findOne({googleId: req.user.googleId})

    if (userFound) {
      userFound.numOfFriends--;
      await userFound.save();
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }

  } catch(error) {
      
      console.error(`Error on remove friend association #${req.params.id} for user #${req.user.googleId}.`)
      res.sendStatus(500);      
  }


})

router.patch('/:id', async (req, res) => {

  try {

    const filter = {
      googleId: req.user.googleId,
      friendId: req.params.id
    }

    const findFriend = await Friends.find(filter);
    findFriend.favorite = !findFriend.favorite;
    await findFriend.save();
    res.sendStatus(201);

  } catch (error) {

    console.error(`Error on set favorite friend #${req.params.id} for user #${req.user.googleId}.`)
    res.sendStatus(500);

  }
    

})

module.exports = router;