import React, { Fragment, useContext } from "react";
import ContactContext from "../../context/contact/contactContext";

const Contact = () => {
  const contactContext = useContext(ContactContext); // extract data from context

  const { contacts } = contactContext; // destructuring

  return (
    <Fragment>
      {contacts.map((contact) => (
        <h3>{contact.name}</h3>
      ))}
    </Fragment>
  );
};

export default Contact;
