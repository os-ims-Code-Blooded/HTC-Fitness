const mongoose = require('mongoose');

// Badge schema
const badgeSchema = new mongoose.Schema({
  name: String,
  description: String,
  earnedAt: Date,
  icon: String,
});

// Exercise schema
const exerciseSchema = new mongoose.Schema({
  name: String,
  type: String,
  muscle: String,
  equipment: String,
  difficulty: String,
  instructions: String,
});

const weightSchema = new mongoose.Schema({
  weight: Number,
  date: Date,
});

const SavedExerciseSchema = new mongoose.Schema({
  name: String,
  type: String,
  muscle: String,
  equipment: String,
  difficulty: String,
  instructions: String,
  completedStatus: { type: Boolean, default: false },
  sets: { type: Number, default: null },
  reps: { type: Number, default: null },
});

const friendsSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  friendId: { type: String, required: true },
  favorite: { type: Boolean, required: false, default: false}
});

const meetupSchema = new mongoose.Schema({
  host: String,
  meetupName: String,
  meetupDate: String,
  meetupLocation: String,
  routine: Array,
  attendees: Array,
});

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  nameFirst: String,
  nameLast: String,
  email: String,
  goal_weight: Number,
  badges: [badgeSchema],
  displayBadge: { type: String, default: 'mdiFaceManShimmer' },
  weights: [weightSchema],
  saved_exercises: [SavedExerciseSchema],
  numOfSavedExercises: { type: Number, default: 0 },
  completedExercises: { type: Number, default: 0 },
  meetups_list: Array
});

const Meetups = mongoose.model('Meetups', meetupSchema);
const Exercise = mongoose.model('Exercise', exerciseSchema);
const User = mongoose.model('User', userSchema);
const Badge = mongoose.model('Badge', badgeSchema);
const Friends = mongoose.model('Friends', friendsSchema);


module.exports = { Exercise, User, Meetups, Badge, Friends };