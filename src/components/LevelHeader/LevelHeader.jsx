import React from 'react';
import PropTypes from 'prop-types';
import './LevelHeader.css';
import Timer from '../Timer/Timer';

function LevelHeader({ name }) {
  return (
    <div className="level-header">
      <div className="name">{name}</div>
      <Timer />
    </div>
  );
}

LevelHeader.propTypes = {
  name: PropTypes.string.isRequired,
};

export default LevelHeader;
