import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    loading: false,
  };

  // lifecycle functions: we can fetch data from APIs at the time the app loads
  async componentDidMount() {
    // 1.Change state
    this.setState({ loading: true });
    // 2.Fetch data from GitHub API
    // Promis syntax
    // axios
    //   .get("https://api.github.com/users")
    //   .then((res) => console.log(res.data));
    // Await syntax
    const res = await axios.get("https://api.github.com/users");
    // 3.Change back to normal state
    this.setState({ users: res.data, loading: false });
  }

  render() {
    return (
      <div className='App'>
        {/* Developers can pass props within the tag
        <Navbar title='Github Finder' icon='fab fa-github' /> */}
        <Navbar title='Github Finder' icon='fab fa-github' />
        <div className='container'>
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
