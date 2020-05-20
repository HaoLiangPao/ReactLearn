// import React, { Component } from "react"

import React, { Component } from "react";
import "./App.css";

// Components can be classes or functions -> Hooks can kind of do both?
class App extends Component {
  // A lifecycle function
  render() {
    // JSX can have variables, functions
    const name = "Hao Liang";
    // Conditionals
    const loading = false;
    const showName = true;

    return (
      // JSX: syntatic suger, under the hude it is javascript
      // className <-> class
      // for="" <-> htmlFor=""
      // Always has to have one parent element: Fragment (ghost div element)
      <div className='App'>
        {loading ? (
          <h4>Loading...</h4>
        ) : (
          <h1>Hello {showName ? name.toUpperCase() : null} </h1>
          // <h1>Hello {showName && name.toUpperCase()} </h1>
        )}
      </div>
    );
  }
}

export default App;
