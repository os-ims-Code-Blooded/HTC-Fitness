
# HTC-Fitness-Legacy
  Hyperbolic Time Chamber Fitness is an application meant to help users find exercises that work for them and their body. HTC Fitness allows users to set and track goals while using their own custom routines to improve their health. The ultimate goal for HTC is for everyone who uses it, to create a healthier and happier life-style.

  The legacy additions include a social networking system that allows users to connect with one-another, create meetups, and earn badge rewards for fitness achievements.

# Node Version
  Node version 22 is used for this repo.

# Installation

1. Perform an `npm install` to download dependencies for this project.

2. Acquire API keys for the following resources and store in your `env` file:
    - API_NINJA_KEY: https://www.api-ninjas.com/api/exercises
  
3. Acquire a Google Client ID, Google Client Secret, and setup Google OAuth within Google Cloud Console. If you aren't familiar with this process, here is relevant [documentation](https://developers.google.com/identity/protocols/oauth2). Ensure that you store this information in your `env` file.
    - GOOGLE_CLIENT_ID: From Google Cloud Console.
    - GOOGLE_CLIENT_SECRET: From Google Cloud Console.
    - SESSION_SECRET: Whatever secret you would like Express to use.

4. Under the `OAuth Consent Screen` register your email, as well as other team member emails, as test users. If this isn't done, then you will be refused at the entry point to the application.

5. Once you have registered an `OAuth Consent Screen`, ensure that the `OAuth 2.0 Client IDs` is setup correctly. Ensure that the website is declared as an Authorized Javascript Origin and that you specify Authorized Redirect URIs as necessary.

6. If necessary, update the `auth.js` Passport strategy as necessary. You shouldn't need to update many parts of this if your `env` file has been setup correctly. An example of how your strategy should be setup is provided [here](https://www.passportjs.org/packages/passport-google-oauth20/). An example for how your .env file should be setup is included below.

```js
NODE_ENV=development
API_KEY='111111111111111111111111111111111111111111111'
GOOGLE_CLIENT_ID='11111111111111111111111111.apps.googleusercontent.com'
GOOGLE_CLIENT_SECRET='HAKSOW-11111111111111111111111111'
SESSION_SECRET='shhhhhh'
CLIENT_URL='http://localhost'
PORT=3000
```

# Startup

There exist several scripts for use within this project; the primary scripts that you will need for development are `npm start`, `npm run build:dev`, `npm run build:client`, and possibly `npm run dev`. We attempted to repair the `npm run seed` script and the `npm run purge` script, but we were unable to accomplish this within time constraints.  

```js
  "start": "nodemon ./server",
  "build:client": "webpack --mode production",
  "build:dev": "webpack --mode development --watch",
  "dev": "concurrently \"npm run build:dev\" \"npm start\" ",
  "seed": "node ./server/db/seed.js",
  "purge": "node ./server/db/purge.js"
```

# How It Works

## Frameworks, Libraries, Packages, & Plugins

|      Client      |      Server      |     Database     |           Miscellaneous          |
| ---------------- | ---------------- | ---------------- | -------------------------------- |
| React & React-DOM| Node.js          | MongoDB          | Mongoose / find-or-create plugin |
| MaterialUI       | Express          | Mongoose         | Babel & Babel Loader             |
| Axios            | Passport         |                  | Express / express-session        |
| Webpack          | Google OAuth 2.0 |                  | dotenv                           |
| React Router DOM | Webpack          |                  | eslint                           |
|                  | Nodemon          |                  | MaterialUI                       |
|                  |                  |                  | AWS (Deployment)                 |

### Client

The client is built with Webpack (+Babel) in order to transpile and bundle our components. The client itself uses React's client-side routing to control the views that are rendered to the page, and the client retrieves information from the server by using Axios.

### Server

The `server/index.js` expects for all sensitive information to be stored in the process environment; **never** store our secrets or API keys within a public config file. This would open our website to malign actors and it risks exposing user information that is intended to remain private. Inside of

### Database

Our database is built with MongoDB / Mongoose in the `server/db/index.js` file. This file initializes and implements seven schemas in total: `userSchema`, `meetupSchema`, `friendsSchema`, `SavedExerciseSchema`, `weightSchema`, `exerciseSchema`, and `badgeSchema`. The primary schema which is used throughout the application is the `userSchema`, which serves as a SSoT (single source of truth) and relates to all other schemas and database models.

## Entry to Application & Authentication
1. The entry point to our application is a landing page with a button for Google Sign-in; this button redirects to a login and authentication handled by Passport with the Google OAuth 2.0 strategy. Navigation to routes within our server are prohibited if you have not or cannot be authenticated with this strategy.

2. Once a user logs in with the Google Sign-In, their user information is found (or initialized as empty) within our database. The database used for this project is called `HTC-Fitness`. After the user is successfully created, subsequent requests will use a `req.user.googleId` property (created by Passport) to perform CRUD operations for that respective user.

3. The main application view is handled by React Router. On requests for a new view, React Router serves the user with a new view as long as the end-user has been authenticated by Passport. 

## Features (Revised) for Application End-Users

1. **Navigation Bar**
    - Provides routes to the different features' pages
    - Provides a way to logout as a user

2. **Home Page**
    - Buttons to fetch different exercises
    - Exercise cards that provide information on them
      - Button to add exercises to a user's saved routines

3. **Goals Page**
    - A way for users to see their progress
    - Users can set/remove a goal weight
    - Users can add weights, either for the current day, or for a day they may have missed
    - A chart that updates with the user's data as it's added

4. **Routines Page**
    - Any exercises saved can have reps and sets added to them
    - Any exercises can be marked as completed

5. **Badges Page**
    - User can earn badges for their activity on our site
    - User can view their badges at this page
    - User can select a badge to be their display icon

6. **Meetups Page**
    - User can create a new meetup for a specific date-time
    - User can designate attendees for the meetup, based on current friends
    - User can implement their current exercises, and associate them with meetup

7. **Users Page**
    - User can search for other users (user and current friends are auto-excluded)
    - User can search by username (filters out non-matches)
    - User can add users to their friends list

8. **Profile Page**
    - User can view their current profile information
    - User can view their current friends list, and remove friends
    - User can view current meetups

# Known Bugs
  - Navigated pages do not render after the browser page refreshes. Comment from OS-IMS Code-Blooded (inheritors) this is most likely due to the fact that React Router is overlapping with endpoints provided in Express.

# Contributors
  - Adonijah Johnson Jr [Github](https://github.com/AJ-Gamer)
  - Dakota Day [Github](https://github.com/Mothroom)
  
# Legacy Contributors
  - Jeremy Hernandez [Github](https://github.com/jhernandez504)
  - Ben Long [Github](https://github.com/benlongcp)
  - Justin Sandrock [Github](https://github.com/sandrockjustin)

