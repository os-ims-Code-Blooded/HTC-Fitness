const mongoose = require('mongoose');
const { Exercise, User, Meetups } = require('./index');

mongoose.connect('mongodb://localhost:27017/HTC-Fitness');

const exercises = [
  {
    name: 'Push Ups',
    type: 'basic',
    muscle: 'forearms',
    equipment: 'none',
    difficulty: 'beginner',
    instructions: 'Place both palms on the ground, straighten back and legs, lower your body with your shoulders and then push up with your arms.',
  },
  {
    name: 'Sprinting',
    type: 'basic',
    muscle: 'legs',
    equipment: 'shoes',
    difficulty: 'beginner',
    instructions: 'Run as fast as you can for 100 yards, rest for 20 seconds, repeat.',
  },
  {
    name: 'Sit ups',
    type: 'basic',
    muscle: 'abdominal',
    equipment: 'none',
    difficulty: 'beginner',
    instructions: 'Sit on the floor and lay back, place the soles of your feet on the ground with your knees bent. Then push your body up without using your arms so that your face becomes even with your knees. Then lay back and repeat.',
  },
];

const users = [
  {
    googleId: '89347298239847',
    nameFirst: 'Michael',
    nameLast: 'Ruiz',
    email: 'example_email@gmail.com',
    goal_weight: 200,
    saved_exercises: exercises,
    numOfSavedExercises: 3,
    completedExercises: 3,
    friends_list: [
      {
        googleId: '76543219876543',
        nameFirst: 'Emily',
        nameLast: 'Johnson',
        email: 'emily.johnson@gmail.com',
        goal_weight: 150,
        num_exercises: 3,
        num_friends: 2
      },
      {
        googleId: '12345678901234',
        nameFirst: 'David',
        nameLast: 'Smith',
        email: 'david.smith@yahoo.com',
        goal_weight: 180,
        num_exercises: 3,
        num_friends: 2
      }
    ],
  },
  {
    googleId: '76543219876543',
    nameFirst: 'Emily',
    nameLast: 'Johnson',
    email: 'emily.johnson@gmail.com',
    goal_weight: 150,
    saved_exercises: exercises,
    numOfSavedExercises: 3,
    completedExercises: 3,
    friends_list: [
      {
        googleId: '12345678901234',
        nameFirst: 'David',
        nameLast: 'Smith',
        email: 'david.smith@yahoo.com',
        goal_weight: 180,
        num_exercises: 3,
        num_friends: 2
      }
    ],
  },
  {
    googleId: '12345678901234',
    nameFirst: 'David',
    nameLast: 'Smith',
    email: 'david.smith@yahoo.com',
    goal_weight: 180,
    saved_exercises: exercises,
    numOfSavedExercises: 3,
    completedExercises: 3,
    friends_list: [
      {
        googleId: '76543219876543',
        nameFirst: 'Emily',
        nameLast: 'Johnson',
        email: 'emily.johnson@gmail.com',
        goal_weight: 150,
        num_exercises: 3,
        num_friends: 2
      }
    ],
  },
  {
    googleId: '98765432109876',
    nameFirst: 'Sophia',
    nameLast: 'Martinez',
    email: 'sophia.martinez@hotmail.com',
    goal_weight: 140,
    saved_exercises: exercises,
    numOfSavedExercises: 3,
    completedExercises: 3,
    friends_list: [
      {
        googleId: '76543219876543',
        nameFirst: 'Emily',
        nameLast: 'Johnson',
        email: 'emily.johnson@gmail.com',
        goal_weight: 150,
        num_exercises: 3,
        num_friends: 2
      },
      {
        googleId: '12345678901234',
        nameFirst: 'David',
        nameLast: 'Smith',
        email: 'david.smith@yahoo.com',
        goal_weight: 180,
        num_exercises: 3,
        num_friends: 2
      }
    ],
  },
  {
    googleId: '24681012141618',
    nameFirst: 'James',
    nameLast: 'Garcia',
    email: 'james.garcia@outlook.com',
    goal_weight: 220,
    saved_exercises: exercises,
    numOfSavedExercises: 3,
    completedExercises: 3,
    friends_list: [
      {
        googleId: '76543219876543',
        nameFirst: 'Emily',
        nameLast: 'Johnson',
        email: 'emily.johnson@gmail.com',
        goal_weight: 150,
        num_exercises: 3,
        num_friends: 2
      },
      {
        googleId: '12345678901234',
        nameFirst: 'David',
        nameLast: 'Smith',
        email: 'david.smith@yahoo.com',
        goal_weight: 180,
        num_exercises: 3,
        num_friends: 2
      }
    ],
  },
  {
    googleId: '13579246801357',
    nameFirst: 'Olivia',
    nameLast: 'Wilson',
    email: 'olivia.wilson@gmail.com',
    goal_weight: 130,
    saved_exercises: exercises,
    numOfSavedExercises: 3,
    completedExercises: 3,
    friends_list: [
      {
        googleId: '76543219876543',
        nameFirst: 'Emily',
        nameLast: 'Johnson',
        email: 'emily.johnson@gmail.com',
        goal_weight: 150,
        num_exercises: 3,
        num_friends: 2
      },
      {
        googleId: '12345678901234',
        nameFirst: 'David',
        nameLast: 'Smith',
        email: 'david.smith@yahoo.com',
        goal_weight: 180,
        num_exercises: 3,
        num_friends: 2
      }
    ],
  },
  {
    googleId: '31415926535897',
    nameFirst: 'Liam',
    nameLast: 'Anderson',
    email: 'liam.anderson@yahoo.com',
    goal_weight: 175,
    saved_exercises: exercises,
    numOfSavedExercises: 3,
    completedExercises: 3,
    friends_list: [
      {
        googleId: '76543219876543',
        nameFirst: 'Emily',
        nameLast: 'Johnson',
        email: 'emily.johnson@gmail.com',
        goal_weight: 150,
        num_exercises: 3,
        num_friends: 2
      },
      {
        googleId: '12345678901234',
        nameFirst: 'David',
        nameLast: 'Smith',
        email: 'david.smith@yahoo.com',
        goal_weight: 180,
        num_exercises: 3,
        num_friends: 2
      }
    ],
  },
  {
    googleId: '27182818284590',
    nameFirst: 'Ava',
    nameLast: 'Taylor',
    email: 'ava.taylor@hotmail.com',
    goal_weight: 160,
    saved_exercises: exercises,
    numOfSavedExercises: 3,
    completedExercises: 3,
    friends_list: [
      {
        googleId: '76543219876543',
        nameFirst: 'Emily',
        nameLast: 'Johnson',
        email: 'emily.johnson@gmail.com',
        goal_weight: 150,
        num_exercises: 3,
        num_friends: 2
      },
      {
        googleId: '12345678901234',
        nameFirst: 'David',
        nameLast: 'Smith',
        email: 'david.smith@yahoo.com',
        goal_weight: 180,
        num_exercises: 3,
        num_friends: 2
      }
    ],
  },
  {
    googleId: '10111213141516',
    nameFirst: 'Noah',
    nameLast: 'Thomas',
    email: 'noah.thomas@outlook.com',
    goal_weight: 210,
    saved_exercises: exercises,
    numOfSavedExercises: 3,
    completedExercises: 3,
    friends_list: [
      {
        googleId: '76543219876543',
        nameFirst: 'Emily',
        nameLast: 'Johnson',
        email: 'emily.johnson@gmail.com',
        goal_weight: 150,
        num_exercises: 3,
        num_friends: 2
      },
      {
        googleId: '12345678901234',
        nameFirst: 'David',
        nameLast: 'Smith',
        email: 'david.smith@yahoo.com',
        goal_weight: 180,
        num_exercises: 3,
        num_friends: 2
      }
    ],
  },
  {
    googleId: '16171819202122',
    nameFirst: 'Isabella',
    nameLast: 'Moore',
    email: 'isabella.moore@gmail.com',
    goal_weight: 145,
    saved_exercises: exercises,
    numOfSavedExercises: 3,
    completedExercises: 3,
    friends_list: [
      {
        googleId: '76543219876543',
        nameFirst: 'Emily',
        nameLast: 'Johnson',
        email: 'emily.johnson@gmail.com',
        goal_weight: 150,
        num_exercises: 3,
        num_friends: 2
      },
      {
        googleId: '12345678901234',
        nameFirst: 'David',
        nameLast: 'Smith',
        email: 'david.smith@yahoo.com',
        goal_weight: 180,
        num_exercises: 3,
        num_friends: 2
      }
    ],
  },
  {
    googleId: '22232425262728',
    nameFirst: 'Ethan',
    nameLast: 'Jackson',
    email: 'ethan.jackson@yahoo.com',
    goal_weight: 195,
    saved_exercises: exercises,
    numOfSavedExercises: 3,
    completedExercises: 3,
    friends_list: [
      {
        googleId: '76543219876543',
        nameFirst: 'Emily',
        nameLast: 'Johnson',
        email: 'emily.johnson@gmail.com',
        goal_weight: 150,
        num_exercises: 3,
        num_friends: 2
      },
      {
        googleId: '12345678901234',
        nameFirst: 'David',
        nameLast: 'Smith',
        email: 'david.smith@yahoo.com',
        goal_weight: 180,
        num_exercises: 3,
        num_friends: 2
      }
    ],
  }  
]

const meetups = [
  {
    host: '76543219876543',
    meetupName: `Emily's Get-Together`,
    meetupDate: `11/08/2024`,
    meetupLocation: `Slidell Park`,
    routine: exercises,
    attendees: users.slice(4, 8),
  },
  {
    host: '89347298239847',
    meetupName: `Michael's Gym Meet-up`,
    meetupDate: `12/24/2024`,
    meetupLocation: `Cross Gates Fitness`,
    routine: exercises,
    attendees: users.slice(0, 4),
  },
  {
    host: '89347298239847',
    meetupName: `Michael's Competition`,
    meetupDate: `02/09/2025`,
    meetupLocation: `Hyperbolic Time Chamber`,
    routine: exercises,
    attendees: users,
  }
]

// users.forEach((user) => {
//   user.meetups_list = meetups;
// })

mongoose.connection.on('open', async () => {

  try {
    await Meetups.insertMany(meetups)
    console.log(`Meetups added successfully.`)
    await User.insertMany(users);
    console.log(`Users added successfully.`)
    mongoose.connection.close();
  } catch (error) {
    console.error(`Failure to seed database: `, error);
    mongoose.connection.close();
  }
} )