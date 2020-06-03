import React, { useState, useEffect } from "react";
import LogItem from "./LogItem";
import Preloader from "../layout/Preloader";

const Logs = () => {
  // Set initial states
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Lifecycle functions, run as the component initialize
  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);

  const getLogs = async () => {
    setLoading(true);
    const res = await fetch("/logs");
    const data = await res.json();

    setLogs(data);
    setLoading(false);
  };

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

export default Logs;