import React from "react";
import PropTypes from "prop-types";

const Navbar = ({ icon, title }) => {
  return (
    <nav className='navbar bg-primary'>
      <h1>
        <i className={icon}> {title} </i>
      </h1>
    </nav>
  );
};

// Default props
Navbar.defaultProps = {
  title: "Github Finder",
  icon: "fab fa-github",
};
// Will not stop compiling if JavaScript can do (array to string), but will show a warning message
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Navbar;
