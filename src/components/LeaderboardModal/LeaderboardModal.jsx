import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './LeaderboardModal.css';
import { getFormattedTime } from '../../utils';

function LeaderboardModal({ time }) {
  const inputRef = useRef();
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="leaderboard-modal">
      <h3 className="heading">Congratulations!</h3>
      <div className="text">You Took</div>
      <div className="time">{getFormattedTime(time)}</div>
      <form action="/" onSubmit={handleFormSubmit}>
        <input
          type="text"
          className="player-name"
          placeholder="Username"
          ref={inputRef}
          required
        />
        <button type="submit" className="submit">Submit</button>
      </form>
      <button type="button" className="view-leaderboard">View leaderboard</button>
    </div>
  );
}

LeaderboardModal.propTypes = {
  time: PropTypes.number.isRequired,
};

export default LeaderboardModal;
