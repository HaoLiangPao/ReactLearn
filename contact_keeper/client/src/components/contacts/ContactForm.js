import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
import { CLEAR_CURRENT } from "../../context/types";

const ContactForm = () => {
  // Get context
  const contactContext = useContext(ContactContext);

  // Mimic the componentDidMount() -- lifecycle function
  const { addContact, current, clearCurrent, updateContact } = contactContext;
  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
  }, [contactContext, current]); // add dependencies: means only runs when contactContext is changed or current is changed

  // Initialize a default state and get 'setContact' function
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });
  // Deconstruct the attributes from the contact state
  const { name, email, phone, type } = contact;

  // Update the local state
  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });
  // Clear the Edit state
  const clearAll = () => {
    clearCurrent();
  };

  // Submit handler
  const onSubmit = (e) => {
    e.preventDefault();

    if (current === null) {
      // Add the new contact to ContactContext
      contactContext.addContact(contact);
    } else {
      // Update the existing contact
      contactContext.updateContact(contact);
    }

    // Clear the local contact for next contact entry
    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal",
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      Personal{" "}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === "professional"}
        onChange={onChange}
      />{" "}
      Professional
      <div>
        <input
          type='submit'
          value={current ? "Update Contact" : "Add Contact"}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
