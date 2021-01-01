import React from 'react';
import ContentGroupTitle from './ContentGroupTitle';

const ContentGroup = ({ title = '', children }) => {
  return (
    <section className="content-group-wrap">
      <ContentGroupTitle title={title} />
      {
        children
      }
    </section>
  );
};

export default React.memo(ContentGroup);
