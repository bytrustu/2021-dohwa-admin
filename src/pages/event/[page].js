import React from 'react';
import MainTitle from '../../component/Content/MainTitle';
import Content from '../../component/Content';
import InputGroup from '../../component/Content/InputGroup';
import SearchGroup from '../../component/Content/SearchGroup';
import { Button, Input, DatePicker, Upload, ConfigProvider, Image } from 'antd';
import locale from 'antd/lib/locale/ko_KR';
import useAlert from '../../hooks/useAlert';
import ButtonGroup from '../../component/Content/ButtonGroup';
import { useRouter } from 'next/router';
import ContentGroup from '../../component/Content/ContentGroup';
import ContentInputGroup from '../../component/Content/ContentGroup/ContentGroupInputGroup';
import ContentGroupInput from '../../component/Content/ContentGroup/ContentGroupInput';
import Hashtag from '../../component/Content/ContentGroup/Hashtag';
import useInputs from '../../hooks/useInputs';
import { deleteEventAPI, loadEventByIdAPI, updateEventAPI } from '../../lib/api/event';
import config from '../../lib/config';
import { convertLineBreak } from '../../lib/util';
import moment from 'moment';

const { IMAGE_URL } = config;

const index = () => {

  const router = useRouter();
  const { query: { page } } = router;

  const { response, trigger } = loadEventByIdAPI(page);
  const { data: eventData, error, isValidating } = response;

  const { TextArea } = Input;
  const { RangePicker } = DatePicker;

  const {
    SuccessAlert,
    ErrorAlert,
    MessageAlert,
    requestApiConfirmHanlder,
    requestApiHanlder,
  } = useAlert();

  const [isEdit, setIsEdit] = React.useState(false);

  const typeRef = React.useRef();
  const hashtagRef = React.useRef();
  const titleRef = React.useRef();
  const contentRef = React.useRef();
  const costRef = React.useRef();

  const [input, onChangeInput, setInput] = useInputs({
    start_date: eventData?.start_date,
    end_date: eventData?.end_date,
    cost: eventData?.cost,
    title: eventData?.title,
    type: eventData?.type,
    hashtag: eventData?.hashtag ? eventData?.hashtag.split(',') : [],
    hashtag_input: '',
    content: eventData?.content,
    fileList: [],
  });

  const {
    start_date,
    end_date,
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

  const onClickChangeEdit = () => {
    trigger();
    setIsEdit(true);
  };

  const onClickDeleteEvent = () => {
    requestApiConfirmHanlder({
      funcAPI: deleteEventAPI,
      data: [page],
      title: '이벤트 삭제',
      afterAction: () => {
        router.push('/event')
      },
    })
  };

  const onClickExit = () => {
    setIsEdit(false);
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
        },
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

    if (content.trim().length === 0) {
      return eventAlert('내용', contentRef);
    }
    formData.append('content', content);

    if (fileList.length === 0) {
      return eventAlert('이미지');
    }
    if (fileList[0].originFileObj) {
      formData.append('is_change_file', true);
      formData.append('event', fileList[0].originFileObj);
    } else {
      formData.append('event', null);
      formData.append('is_change_file', false);
    }


    if (start_date.length === 0 || end_date.length === 0) {
      return eventAlert('기간');
    }
    formData.append('start_date', start_date);
    formData.append('end_date', end_date);

    formData.append('cost', cost);
    formData.append('event_id', page);


    await requestApiHanlder({
      funcAPI: updateEventAPI,
      data: formData,
      title: '이벤트 업데이트',
      afterAction: () => {
        onClickExit();
        trigger();
      },
    });
  };

  React.useEffect(() => {
    setInput({
      start_date: eventData?.start_date,
      end_date: eventData?.end_date,
      cost: eventData?.cost,
      title: eventData?.title,
      type: eventData?.type,
      hashtag: eventData?.hashtag ? eventData?.hashtag.split(',') : [],
      hashtag_input: '',
      content: eventData?.content,
      fileList: [
        eventData?.file &&
        ({
          uid: '-1',
          name: eventData && eventData.file,
          status: 'done',
          url: `${IMAGE_URL}${eventData?.file}`,
        }),
      ],
    });
  }, [eventData]);

  return (
    <>
      <SuccessAlert />
      <ErrorAlert />
      <MainTitle src="/images/maintitle/event.svg" title="이벤트 등록" />
      <Content style={{ marginTop: '2rem', paddingTop: '0' }}>
        <InputGroup>
          <SearchGroup />
          <ButtonGroup>
            {
              isEdit ?
                (
                  <>
                    <Button type="primary" onClick={onSubmitEvent}>수정 완료</Button>
                    <Button type="default" onClick={onClickExit}>취소</Button>
                  </>
                )
                :
                (
                  <>
                    <Button type="primary" onClick={onClickChangeEdit}>이벤트 수정</Button>
                    <Button type="danger" onClick={onClickDeleteEvent}>이벤트 삭제</Button>
                  </>
                )

            }
          </ButtonGroup>
        </InputGroup>

        <ContentGroup title="이벤트 정보">
          <ContentInputGroup>
            <ContentGroupInput title="유형">
              {
                isEdit ?
                  <Input
                    type="text"
                    name="type"
                    value={type}
                    onChange={onChangeInput}
                    ref={typeRef}
                  />
                  :
                  <p className="content-input-text">
                    {eventData?.type}
                  </p>
              }
            </ContentGroupInput>
            <ContentGroupInput title="해시태그">
              {
                isEdit ?
                  (
                    <>
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
                    </>
                  )
                  :
                  <Hashtag hashtags={eventData?.hashtag ? eventData.hashtag.split(',') : []} />
              }
            </ContentGroupInput>
            {
              isEdit && hashtag.length > 0 && (
                <ContentGroupInput>
                  <Hashtag hashtags={hashtag} removeHandle={removeHashtag} />
                </ContentGroupInput>
              )
            }
            <ContentGroupInput title="제목">
              {
                isEdit ?
                  <Input
                    type="text"
                    name="title"
                    value={title}
                    onChange={onChangeInput}
                    ref={titleRef}
                  />
                  :
                  <p className="content-input-text">
                    {eventData?.title}
                  </p>
              }
            </ContentGroupInput>
            <ContentGroupInput title="내용">
              {
                isEdit ?
                  <TextArea name="content" value={content} onChange={onChangeInput} ref={contentRef} />
                  :
                  <div className="content-input-textarea">
                    {convertLineBreak(eventData?.content)}
                  </div>
              }
            </ContentGroupInput>
            <ContentGroupInput title="이미지">
              {
                isEdit ?
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    beforeUpload={beforeUploadHandle}
                    onChange={onChangeUpload}
                  >
                    {fileList.length < 1 && '+ 추가'}
                  </Upload>
                  :
                  <Image className="content-image" src={`${IMAGE_URL}${eventData?.file}`} alt="이벤트 등록 이미지" />
              }
            </ContentGroupInput>
          </ContentInputGroup>
        </ContentGroup>

        <ContentGroup title="이벤트 안내">
          <ContentInputGroup>
            <ContentGroupInput title="기간">
              {
                isEdit ?
                  <ConfigProvider locale={locale}>
                    <RangePicker
                      format="YYYY-MM-DD"
                      placeholder={['시작일자', '종료일자']}
                      dateRender={dateRenderDatepicker}
                      onChange={onChangeDatepicker}
                      value={[moment(start_date), moment(end_date)]}
                    />
                  </ConfigProvider>
                  :
                  <RangePicker
                    format="YYYY-MM-DD"
                    value={[moment(eventData?.start_date), moment(eventData?.end_date)]}
                    disabled={true}
                  />
              }
            </ContentGroupInput>
            <ContentGroupInput title="가격">
              {
                isEdit ?
                  <Input
                    type="number"
                    name="cost"
                    min={0}
                    value={cost}
                    onChange={onChangeInput}
                    ref={costRef}
                  />
                  :
                  <p className="content-input-wrap">{eventData?.cost} 원</p>
              }
            </ContentGroupInput>
          </ContentInputGroup>
        </ContentGroup>

      </Content>
    </>
  );
};

export default index;