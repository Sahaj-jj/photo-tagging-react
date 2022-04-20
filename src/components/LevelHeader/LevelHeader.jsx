import React from 'react';
import PropTypes from 'prop-types';
import './LevelHeader.css';
import { getFormattedTime } from '../../utils';

function LevelHeader({ name, time }) {
  return (
    <div className="level-header">
      <button type="button" className="back">{'<-'}</button>
      <div className="name">{name}</div>
      <div className="timer">
        {getFormattedTime(time)}
      </div>
    </div>
  );
}

LevelHeader.propTypes = {
  name: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
};

export default LevelHeader;
