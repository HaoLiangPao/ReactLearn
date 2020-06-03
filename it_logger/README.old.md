# IT Logger 1.0

## Introduction

It is a web appliation which keeps the IT logs. We are using `Materialize` as the front-end (**Not Materialize UI** due to the code needed for a simple component.) `Material Icons` are used as an alternative of `font-awsomes`, which was been used in other two projects.

##### What it does:

1. It searches github users through `Github API` according to the `username` to search typed by the user.
2. It displays available information fetched in a React website.

##### How it does:

This projects was created with React, in a structure of

| Frontend                                                                   | Backend                                                                 | DEmo          |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------- |
| [File Structure](</contact_keeper/FileStructure(Frontend).md> "Front-end") | [File Structure](</contact_keeper/FileStructure(Backend).md> "Backend") | [Live Demo]() |

---

## Environment Set up

### Frontend Environment & Full-stack Environment Set up

**1. Install React in current folder** (don't mess up with the folders where dependencies installed!!!)

```bash
npx create-react-app .
```

**2. Install `json-server` and `concurrently` as development dependency **

```bash
npm i -D json-server concurrently
```
- `json-server`: (Back-end) an open-source backend fake server which provides many useful APIs

- `concurrently`: (Full-stack) run backend and frontend server at the same time

**3. Add fake data into `db.json` **

```json
{
  "logs": [
    {
      "id": 1,
      "message": "Changed network card in server 007",
      "attention": false,
      "tech": "Sam Smith",
      "date": "2019-05-31T15:46:10.179Z"
    },
    {
      "id": 2,
      "message": "Fixed hard drive on workstation 002",
      "attention": false,
      "tech": "John Doe",
      "date": "2019-05-31T16:18:04.245Z"
    },
    {
      "message": "1122 wireless down",
      "attention": true,
      "tech": "Sara Wilson",
      "date": "2019-05-31T15:46:48.690Z",
      "id": 3
    },
    {
      "id": 4,
      "message": "Workstation 026 is up and running",
      "attention": false,
      "tech": "Sara Wilson",
      "date": "2019-05-31T19:57:35.544Z"
    }
  ],
  "techs": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe"
    },
    {
      "id": 2,
      "firstName": "Sam",
      "lastName": "Smith"
    },
    {
      "id": 3,
      "firstName": "Sara",
      "lastName": "Wilson"
    }
  ]
}
```

**4. Add some script to `package.json` **

```json
{
  "scripts": {
    "start": "react-scripts start",
    "json-server": "json-server --watch db.json --port 5000",
    "dev": "concurrently \"npm start\" \"npm run json-server\"",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
} 
```

Notes: _no need to run ~~`npm start`~~ and ~~`npm run json-server`~~ mannually everytime we want to run the whole application. Instead, we just have to run `npm run dev`._ It will monitoring the index.js and db.json and resart the react and server everytime they change.

**5. Add proxy to `package.json` **

```json
{
    "proxy": "http://localhost:5000"
}
```

**6. Install `materialize` ,`moment`, `react-moment`, `redux`, `react-redux`, `redux-thunk`, redux-devtools-extension**

```bash
npm i materialize-css moment react-moment redux react-redux redux-thunk
```

- `materialize-css`: to use some preset css styles
- `moment`: time format and display
- `react-moment`: adapt moment to `react`
- `redux`: third-party state management package
- `react-redux`: adapt redux to `react`
- `redux-thunk`: a piece of middleware for redux to handle asynchronous functions
- `redux-devtools-extension`: help us to use redux-devtools in Google-Chrome

**7. Create boilerplates in order to use `redux`  **

```bash
npm i 
```





---

## To Do

- [ ] don't clear update-form when deleting a contact, only clear it when deleting the `current` contact
- [ ] route/contacts.js: add validation of update form (avoid overwritting with blanks)

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
