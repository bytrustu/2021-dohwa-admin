import React from 'react';
import { Tag } from 'antd';

const RecordContentText = ({ type, typeText, title, author, link}) => {
  return (
    <a className="record-content-text" href={link ? link : '#'}>
      <div className="text">
        {
          typeText && <Tag color={type ? '#ff4d4f' : '#357dde' }>{typeText}</Tag>
        }
        <span>{title}</span>
      </div>
      <div className="author">
        {author}
      </div>
    </a>
  );
};

export default React.memo(RecordContentText);
