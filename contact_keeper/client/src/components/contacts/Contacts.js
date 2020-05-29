import React, { Fragment, useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactContext from "../../context/contact/contactContext";
import ContactItem from "./ContactItem";

const Contact = () => {
  const contactContext = useContext(ContactContext); // extract data from context
  const { contacts, filtered } = contactContext; // destructuring

  if (contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }

  if (filtered) {
    if (filtered === []) {
      return <h4>No such contacts found</h4>;
    }
  }

  return (
    <Fragment>
      <TransitionGroup>
        {filtered !== null ? (
          filtered.length === 0 ? (
            <h4>No such contacts found</h4> // Not Found Message when no such contacts
          ) : (
            // Filtered contacts (No animation)
            filtered.map((contact) => (
              <ContactItem key={contact.id} contact={contact}></ContactItem>
            ))
          )
        ) : (
          // All contacts (with animation)
          contacts.map((contact) => (
            <CSSTransition key={contact.id} timeout={500} classNames='item'>
              <ContactItem contact={contact}></ContactItem>
            </CSSTransition>
          ))
        )}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contact;
