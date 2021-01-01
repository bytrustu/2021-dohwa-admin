import React from 'react';

const Hashtag = ({ hashtags, removeHandle }) => {
  return (
    <div className="hashtag-wrap">
      {
        hashtags.map(el =>
          <span key={el} className="hashtag-item" onClick={() => removeHandle(el)}>
            {`#${el}`}
          </span>
        )
      }
    </div>
  );
};

export default React.memo(Hashtag);
