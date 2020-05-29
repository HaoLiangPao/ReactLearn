import React, { useReducer } from "react";
import uuid from "uuid"; // since we are using some hard-coded data before connect to the back end
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
} from "../types";

// Set up initial state
const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Hao Liang",
        email: "jill@gmail.com",
        phone: "111-111-111",
        type: "personal",
      },
      {
        id: 2,
        name: "Sara Watson",
        email: "sara@gmail.com",
        phone: "222-222-222",
        type: "personal",
      },
      {
        id: 3,
        name: "Harry White",
        email: "harry@gmail.com",
        phone: "333-333-333",
        type: "professional",
      },
      {
        id: 4,
        name: "Jimmy Butter",
        email: "jimmy@gmail.com",
        phone: "444-444-444",
        type: "personal",
      },
    ],
  };

  //
  const [state, dispatch] = useReducer(contactReducer, initialState);

  ////// All Actions /////
  // Add Contact

  // Delete Contact

  // Set Current Contact

  // Clear Current Contact

  // Update Contact

  // Filter Contacts

  // Clear Filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
