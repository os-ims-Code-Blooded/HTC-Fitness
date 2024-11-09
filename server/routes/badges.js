const express = require('express');
const { User } = require('../db/index');

const router = express.Router();

// function to add badge
const addBadge = async (user, badge) => {
  try {
    const existingUser = await User.findOne({ googleId: user.googleId });
    if (!existingUser) {
      console.error('Failed to find user');
    }

    existingUser.badges.push(badge);
    await existingUser.save();
  } catch (err) {
    console.error('Failed to add badge');
    throw err;
  }
};

// handler to add badge
router.post('/addBadge', async (req, res) => {
  const { badge, user } = req.body;
  try {
    await addBadge(user, badge);
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
});

// handler to check if user needs a badge
router.get('/badgeCheck', async (req, res) => {
  const { user } = req;
  const
    {
      badges, saved_exercises, completedExercises, friends_list, meetups_list,
    } = user;
  const badgeNames = badges.map((badge) => badge.name);

  try {
    // check if user has a new user badge
    if (!badgeNames.includes('New User')) {
      await addBadge(user, {
        name: 'New User',
        description: 'User account is created',
        earnedAt: new Date(),
        icon: 'SlFire',
      });
    }
    // check if user has a fitness master badge
    if (completedExercises >= 10 && !badgeNames.includes('Fitness Master')) {
      await addBadge(user, {
        name: 'Fitness Master',
        description: 'User has completed 10 exercises',
        earnedAt: new Date(),
        icon: 'GiFireDash',
      });
    }
    if (completedExercises >= 20 && !badgeNames.includes('Fitness God')) {
      await addBadge(user, {
        name: 'Fitness God',
        description: 'User has completed 10 exercises',
        earnedAt: new Date(),
        icon: 'GiFireSilhouette',
      });
    }
    // check if user has an exercise saver badge
    if (saved_exercises.length >= 10 && !badgeNames.includes('Exercise Saver')) {
      await addBadge(user, {
        name: 'Exercise Saver',
        description: 'User has saved 10 exercises',
        earnedAt: new Date(),
        icon: 'GiFireFlower',
      });
    }
    if (friends_list.length > 0 && !badgeNames.includes('Friendly')) {
      await addBadge(user, {
        name: 'Friendly',
        description: 'User has added a friend',
        earnedAt: new Date(),
        icon: 'GiFist',
      });
    }
    if (meetups_list.length > 0 && !badgeNames.includes('Competitor')) {
      await addBadge(user, {
        name: 'Competitor',
        description: 'User has hosted a meetup',
        earnedAt: new Date(),
        icon: 'GiFireRay',
      });
    }
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.patch('/displayBadge/:id', async (req, res) => {
  const newBadge = req.params.id;
  try {
    const user = await User.find({ googleId: req.user.googleId });
    if (!user) {
      res.sendStatus(404);
    } else {
      const updatedUser = await User.findOneAndUpdate(
        { googleId: req.user.googleId },
        { displayBadge: newBadge },
        { new: true },
      );
      res.status(201).json(updatedUser);
    }
  } catch (err) {
    res.sendStatus(500);
  }
});

router.patch('/reset/:userId', (req, res) => {
  const { userId } = req.params;
  console.log('userId', userId);
  User.findOneAndUpdate(
    { googleId: userId },
    {
      $set: {
        badges: [],
        numOfSavedExercises: 0,
        completedExercises: 0,
      },
    },
    { new: true },
  )
    .then((user) => {
      console.log('resetUser', user);
      if (!user) {
        res.sendStatus(404);
      } else {
        res.sendStatus(201);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = router;
