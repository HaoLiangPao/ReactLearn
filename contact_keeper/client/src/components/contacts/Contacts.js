import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";
import Spinner from "../layout/Spinner";

const Contact = () => {
  const contactContext = useContext(ContactContext); // extract data from context
  const { contacts, filtered, getContacts, loading } = contactContext; // destructuring

  //
  useEffect(() => {
    getContacts();
    // eslint-diable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>;
  }

  if (filtered) {
    if (filtered === []) {
      return <h4>No such contacts found</h4>;
    }
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null ? (
            filtered.length === 0 ? (
              <h4>No such contacts found</h4> // Not Found Message when no such contacts
            ) : (
              // Filtered contacts (No animation)
              filtered.map((contact) => (
                <ContactItem key={contact._id} contact={contact}></ContactItem>
              ))
            )
          ) : (
            // All contacts (with animation)
            contacts.map((contact) => (
              <CSSTransition key={contact._id} timeout={500} classNames='item'>
                <ContactItem contact={contact}></ContactItem>
              </CSSTransition>
            ))
          )}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contact;
