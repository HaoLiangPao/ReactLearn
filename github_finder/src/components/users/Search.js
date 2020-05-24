import React, { useState, useContext } from "react";

import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";

const Search = () => {
  const [text, setText] = useState("");
  // Initialize githubContext
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  // Onchange function, otherwise the input will be read-only since we assign default value to it.
  const onChange = (e) => setText(e.target.value);

  // OnSubmit function
  const onSubmit = (e) => {
    e.preventDefault();
    // Basic validation -> alert message
    if (text === "") {
      alertContext.setAlert("Please enter something", "light");
    } else {
      githubContext.searchUsers(text);
      setText("");
    }
  };

  // console.log("On submit");
  // console.log(githubContext);

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Users...'
          value={text}
          onChange={onChange}
        />

        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {githubContext.users.length > 0 && (
        <button
          className='btn btn-light btn-block'
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
