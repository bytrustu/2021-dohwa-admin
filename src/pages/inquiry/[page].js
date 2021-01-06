import React from 'react';
import MainTitle from '../../component/Content/MainTitle';
import Content from '../../component/Content';
import InputGroup from '../../component/Content/InputGroup';
import SearchGroup from '../../component/Content/SearchGroup';
import { Button, Tabs, Tag } from 'antd';
import useAlert from '../../hooks/useAlert';
import ButtonGroup from '../../component/Content/ButtonGroup';
import { useRouter } from 'next/router';
import ContentGroup from '../../component/Content/ContentGroup';
import ContentInputGroup from '../../component/Content/ContentGroup/ContentGroupInputGroup';
import ContentGroupInput from '../../component/Content/ContentGroup/ContentGroupInput';
import { deleteInquiryAPI, loadInquiryByIdAPI } from '../../lib/api/inquiry';

const { TabPane } = Tabs;

const index = () => {

  const router = useRouter();
  const { query: { page } } = router;

  const { response } = loadInquiryByIdAPI(page);
  const { data: inquiryData, error, isValidating } = response;

  const {
    SuccessAlert,
    ErrorAlert,
    requestApiConfirmHanlder,
  } = useAlert();

  const onClickDeleteEvent = () => {
    requestApiConfirmHanlder({
      funcAPI: deleteInquiryAPI,
      data: [page],
      title: '문진 삭제',
      afterAction: () => {
        router.push('/inquiry');
      },
    });
  };

  return (
    <>
      <SuccessAlert />
      <ErrorAlert />
      <MainTitle src="/images/maintitle/skincare.svg" title="피부리포트 보기" />
      <Content style={{ marginTop: '2rem', paddingTop: '0' }}>

        <InputGroup>
          <SearchGroup />
          <ButtonGroup>
            <Button type="danger" onClick={onClickDeleteEvent}>문진 삭제</Button>
          </ButtonGroup>
        </InputGroup>

        {
          !isValidating && (
            <>
            <Tabs defaultActiveKey="문진 정보">
              <TabPane tab="문진 정보" key="문진 정보" style={{ marginTop: '2rem'}}>
                <ContentGroup title="문진 정보">
                  <ContentInputGroup>
                    <ContentGroupInput title="작성자">
                      <span>{inquiryData?.author}</span>
                    </ContentGroupInput>
                    <ContentGroupInput title="등록 일자">
                      <span>{inquiryData?.create_date}</span>
                    </ContentGroupInput>
                  </ContentInputGroup>
                </ContentGroup>
                <ContentGroup title="문진 결과">
                  <ContentInputGroup>
                    <ContentGroupInput title="피부유형">
                      <Tag color="geekblue">{inquiryData?.result['분류']}</Tag>
                    </ContentGroupInput>
                    <ContentGroupInput title="DO세분화합">
                      <Tag color="geekblue">{inquiryData?.result['DO세분화']}</Tag>
                    </ContentGroupInput>
                    <ContentGroupInput title="SR">
                      <Tag color="geekblue">{inquiryData?.result['SR']}</Tag>
                    </ContentGroupInput>
                    <ContentGroupInput title="고민">
                      <Tag color="geekblue">{inquiryData?.result['고민']}</Tag>
                    </ContentGroupInput>
                    <ContentGroupInput title="고민선택">
                      {inquiryData?.result['고민KR'] ? inquiryData?.result['고민KR'].map(el => <Tag
                        color="geekblue">{el}</Tag>) : ''}
                    </ContentGroupInput>
                    <ContentGroupInput title="라이프스타일">
                      <Tag color="geekblue">{inquiryData?.result['LF라이프스타일']}</Tag>
                    </ContentGroupInput>
                    <ContentGroupInput title="세안">
                      <Tag color="geekblue">{inquiryData?.result['CL세안환경']}</Tag>
                    </ContentGroupInput>
                    <ContentGroupInput title="추천">
                      {inquiryData?.result['RE추천'] ? inquiryData?.result['RE추천'].map(el => <Tag
                        color="geekblue">{el}</Tag>) : ''}
                    </ContentGroupInput>
                  </ContentInputGroup>
                </ContentGroup>
              </TabPane>

              {
                inquiryData?.list && Object.entries(inquiryData.list).map(([k, v]) => (
                  <TabPane tab={k} key={k} style={{ marginTop: '2rem'}}>
                    <ContentGroup title={k}>
                      <ContentInputGroup>
                        {
                          v.map(el => (
                            <>
                              <ContentGroupInput title={el.type}>
                                <img src="/images/inquiry/q.svg" width={20} alt="질문 아이콘" />
                                <strong style={{ marginLeft: '1rem' }}>{el.question}</strong>
                              </ContentGroupInput>
                              <ContentInputGroup style={{ padding: 'unset' }}>
                                <ContentGroupInput style={{ padding: '0 0 2rem' }}>
                                  <img src="/images/inquiry/a.svg" width={20} alt="질문 아이콘" />
                                  <span style={{ marginLeft: '1rem' }}>{el.answer}</span>
                                </ContentGroupInput>
                              </ContentInputGroup>
                            </>
                          ))
                        }
                      </ContentInputGroup>
                    </ContentGroup>
                  </TabPane>
                  ),
                )
              }
            </Tabs>
            </>
          )
        }
      </Content>
    </>
  );
};

export default index;