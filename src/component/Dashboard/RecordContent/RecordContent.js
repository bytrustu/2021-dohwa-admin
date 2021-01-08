import React from 'react';
import { Tag } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import RecordContentText from './RecordContentText';


const RecordContent = ({ content }) => {
  return (
    <div className="record-content-wrap">
      {
        content && content
          .filter((_, index) => index < 5)
          .map(el => {
          const { type, typeText, title, author, link } = el;
          return <RecordContentText type={type} typeText={typeText} title={title} author={author} link={link}/>
        })
      }
    </div>
  );
};

export default React.memo(RecordContent);
