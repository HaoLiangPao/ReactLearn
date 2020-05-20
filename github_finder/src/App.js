import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };

  // // lifecycle functions: we can fetch data from APIs at the time the app loads
  // async componentDidMount() {
  //   // 1.Change state
  //   this.setState({ loading: true });
  //   // 2.Fetch data from GitHub API
  //   // Promis syntax
  //   // axios
  //   //   .get("https://api.github.com/users")
  //   //   .then((res) => console.log(res.data));
  //   // Await syntax
  //   const res = await axios.get(
  //     // use enviromental variable
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );
  //   // 3.Change back to normal state
  //   this.setState({ users: res.data, loading: false });
  // }

  // Search Github users function which will be passed down to Search
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(
      // use enviromental variable
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    // console.log(res.data);
    // console.log(res.data.items);
    this.setState({ users: res.data.items, loading: false });
  };

  // Clear search result from the sate
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  // Set alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });
    // Make the alert message dissapear
    setTimeout(() => this.setState({ alert: null }), 3000);
  };

  render() {
    const { users, loading } = this.state;

    return (
      <div className='App'>
        <Navbar title='Github Finder' icon='fab fa-github' />
        <div className='container'>
          <Alert alert={this.state.alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;