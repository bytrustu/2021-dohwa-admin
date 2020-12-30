import React from 'react';

const QuestionTitle = ({ title='' }) => {
  return (
    <h1 className="question-title">
      {title}
    </h1>
  );
};

export default React.memo(QuestionTitle);
