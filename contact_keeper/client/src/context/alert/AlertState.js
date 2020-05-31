import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid"; // since we are using some hard-coded data before connect to the back end
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";

import { SET_ALERT, REMOVE_ALERT } from "../types";

// Set up initial state
const AlertState = (props) => {
  //////    State    /////
  const initialState = [];
  // Connect the reducer
  const [state, dispatch] = useReducer(alertReducer, initialState);

  ////// All Actions /////
  // Set Alert
  const setAlert = (msg, type, timeOut = 5000) => {
    const id = uuidv4();
    // shows the alert
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });
    // remove the alert after certain amount of time
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeOut);
  };

  /////    Output    /////
  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
