import React from 'react';
import { Card } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import RecordContent from '../RecordContent';

const Record = ({ title, link, data, loading }) => {
  return (
    <Card className="record-card" title={title} loading={loading}>
      <Link href={link}>
        <a className="record-link">
          <Image src="/images/dashboard/plus-sign.svg" alt="링크아이콘" width={20} height={20}/>
        </a>
      </Link>
      <RecordContent content={data}/>
    </Card>
  );
};

export default React.memo(Record);
