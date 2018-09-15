# Currently in heavy development with breaking changes all the time

# If you want to contribute or ask questions, I created a Discord channel

https://discord.gg/28Gjv7S

A server boilerplate is made with:

- Typescript
- Apollo Server
  - Great organization of schema/resolvers
- Google Cloud Platform
  - AppEngine
  - Stackdriver
  - Cloud Storage (coming soon...)
  - Cloud Functions (coming soon...)
- Firebase
  - Firestore
  - Firebase Authentication

## Installation

1. Clone project

```
git clone https://github.com/MyiWorlds/backend.git
```

2. cd into folder

```
cd backend
```

3. Download dependencies

```
npm install
```

4. Create a Firebase project and enable Firestore
5. Go into Google Cloud Platform and enable:

- Stackdriver
- others?

6. Download your Google Cloud Serivice key https://cloud.google.com/iam/docs/creating-managing-service-account-keys
7. Place it in the root of your project. In this case inside ./backend
8. Rename the file it gave you to `service-key.json`
   ----Your done------

Now to start the server and have it restart when you make changes, cd into the project directory and type into the command line.

```
npm run watch
```

You can now navigate to `http://localhost:4000` to use GraphQL Playground to query your GraphQL api.
Or move onto setting up the frontend to this project where you can start building a real application here:
https://github.com/MyiWorlds/frontend

This project was started off the combination of two YouTubers work. If you are not subscribed and have not watched their tutorials, please do. They are absolutely fantastic!

- Ben Awad
  Youtube Playlist: https://www.youtube.com/playlist?list=PLN3n1USn4xlltIGRInnlHtsOdvHIUQFHL
  Project Code: https://github.com/benawad/graphql-ts-server-boilerplate

- AngularFirebase
  Video with Firestore/Google Cloud AppEngine/Typescript/Apollo-server:
  https://youtu.be/8D9XnnjFGMs
  Project code: https://github.com/arjunyel/firestore-apollo-graphql
