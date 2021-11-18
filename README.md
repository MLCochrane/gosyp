# Gosyp.io
<!-- ![stronghold logo](img/stronghold-logo-left.png) -->

<!-- [![Downloads](http://pepy.tech/badge/stronghold)](http://pepy.tech/count/stronghold) -->

gosyp is a simple web-based chat app that doesn't retain any user data. Built with Node, Express, socket.io and React, it was made as a way to explore new technologies, tools and techniquies.

## **Installation Options**
We're currently using docker and docker compose to spin up our development environment. Should go without saying that you will need to have docker and bit of knowledge of the tool to use this. Tips for getting started at [docker.com](https://www.docker.com/get-started). We're using 3 containers: 1 for mongodb, 1 for server, 1 for web server.
```bash
# Clone repo
git clone https://github.com/MLCochrane/gosyp.git

# Change to root directory
cd gosyp

# Update .env files in root, client and server dirs

# Spin up environment
docker-compose up
```

The web server should then be accessible from `localhost:[whatever port you've picked]`.
## **Testing**
We have two separate test suites: one for the server, one for the frontend. To run tests locally you'll need to `npm install` in both folders.

```bash
# To run server tests
cd gosyp/server/

# Install packages
npm install

# run all tests
npm run test

# watch mode
npm run watch
```
## **Overview**
## What's going on here?
The app currently has no persistent data. No room information, messages, or user info is stored in the database for longer than the room is active. This design decision was made mostly for simplicity rather than as a specific feature. If you have any intersting ideas on implementing user accounts or what not feel free to open an issue about it!

The app is built around socket.io rooms to group sockets/users into their own chat. A user can either create a room or join an existing one. To limit the chance of someone being able to access a room they haven't been invited to, the room ids are given a random UUID on the server which is also used to request a room. While rooms can be given a nickname, this is only for display purposes and is not used to query any information.

When a room is created, we temporarily store some details about the room: `room id`, `number of users in room`, the `date created`, and an optional `nickname` for the room. Once all users have left this is removed from the database.

## Passing data between client and server
All data is passed via socket.io events and there is no REST API in place. Using these alongside React Hooks make subscribing to events quite simple for now components. An example from the TypingAlert.tsx component:
```typescript
// gosyp/client/src/view/components/chat/TypingAlert.tsx
...
import TypingUpdate from 'view/components/lib/events/typingStatus';

const TypingStatus = () => {
  const [isTyping] = TypingUpdate();
  const [typingStatus, setTypingStatus] = useState<String>('');

  useEffect(() => {
    if (isTyping) {
      setTypingStatus('Someone is typing...');
    }

    return () => setTypingStatus('');
  }, [isTyping]);
...
```
Listening to changes is as simple as adding in our custom hook to our component and adding it as a dependency to a `useEffect` hook. This should mean that any other component that needs to know about someone typing in the room can easily do so, and new components that rely on already established events can be easily built.

## **Roadmap/Considerations**
There are no grand plans right now but would be interesting to possibly include:

- Expand on containerization so we could deploy via kubernetes
- Support for multiple rooms
- Customization
  - picking a color for messages or user icon?
- Additional clients
  - mobile clients (React Native)
  - desktop client (Electron)

## **Contributing**
Please read [CONTRIBUTING.md](https://github.com/MLCochrane/gosyp/blob/master/.github/CONTRIBUTING.md)

## **License**
[MIT](https://github.com/MLCochrane/gosyp/blob/master/.github/LICENSE.md)
