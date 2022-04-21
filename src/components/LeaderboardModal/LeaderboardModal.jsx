import React, { useEffect, useRef, useState } from 'react';
import {
  doc, updateDoc, getFirestore, arrayUnion,
} from 'firebase/firestore';
import PropTypes from 'prop-types';
import './LeaderboardModal.css';
import { IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { getFormattedTime } from '../../utils';

function LeaderboardModal({ leaderboardID, time, handleCloseModal }) {
  const inputRef = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(getFirestore(), 'leaderboards', leaderboardID), {
      entries: arrayUnion({
        name: inputRef.current.value,
        time,
      }),
    });
    setIsSubmitted(true);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="leaderboard-modal">
      <button type="button" className="close" onClick={handleCloseModal}>
        <IoMdClose />
      </button>
      <h3 className="heading">YOU DID IT!</h3>
      <div className="text">Time taken</div>
      <div className="time">{getFormattedTime(time)}</div>
      {!isSubmitted && (
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
      )}
      {isSubmitted && (
        <div className="confirmation-message">Your time has been recorded!</div>
      )}
      <Link to="/leaderboards">
        <button type="button" className="view-leaderboard">View leaderboard</button>
      </Link>
    </div>
  );
}

LeaderboardModal.propTypes = {
  leaderboardID: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};

export default LeaderboardModal;
