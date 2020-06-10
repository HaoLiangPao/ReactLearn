# How to use `redux` in React

### 1.Dependency install

```bash
npm i react-redux redux redux-devtools-extension redux-thunk
```

- `redux`: third-party state management package
- `react-redux`: adapt redux to `react`
- `redux-thunk`: a piece of middleware for redux to handle asynchronous functions
- `redux-devtools-extension`: help us to use redux-devtools in Google-Chrome

### 2.Create boilerplate for redux - `store.js`

```javascript
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
```

- `applyMiddleware()`: apply all kinds of middleware included in **an array** 
- `rootReducer`: a **root reducer file** created by `reducers/index.js`, which combines all kinds of reducers in **reducers folder**

### 3.Generate `root reducer file` from `reducers/index.js` 

```javascript
import { combineReducers } from "redux";
import logReducer from "./logReducer";
import techReducer from "./techReducer";

export default combineReducers({
  log: logReducer,
  tech: techReducer,
});
```

- `combineReducers()`: generate root reducer file

### 4.Use **redux module** in `app.js`

```javascript
...
// Redux
import { Provider } from "react-redux";
import store from "./store";

return (
  <Provider store = {store}>
  	...
  </Provider>
)
```

- It is a code snippet which only includes code blocks related to `redux`

### 4.Use **redux module** in `app.js`

```javascript
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addTech } from "../../actions/techActions";
```

- `connect()`: use **states** and **actions** from `redux provider`
- `PropTypes`: get **states** and **actions** as props input (as the code snippet below)
- `addTech`: import **actions** from a specific action file

```javascript
// 1. add state and action through props
const AddTechModal = ({ addTech }) => {
	...
}
// 2. Check prop type for all props
AddTechModal.propTypes = {
  addTech: PropTypes.func.isRequired,
};
// 3. connect state and actions with the module itself
export default connect(null, { addTech })(AddTechModal);
```

