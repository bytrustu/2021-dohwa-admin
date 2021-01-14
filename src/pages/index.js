import React from 'react';
import StatusGroup from '../component/Dashboard/StatusGroup';
import RecordGroup from '../component/Dashboard/RecordGroup';
import { loadEventListAPI } from '../lib/api/event';
import { loadInquiryListAPI } from '../lib/api/inquiry';
import { loadQuestionListAPI } from '../lib/api/question';
import { loadUserListAPI } from '../lib/api/user';

const IndexPage = () => {

  const { response: eventData } = loadEventListAPI({ page: 1 });
  const { response: inquiryData } = loadInquiryListAPI({ page: 1 });
  const { response: questionData } = loadQuestionListAPI({ page: 1 });
  const { response: userData } = loadUserListAPI({ page: 1 });

  return (
    <>
      {/*<StatusGroup />*/}
      <RecordGroup eventData={eventData} inquiryData={inquiryData} questionData={questionData} userData={userData} />
    </>
  );
};

export default IndexPage;