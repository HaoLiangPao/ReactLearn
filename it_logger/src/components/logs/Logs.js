import React, { useEffect } from "react";
import { connect } from "react-redux";
import LogItem from "./LogItem";
import Preloader from "../layout/Preloader";
import PropTypes from "prop-types";
import { getLogs } from "../../actions/logActions"; // import as props

// Destructuring app-level state props
const Logs = ({ log: { logs, loading }, getLogs }) => {
  // Lifecycle functions, run as the component initialize
  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);

  // we set logs to null in initial state, the async function needs some time to get data back from backend, set logs===null to show preloading while fetching the data
  if (loading || logs === null) {
    return <Preloader></Preloader>;
  }

  return (
    <ul className='collection with-header'>
      <li className='clollection-header'>
        <h4 className='center'>System Logs</h4>
      </li>
      {!loading && logs.length === 0 ? (
        <p className='center'>No logs to show...</p>
      ) : (
        logs.map((log) => <LogItem log={log} key={log.id}></LogItem>)
      )}
    </ul>
  );
};

Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  // Get state from index.js in reducers?
  log: state.log,
});

export default connect(mapStateToProps, { getLogs })(Logs);
