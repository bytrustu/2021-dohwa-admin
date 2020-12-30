import React from 'react';

const SmallComment = ({ comment }) => {
  return (
    <div className="small-comment-wrap">
      <small>🔖 <span>{comment}</span></small>
    </div>
  );
};

export default React.memo(SmallComment);
