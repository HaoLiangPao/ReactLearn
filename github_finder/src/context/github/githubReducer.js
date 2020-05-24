import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state, // duplicate everything in the current state
        loading: true,
      };
    case SEARCH_USERS:
      // console.log("searchUser been called");
      // console.log(action.payload);
      return {
        ...state,
        users: action.payload, // get payload data from dispatch function
        loading: false,
      };
    case CLEAR_USERS:
      // console.log("Clear Users been called");
      // console.log(state.users);
      return {
        ...state,
        users: [],
        repos: [],
        loading: false,
      };
    case GET_USER:
      // console.log("Clear Users been called");
      // console.log(state.user);
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
