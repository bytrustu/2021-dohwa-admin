import React from 'react';

const StatusContent = ({ type, value, percent, currentDate, text }) => {
  return (
    <div className="status-content-wrap">
      <img
        className="arrow"
        src={type === 'up' ? '/images/dashboard/up.svg' : '/images/dashboard/down.svg'}
        alt="아이콘"
      />
      <strong>{value}</strong>

      <div className="date-wrap">
        <p className="current">
          <span>{currentDate}</span>
        </p>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default React.memo(StatusContent);
