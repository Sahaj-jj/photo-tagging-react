/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import './Snackbar.css';

// eslint-disable-next-line react/prop-types
function Snackbar({ active, options }) {
  const snackbarRef = useRef();

  useEffect(() => {
    if (active) snackbarRef.current.classList.toggle('visible');
  }, [active]);

  useEffect(() => {
    snackbarRef.current.className = `snackbar${active ? ' visible ' : ' '}${options.color}`;
  }, [options, active]);

  return (
    <div ref={snackbarRef} className="snackbar">
      {options.message}
    </div>
  );
}

export default Snackbar;
