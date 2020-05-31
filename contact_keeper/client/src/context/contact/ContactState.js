import React, { useReducer } from "react";
import axios from "axios";
// import { v4 as uuidv4 } from "uuid"; // since we are using some hard-coded data before connect to the back end
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
} from "../types";

// Set up initial state
const ContactState = (props) => {
  const initialState = {
    contacts: [],
    current: null, // a place for edit contact
    filtered: null,
    error: null,
  };

  //
  const [state, dispatch] = useReducer(contactReducer, initialState);

  ////// All Actions /////
  // Add Contact
  const addContact = async (contact) => {
    // contact.id = uuidv4(); // use uuid to get a id ()
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/contacts", contact, config);
      console.log(
        `ContactState.js -- addContact -- res: ${res} , res.data: ${res.data}`
      );
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg,
      });
    }
  };

  // Delete Contact
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  // Set Current Contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT, payload: null });
  };

  // Update Contact
  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  // Filter Contacts
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER, payload: null });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
