import React from 'react';
import { Col, Row, Tag } from 'antd';
import Record from '../Record';


const RecordGroup = ({ eventData, inquiryData, questionData, userData }) => {

  const { data: event, error: eventError, isValidating: eventIsValidating } = eventData;
  const { data: inquiry, error: inquiryError, isValidating: inquiryIsValidating } = inquiryData;
  const { data: question, error: questionError, isValidating: questionIsValidating } = questionData;
  const { data: user, error: userError, isValidating: userIsValidating } = userData;

  const eventList = event?.list && event.list.map(el => ({
    type: el.is_progress,
    typeText: el.is_progress ? '진행중' : '미진행',
    title: el.title,
    link: '/event'
  }));

  const inquiryList = inquiry?.list && inquiry.list.map(el => ({
    title: <><Tag color="#357dde">{el.result}</Tag>{el["고민KR"].join(', ')}</>,
    link: `/inquiry/${el.survey_id}`,
    author: el.name,
  }));

  const questionList = question?.list && question.list.map(el => ({
    type: el.is_answer,
    typeText: el.is_answer ? '답변완료' : '답변대기',
    title: el.title,
    author: el.name,
    link: '/question'
  }));

  const userList = user?.list && user.list.map(el => ({
    type: false,
    typeText: el.type.toUpperCase(),
    title: el.name,
    author: el.create_date,
    link: '/user'
  }));





  return (
    <div className="site-card-wrapper record-group-wrap">
      <Row gutter={40}>
        <Col span={6}>
          <Record title="이벤트 공지" link="/event" data={eventList} loading={eventIsValidating}/>
        </Col>
        <Col span={6}>
          <Record title="최근 피부리포트" link="/inquiry" data={inquiryList} loading={inquiryIsValidating}/>
        </Col>
        <Col span={6}>
          <Record title="최근 문의사항" link="/question" data={questionList} loading={questionIsValidating}/>
        </Col>
        <Col span={6}>
          <Record title="최근 가입회원" link="/user" data={userList} loading={userIsValidating} />
        </Col>
      </Row>
    </div>
  );
};

export default RecordGroup;
