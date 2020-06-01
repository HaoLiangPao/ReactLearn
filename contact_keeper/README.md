# 																	Contact Keeper 1.0

## Introduction

Contact Manager App

##### What it does:

1. It searches github users through `Github API` according to the `username` to search typed by the user.
2. It displays available information fetched in a React website.

##### How it does:

This projects was created with React, in a structure of

| Front-end                                                 | Back-end                                                | DEmo          |
| --------------------------------------------------------- | ------------------------------------------------------- | ------------- |
| [File Structure](FileStructure(Front-end).md "Front-end") | [File Structure](FileStructure(Back-end).md "Back-end") | [Live Demo]() |

---

## Environment Setup

### Back-end Environment Set up

**1. Initialize package.json** (say yes to all inputs)

```bash
npm init -y
```

**2. General Dependencies**

```bash
npm i express bcryptjs jsonwebtoken config express-validator mongoose
```

   - `express`: handle HTTP routes
   - `bcryptjs`: handle hashing passwords
   - `jsonwebtoken`: create JWT (Json Web Token) for authentication, access protected route
   - `config`: deal with global variables
   - `express-validator`: validate input data
   - `mongoose`: abstraction layer to deal with database

**3. Development Dependencies**

```bash
npm i -D nodemon concurrently   
```

- `nodemon`: (Back-end) keep watching the server, so no need to mannually restart it

- `concurrently`: (Full-stack) run backend and frontend server at the same time 

1. Add scripts into package.json

   ```json
   {
     "scripts": {
     "start": "node server.js",
     "server": "nodemon server.js"
   	},
   }
   ```

   ```bash
   npm run server
   ```

   Notes: *no need to run ~~`npm run server`~~ mannually everytime server.js changes. Instead, we just have to run `npm run server`.* **It will monitoring the server.js and resart the server everytime it changes.**

### Front-end Environment & Full-stack Environment Set up

**1. Install React in `client` folder** (don't mess up with dependencies!!!)

```bash
npx create-react-app client
```

**2. Use `concurrently` to run both front-end server and back-end server**

Some scripts to be added to package.json in root folder (back-end)

`root/package.json ` (back-end)

```json
{
  "scripts": {
    "start": "node server.js",
    "server": "nodemon server.js",
    "client": "npm start --prefix client",
    "clientinstall": "npm install --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  },
}
```

so that we can run servers on both ends by the command below

```bash
npm run dev
```

**3. Use proxy in `client` folder**

Add *proxy* value to client `package.json`, to ease the process of hiting the endpoint

 `root/client/package.json ` (front-end)

```json
  {
    "proxy": "http://localhost:5000"
  }
```

**4. Add React dependencies**

```bash
npm i axios react-router-dom uuid react-transition-group
```

   - `axios`: use HTTP client
   - `react-router-dom`: 
   - `uuid`: id generator
   - `react-transition-group`: animation

---

## To Do

- [ ] don't clear update-form when deleting a contact, only clear it when deleting the `current` contact
- [ ] route/contacts.js:  add validation of update form (avoid overwritting with blanks)

















---

## Special thanks to

_If you want to see the original files, please visit [Brad Traversy](https://www.traversymedia.com/ "Brad Traversy")'s website or check out all his courses available in [Udemy](https://www.udemy.com/user/brad-traversy/ "Brad's Courses on Udemy")_

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

#### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

#### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

#### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

#### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

#### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
