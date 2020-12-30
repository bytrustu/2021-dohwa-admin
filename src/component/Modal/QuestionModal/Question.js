import React from 'react';

const Question = ({ question='', date='' }) => {
  return (
    <div className="question">
      <span className="mark">질문</span>
      <p className="writing">
        {question.replace(/(?:\r\n|\r|\n)/g, '\n')}
      </p>
      <span className="date">{date}</span>
    </div>
  );
};

export default React.memo(Question);

