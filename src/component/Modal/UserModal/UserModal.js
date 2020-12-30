import React from 'react';
import { Button, Modal } from 'antd';
import QuestionTitle from './UserModalTitle';
import Question from './Question';
import Answer from './Answer';
import { loadQuestionByIdAPI, updateAnswerAPI } from '../../../lib/api/question';
import useAlert from '../../../hooks/useAlert';

const UserModal = ({ visible = false, setVisible, index, beforeTrigger }) => {

  if (index === null) {
    return <></>;
  }

  const { response: { data, error, mutate, isValidating }, trigger } = loadQuestionByIdAPI(index);


  const [edit, setEdit] = React.useState(false);
  const [answer, setAnswer] = React.useState('');

  React.useEffect(() => {
    setAnswer(prev => data?.answer);
  }, [data]);

  const onChangeAnswer = (e) => {
    setAnswer(e.target.value);
  };
  const onClickClose = () => {
    beforeTrigger();
    setVisible(false);
  };
  const onClickEdit = () => {
    setEdit(true);
  };
  const onClickSuccess = async () => {
    const result = await updateAnswerAPI({ question_id: index, answer });
    MessageAlert({
      title: '답변 등록 완료',
      type: '답변 등록',
      message: result.data.msg,
      isSuccess: true,
      isOk: true,
      okOnClick: () => {
        setEdit(false);
        mutate();
      },
    });
  };

  const onClickCancle = () => {
    setEdit(false);
  }

  const {
    SuccessAlert,
    ErrorAlert,
    MessageAlert,
  } = useAlert();

  return (
    <>
      <SuccessAlert />
      <ErrorAlert />
      {
        <Modal
          transitionName=""
          maskTransitionName=""
          visible={visible}
          onOk={() => {
            setVisible(false);
          }}
          onCancel={() => {
            setVisible(false);
          }}
          centered={true}
          okType="default"
          closable={false}
          footer={null}
          maskClosable={false}
          disableAnimation={true}
          className="question-modal-wrap"
        >
          <QuestionTitle title={data?.title} />
          <Question question={data?.question} date={data?.create_date} />
          <Answer edit={edit} answer={data?.answer} input={answer} onChangeInput={onChangeAnswer}/>
          <div className="question-footer">
            {
              edit
                ?
                (
                  <>
                    <Button type="primary" onClick={onClickSuccess}>답변완료</Button>
                    <Button type="default" onClick={onClickCancle}>답변취소</Button>
                  </>
                )
                :
                <Button type="danger" onClick={onClickEdit}>답변수정</Button>
            }
            <Button type="default" onClick={onClickClose}>닫기</Button>
          </div>
        </Modal>
      }

    </>
  );
};

export default UserModal;
