import React from 'react';
import './SmallComment.scss';

const SmallComment = ({ comment }) => {
  return (
    <div className="small-comment-wrap">
      <small>🔖 <span>{comment}</span></small>
    </div>
  );
};

export default SmallComment;
