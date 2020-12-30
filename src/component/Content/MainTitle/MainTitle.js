import React from 'react';
import { Image } from 'antd';

const MainTitle = ({ src, title }) => {
  return (
    <section className='main-title-wrap'>
      <div className='matin-title-content'>
        <Image src={src} alt="타이틀이미지" />
        <h3>{title}</h3>
      </div>
    </section>
  );
};

export default React.memo(MainTitle);
