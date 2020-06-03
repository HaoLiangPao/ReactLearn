import React from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteLog } from "../../actions/logActions";
import PropTypes from "prop-types";

import M from "materialize-css/dist/js/materialize.min.js";

const LogItem = ({
  log: { id, tech, data, message, attention },
  deleteLog,
}) => {
  const onDelete = () => {
    deleteLog(id);
    // M.toast({ html: `Log ${id} Deleted` });
  };

  return (
    <li className='collection-item'>
      <div>
        {/* Materialize has a modal-trigger class */}
        <a
          href='#edit-log-modal'
          className={`modal-trigger ${attention ? "red-text" : "blue-text"}`}
        >
          {message}
        </a>
        <span className='grey-text'>
          <span className='black-text'>ID #{id}</span> last updated by{" "}
          <span className='black-text'>{tech}</span> on{" "}
          <Moment format='MMMM Do YYYY, h:mm:ss a'>{data}</Moment>
        </span>
        <a href='#!' onClick={onDelete} className='secondary-content'>
          <i className='material-icons grey-text'>delete</i>
        </a>
      </div>
    </li>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired,
  deleteLog: PropTypes.func.isRequired,
};

export default connect(null, { deleteLog })(LogItem);
