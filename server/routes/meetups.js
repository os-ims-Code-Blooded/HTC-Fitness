const express = require('express');
const { User, Meetups } = require('../db/index');

const router = express.Router();
/// //////////////////////////////////////////////////////////
router.get('/', async (req, res) => {
  try {
    const meetups = await Meetups.find({});
    // console.log('MEETUPS?', meetups);
    res.status(200)
      .send(meetups);
  } catch (err) {
    console.error('error during meetup get request', err);
    res.sendStatus(500);
  }
});
/// ///////////////////////////////////////////////////////////
router.post('/', async (req, res) => {
  const meetup = req.body;

  // console.log('REQ BODY - meetup', meetup);
  await User.findOneAndUpdate(
    { googleId: req.user.googleId },
    { $push: { meetups_list: meetup } },
    { new: true },
  );
  await Meetups.create(meetup);

  Meetups.find({})
    .then((data) => data)
    .catch((err) => console.error(err));
});
/// ///////////////////////////////////////////////////////////
router.put('/delete', async (req, res) => {

  Meetups.findByIdAndDelete(req.body)
    .then((data) => {
      if (!data) { res.sendStatus(404); }
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = router;
