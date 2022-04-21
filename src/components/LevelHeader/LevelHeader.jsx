import React from 'react';
import PropTypes from 'prop-types';
import './LevelHeader.css';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { getFormattedTime } from '../../utils';

function LevelHeader({ name, time }) {
  const navigate = useNavigate();

  return (
    <div className="level-header">
      <button type="button" className="back" onClick={() => { navigate('../'); }}>
        <BiArrowBack />
      </button>
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
