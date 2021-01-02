import React from 'react';
import { convertLineBreak } from '../../../lib/util';

const Question = ({ question='', date='' }) => {
  return (
    <div className="question">
      <span className="mark">질문</span>
      <p className="writing">
        {
          convertLineBreak(question)
        }
      </p>
      <span className="date">{date}</span>
    </div>
  );
};

export default React.memo(Question);

