// Include all actions
import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from "../types";

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== "production") {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

// All actions goes here
const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users
  // Search Github users function which will be passed down to Search
  const searchUsers = async (text) => {
    setLoading();
    const res = await axios.get(
      // use enviromental variable
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    console.log("GithubState: axios response:");
    console.log(res.data.items);

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };

  // Get User
  // Get single Github user
  const getUser = async (username) => {
    setLoading();
    const res = await axios.get(
      // use enviromental variable
      `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  // Get Repos
  // Get user's repos
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(
      // use enviromental variable
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    // console.log("Axios response repos");
    // console.log(res.data);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  };

  // Clear Users
  // Clear search result from the sate
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
