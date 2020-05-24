import React, { useContext } from "react";
import Useritem from "./Useritem";
import Spinner from "../layout/Spinner";

import GithubContext from "../../context/github/githubContext";

const Users = () => {
  // Initialize github context
  const githubContext = useContext(GithubContext);
  // Destructuring githubContext (no need to change the rest, just getting data from different sources)
  const { loading, users } = githubContext;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={userStyle}>
        {users.map((user) => (
          <Useritem key={user.id} user={user}></Useritem>
        ))}
      </div>
    );
  }
};

// userStyle
const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};

export default Users;
