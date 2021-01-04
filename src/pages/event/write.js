import React from 'react';
import MainTitle from '../../component/Content/MainTitle';
import Content from '../../component/Content';
import InputGroup from '../../component/Content/InputGroup';
import SearchGroup from '../../component/Content/SearchGroup';
import { Button, Input, DatePicker, Upload, ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/ko_KR';
import useAlert from '../../hooks/useAlert';
import ButtonGroup from '../../component/Content/ButtonGroup';
import { useRouter } from 'next/router';
import ContentGroup from '../../component/Content/ContentGroup';
import ContentInputGroup from '../../component/Content/ContentGroup/ContentGroupInputGroup';
import ContentGroupInput from '../../component/Content/ContentGroup/ContentGroupInput';
import SmallComment from '../../component/Content/SmallComment';
import Hashtag from '../../component/Content/ContentGroup/Hashtag';
import useInputs from '../../hooks/useInputs';
import { submitEventAPI } from '../../lib/api/event';
import { getTestRegExp } from '../../lib/util';


const index = () => {
  const router = useRouter();

  const { TextArea } = Input;
  const { RangePicker } = DatePicker;

  const {
    SuccessAlert,
    ErrorAlert,
    MessageAlert,
    requestApiHanlder,
  } = useAlert();

  const typeRef = React.useRef();
  const hashtagRef = React.useRef();
  const linkRef = React.useRef();
  const titleRef = React.useRef();
  const contentRef = React.useRef();
  const costRef = React.useRef();

  const [input, onChangeInput, setInput] = useInputs({
    start_date: '',
    end_date: '',
    link: '',
    cost: 0,
    title: '',
    type: '',
    hashtag: [],
    hashtag_input: '',
    content: '',
    fileList: [],
  });

  const {
    start_date,
    end_date,
    link,
    cost,
    title,
    type,
    hashtag,
    hashtag_input,
    content,
    fileList,
  } = input;


  const addHashTag = () => {
    hashtagRef.current.focus();
    if (hashtag_input.trim().length === 0) {
      return;
    }
    if (hashtag.includes(hashtag_input)) {
      return;
    }
    if (hashtag.length > 2) {
      return;
    }
    hashtag.push(hashtag_input);
    setInput({ ...input, hashtag_input: '' });
  };
  const removeHashtag = (text) => {
    setInput({ ...input, hashtag: hashtag.filter(el => el !== text) });
  };

  const onChangeUpload = ({ fileList: newFileList }) => {
    setInput({
      ...input,
      fileList: newFileList,
    });
  };
  const beforeUploadHandle = (file) => {
    setInput({
      ...input,
      fileList: fileList.concat(file),
    });
  };

  const dateRenderDatepicker = (current) => {
    const style = {};
    if (current.date() === 1) {
      style.border = '1px solid #1890ff';
      style.borderRadius = '50%';
    }
    return (
      <div className="ant-picker-cell-inner" style={style}>
        {current.date()}
      </div>
    );
  };

  const onChangeDatepicker = (date, dateString) => {
    if (dateString) {

      const [start_date, end_date] = dateString;
      setInput({
        ...input,
        start_date,
        end_date,
      });
    } else {
      setInput({
        ...input,
        start_date: '',
        end_date: '',
      });
    }
  };

  const onSubmitEvent = async () => {
    const formData = new FormData();

    const eventAlert = (type, ref) => {
      MessageAlert({
        title: '이벤트 등록 실패',
        type: '이벤트 등록',
        message: `[ ${type} ] 입력이 필요 합니다.`,
        isSuccess: false,
        okOnClick: () => {
          ref && ref.current.focus();
        }
      });
    };

    if (type.trim().length === 0) {
      return eventAlert('유형', typeRef);
    }
    formData.append('type', type);

    if (hashtag.length === 0) {
      return eventAlert('해시태그', hashtagRef);
    }
    formData.append('hashtag', hashtag);

    if (title.trim().length === 0) {
      return eventAlert('제목', titleRef);
    }
    formData.append('title', title);

    if (!getTestRegExp('link', link)) {
      return eventAlert('구매링크', linkRef);
    }
    formData.append('link', link);

    if (content.trim().length === 0) {
      return eventAlert('내용', contentRef);
    }
    formData.append('content', content);

    if (fileList.length === 0) {
      return eventAlert('이미지');
    }
    formData.append('event', fileList[0].originFileObj);

    if (start_date.length === 0 || end_date.length === 0) {
      return eventAlert('기간');
    }
    formData.append('start_date', start_date);
    formData.append('end_date', end_date);

    formData.append('cost', cost);

    await requestApiHanlder({
      funcAPI: submitEventAPI,
      data: formData,
      title: '이벤트 등록',
      afterAction: () => {
        router.push('/event');
      },
    });
  };

  const onClickExit = () => {
    router.push('/event');
  }

  return (
    <>
      <SuccessAlert />
      <ErrorAlert />
      <MainTitle src="/images/maintitle/event.svg" title="이벤트 등록" />
      <Content style={{ marginTop: '2rem', paddingTop: '0' }}>
        <SmallComment comment="이벤트 등록의 모든 입력은 필수 사항 입니다." />
        <InputGroup>
          <SearchGroup />
          <ButtonGroup>
            <Button type="primary" onClick={onSubmitEvent}>이벤트 등록</Button>
            <Button type="default" onClick={onClickExit}>나가기</Button>
          </ButtonGroup>
        </InputGroup>

        <ContentGroup title="이벤트 정보">
          <ContentInputGroup>
            <ContentGroupInput title="유형">
              <Input
                type="text"
                name="type"
                value={type}
                onChange={onChangeInput}
                ref={typeRef}
              />
            </ContentGroupInput>
            <ContentGroupInput title="해시태그">
              <Input
                type="text"
                name="hashtag_input"
                value={hashtag_input}
                onChange={onChangeInput}
                onPressEnter={addHashTag}
                placeholder="#은 제외, 내용만 입력"
                ref={hashtagRef}
              />
              <Button type="primary" onClick={addHashTag}>추가</Button>
            </ContentGroupInput>
            {
              hashtag.length > 0 && (
                <ContentGroupInput>
                  <Hashtag hashtags={hashtag} removeHandle={removeHashtag} />
                </ContentGroupInput>
              )
            }
            <ContentGroupInput title="구매링크">
              <Input
                type="text"
                name="link"
                value={link}
                onChange={onChangeInput}
                placeholder="http:// https:// 포함 입력"
                ref={linkRef}
              />
            </ContentGroupInput>
            <ContentGroupInput title="제목">
              <Input
                type="text"
                name="title"
                value={title}
                onChange={onChangeInput}
                ref={titleRef}
              />
            </ContentGroupInput>
            <ContentGroupInput title="내용">
              <TextArea name="content" value={content} onChange={onChangeInput} ref={contentRef} />
            </ContentGroupInput>
            <ContentGroupInput title="이미지">
              <Upload
                listType="picture-card"
                fileList={fileList}
                beforeUpload={beforeUploadHandle}
                onChange={onChangeUpload}
              >
                {fileList.length < 1 && '+ 추가'}
              </Upload>
            </ContentGroupInput>
          </ContentInputGroup>
        </ContentGroup>

        <ContentGroup title="이벤트 안내">
          <ContentInputGroup>
            <ContentGroupInput title="기간">
              <ConfigProvider locale={locale}>
                <RangePicker
                  format="YYYY-MM-DD"
                  placeholder={['시작일자', '종료일자']}
                  dateRender={dateRenderDatepicker}
                  onChange={onChangeDatepicker}
                />
              </ConfigProvider>
            </ContentGroupInput>
            <ContentGroupInput title="가격">
              <Input
                type="number"
                name="cost"
                min={0}
                value={cost}
                onChange={onChangeInput}
                ref={costRef}
              />
            </ContentGroupInput>
          </ContentInputGroup>
        </ContentGroup>

      </Content>
    </>
  );
};

export default index;
