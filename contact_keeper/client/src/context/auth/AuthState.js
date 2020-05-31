import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  CLEAR_FILTER,
} from "../types";

// Set up initial state
const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    user: null,
    loading: true,
    error: null,
  };

  //
  const [state, dispatch] = useReducer(authReducer, initialState);

  ////// All Actions /////

  // Load User
  const loadUser = async () => {
    // Set a common header if the token exists (user logged in)
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get("/api/auth");
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: null,
      });
    }
  };

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      // fetching data from BackEnd
      const res = await axios.post("/api/users", formData, config); // proxy value set in package.json
      console.log(`Data got from backend: ${res}`);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      loadUser(); // load user right after the user is registered
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      // fetching data from BackEnd
      const res = await axios.post("/api/auth", formData, config); // proxy value set in package.json

      console.log(`Data got from backend: ${res}`);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      loadUser(); // load user right after the user is registered
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS,
      payload: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
