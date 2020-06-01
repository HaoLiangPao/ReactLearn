import React, { useReducer } from "react";
import axios from "axios";
// import { v4 as uuidv4 } from "uuid"; // since we are using some hard-coded data before connect to the back end
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";

import {
  GET_CONTACTS,
  CLEAR_CONTACTS,
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
    contacts: null, // if use [], everytime the web page loads, the "please add contact" message will show
    current: null, // a place for edit contact
    filtered: null,
    error: null,
  };

  //
  const [state, dispatch] = useReducer(contactReducer, initialState);

  ////// All Actions /////

  // Get Contact
  const getContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");
      console.log(
        `ContactState.js -- getContact -- res: ${res} , res.data: ${res.data}`
      );
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg,
      });
    }
  };

  // Add Contact
  const addContact = async (contact) => {
    // contact.id = uuidv4(); // use uuid to get a id ()
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(`/api/contacts`, contact, config);
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
  const deleteContact = async (id) => {
    try {
      const res = await axios.delete(`/api/contacts/${id}`);
      console.log(
        `ContactState.js -- deleteContact -- res: ${res} , res.data: ${res.data}`
      );
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg,
      });
    }
  };

  // Clear Contacts
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
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
  const updateContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      console.log(
        `ContactState.js -- updateContact -- res: ${res} , res.data: ${res.data}`
      );
      dispatch({ type: UPDATE_CONTACT, payload: contact });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg,
      });
    }
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
        getContacts,
        clearContacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
