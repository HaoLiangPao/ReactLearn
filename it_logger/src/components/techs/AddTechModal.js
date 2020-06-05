import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addTech } from "../../actions/techActions";

import M from "materialize-css/dist/js/materialize.min.js";

const AddTechModal = ({ addTech }) => {
  // initialize the state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const onSubmit = () => {
    if (firstName === "" || lastName === "") {
      M.toast({ html: "Please enter the first and last name" });
    } else {
      const techToAdd = {
        firstName,
        lastName,
      };
      addTech(techToAdd);
      // clear Fields
      setFirstName("");
      setLastName("");
      // notify the user addition is success
      M.toast({
        html: `Technician: ${firstName} ${lastName} is successfully added`,
      });
    }
  };

  return (
    <div id='add-tech-modal' className='modal'>
      <div className='modal-content'>
        <h4>New Technician</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='fisrtName'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor='fisrtName' className='active'>
              First Name
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='lastName'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor='lastName' className='active'>
              Last Name
            </label>
          </div>
        </div>
      </div>

      <div className='modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className='modal-close waves-effect blue btn waves-light'
        >
          Enter
        </a>
      </div>
    </div>
  );
};

AddTechModal.propTypes = {
  addTech: PropTypes.func.isRequired,
};

export default connect(null, { addTech })(AddTechModal);
