# HTC-Fitness-Legacy
  Hyperbolic Time Chamber Fitness is an application meant to help users find exercises that work for them and their body. HTC Fitness allows users to set and track goals while using their own custom routines to improve their health. The ultimate goal for HTC is for everyone who uses it, to create a healthier and happier life-style.

  The legacy additions include a social networking system that allows users to connect with one-another, create meetups, and earn badge rewards for fitness achievements.

# Node Version
  Node version 22 is used for this repo.

# How to Setup
  ## Keys Needed
    - API Ninjas - Exercises
    - Google Oauth Client ID and SECRET
    - A randomly generated Session Secret (We used node's crypto module)
  ## Don't forget to make a .env file to store any environment variables based from our .env.example
  ## Don't forget to start mongo before you start the server

  ## [npm run dev] will start the server on port 3000 and bundle the components together
  ## [npm run seed] is for providing sample data if so desired

# Features
  ## Google Login to Make User Profiles

  ## Nav Bar
    - Provides routes to the different features' pages
    - Provides a way to logout as a user

  ## Home Page
    - Buttons to fetch different exercises
    - Exercise cards that provide information on them
      - Button to add exercises to a user's saved routines

  ## Goals Page
    - A way for users to see their progress
    - Users can set/remove a goal weight
    - Users can add weights, either for the current day, or for a day they may have missed
    - A chart that updates with the user's data as it's added

  ## Routines Page
    - Any exercises saved can have reps and sets added to them

  ## Profile Page
    - Displays a users's account information
    - Shows any meetups a user is inlcuded in
    - Contains list of user's friends

  ## Users Page
    - Displays all accounts in the database
    - Can search for names in user list
    - Users can add friends to their account


  ## Badges Page
    - Displays all badges a user can earn
    - Shows user's progress towards earning each badge
    - User can change the badge displayed on their account
    - User can delete all progress

  ## Meetups Page
    - Can create meetups with name, location, and date
    - Meetup host can invite friends
    - Can view meetup, time/location, saved exercise routine sets and reps, and invitees
    - Can delete meetup

# Tech Stack
  - Api: API Ninjas [Docs](https://api-ninjas.com/api/exercises)
  - Frontend: React [Docs](https://react.dev/)
  - Backend: Express [Docs](https://expressjs.com/en/4x/api.html)
  - Build: Webpack [Config Docs](https://webpack.js.org/configuration/)
  - Database: MongoDB & Mongoose [Docs](https://mongoosejs.com/)
  - Deployment: AWS [Make An Account Here](https://aws.amazon.com/free/?gclid=Cj0KCQjw8--2BhCHARIsAF_w1gxqy2n-xVXx_xy7dM4sYBu7QCjL7IfB_oLIrqY4XcT9CJ9VAIbVKbIaAlnlEALw_wcB&trk=7541ebd3-552d-4f98-9357-b542436aa66c&sc_channel=ps&ef_id=Cj0KCQjw8--2BhCHARIsAF_w1gxqy2n-xVXx_xy7dM4sYBu7QCjL7IfB_oLIrqY4XcT9CJ9VAIbVKbIaAlnlEALw_wcB:G:s&s_kwcid=AL!4422!3!651751058796!e!!g!!aws%20console!19852662149!145019243977&all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all)
  - Auth: Passport [Docs](https://www.passportjs.org/tutorials/google/)
  - Styling: Material UI [Component Docs](https://mui.com/), [Chart Docs](https://mui.com/x/react-charts/)
  - Environment Variables: dotenv [Docs](https://www.npmjs.com/package/dotenv)

# Known Bugs
  - Navigated pages do not render after the browser page refreshes.

# Contributors
  - Adonijah Johnson Jr [Github](https://github.com/AJ-Gamer)
  - Dakota Day [Github](https://github.com/Mothroom)
  
# Legacy Contributors
  - Jeremy Hernandez [Github](https://github.com/jhernandez504)
  - Ben Long [Github](https://github.com/benlongcp)
  - Justin Sandrock [Github](https://github.com/sandrockjustin)