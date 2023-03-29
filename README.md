# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


Summary of the project:

The game description is in hungarian because this is a school project, I think it's better if every student or teacher can understand it.
But here's a brief summary of the game:
-On the front page you can choose how many players want to play the game. For now this is only a local game, but I want to add multiplayer later. (Fun game regardless).
The number of players determine the minimum number of treasures. There must be at least one for every player, so for 1 player you can choose from 1 to 24, with 2 players    it increments by 2, so 2-4-6...24, etc etc. 
-If you click on the start game button, you get to the game page. On the navbar you can find the description, login, register, save and exit buttons. I think it's pretty obvious what they do. 
  The game rules:
    *The board consists of 7x7 (so 49) and one bonus tiles. There are both fixed and randomly generated tiles. Next to every 2nd, 4th and 6th row and column there's an         arrow. With those arrows the player can slide the bonus tile in that row/column. (So the last one in that row/column becomes the bonus one).
    The player can rotate the bonus tile with the arrows next to it.
    *The goal is to collect all the treasures on the board, and then get back to the starter tile. The red player has to collect the red treasures, the blue player the blue     treasures and so on.
    *The first one to collect all and reach the start wins the game.
-The player can register after clicking on the register button. The save feature is only available to registered (and logged in) users. Logged in users are able to load their previously saved games.
