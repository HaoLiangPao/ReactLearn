import React, { useContext, useEffect } from "react";
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import ContactFilter from "../contacts/ContactFilter";
import { FILTER_CONTACTS } from "../../context/types";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []); // only run when the component loads

  return (
    <div className='grid-2'>
      <div>
        <ContactForm></ContactForm>
      </div>

      <div>
        <ContactFilter></ContactFilter>
        <Contacts></Contacts>
      </div>
    </div>
  );
};

export default Home;
