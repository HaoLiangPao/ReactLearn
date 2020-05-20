import React from "react";
import PropTypes from "prop-types";

// It does not have states so we can use stateless functions

const Useritem = ({ user: { login, avatar_url, html_url } }) => {
  // (same as input) // Destructure
  // const { login, avatar_url, html_url } = props.user;

  return (
    <div className='card text-center'>
      {/* inline style with {{}} */}
      <img
        src={avatar_url}
        alt=''
        className='round-img'
        style={{ width: "60px" }}
      />
      <h3>{login}</h3>
      <div>
        <a href={html_url} className='btn btn-dark btn-sm my-1'>
          More
        </a>
      </div>
    </div>
  );
};

Useritem.prototype = {
  user: PropTypes.object.isRequired,
};

export default Useritem;
