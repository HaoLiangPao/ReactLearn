import React, { useEffect, useState, Fragment } from "react";
import SearchBar from "./components/layout/SearchBar";
import Logs from "./components/logs/Logs";

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import "./App.css";

const App = () => {
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();
  });

  return (
    <Fragment>
      <SearchBar></SearchBar>
      <div className='container'>
        <Logs></Logs>
      </div>
    </Fragment>
  );
};

export default App;
