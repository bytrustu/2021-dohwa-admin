import React from 'react';
import { Button, Modal } from 'antd';
import UserModalTitle from './UserModalTitle';
import useAlert from '../../../hooks/useAlert';
import UserModalForm from './UserModalForm';
import useInputs from '../../../hooks/useInputs';
import { getTestRegExp, makeNameToObject } from '../../../lib/util';
import { addUsersAPI, editUsersAPI } from '../../../lib/api/user';


const UserModal = ({ data, visible = false, setVisible, index, beforeTrigger = () => {} }) => {

  const { form = [], info = {}, user } = data;
  const [input, onChangeInput, setInput] = useInputs(
    makeNameToObject(form.map(el => el.name)),
  );

  React.useEffect(() => {
    if (user) {
      const obj = Object.entries(input).reduce((acc, [k]) => {
        acc = {
          ...acc,
          [k]: user[k],
        };
        return acc;
      }, {});
      setInput({
        ...input,
        ...obj,
      });
    }
  }, []);

  const emailRef = React.useRef();
  const nameRef = React.useRef();
  const passwordRef = React.useRef();
  const phoneRef = React.useRef();
  const birthdayRef = React.useRef();

  const userRef = {
    name: nameRef,
    email: emailRef,
    password: passwordRef,
    phone: phoneRef,
    birthday: birthdayRef,
  };

  const onClickClose = () => {
    setVisible(false);
  };


  const onClickSuccess = async () => {
    const { email, password, name, phone, birthday } = input;
    const findRequiredByName = (name) => {
      return form.find(el => el.name === name).required;
    }
    if (findRequiredByName('email') && !getTestRegExp('email', email)) {
      emailRef.current.focus();
      MessageAlert({ title: '계정 등록 실패', type: '계정 등록', message: '이메일이 올바르지 않습니다.', isSuccess: false });
      return;
    }
    if (findRequiredByName('password') &&!getTestRegExp('password', password)) {
      passwordRef.current.focus();
      return MessageAlert({ title: '계정 등록 실패', type: '계정 등록', message: '비밀번호가 올바르지 않습니다.', isSuccess: false });
    }
    if (findRequiredByName('name') &&!getTestRegExp('name', name)) {
      nameRef.current.focus();
      return MessageAlert({ title: '계정 등록 실패', type: '계정 등록', message: '이름이 올바르지 않습니다.', isSuccess: false });
    }
    if (findRequiredByName('phone') && !getTestRegExp('phone', phone)) {
      phoneRef.current.focus();
      return MessageAlert({ title: '계정 등록 실패', type: '계정 등록', message: '전화번호가 올바르지 않습니다.', isSuccess: false });
    }
    if (findRequiredByName('birthday') && !getTestRegExp('birthday', birthday)) {
      birthdayRef.current.focus();
      return MessageAlert({ title: '계정 등록 실패', type: '계정 등록', message: '생년월이 올바르지 않습니다.', isSuccess: false });
    }
    try {
      const apiFunc = info.type === '등록' ? addUsersAPI : editUsersAPI;
      const result = await apiFunc({ ...input, type: 'email' });
      MessageAlert({
        title: `계정 ${info.type} 완료`,
        type: `계정 ${info.type}`,
        message: result.data.msg,
        isSuccess: true,
        okOnClick: () => {
          beforeTrigger();
          setVisible(false);
        },
      });
    } catch (e) {
      MessageAlert({ title: `계정 ${info.type} 실패`, type: `계정 ${info.type}`, message: e.response.data.msg, isSuccess: false });
    }
  };

  const {
    SuccessAlert,
    ErrorAlert,
    MessageAlert,
  } = useAlert();

  React.useEffect(() => {
    userRef[info?.focus]?.current?.focus();
  }, []);

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
          className="user-modal-wrap"
        >
          <UserModalTitle title={`계정 ${info?.type}`} />
          <UserModalForm
            userRef={userRef}
            input={input}
            onChangeInput={onChangeInput}
            form={form}
            data={info}
          />
          <div className="modal-footer">
            <Button type="default" onClick={onClickClose}>닫기</Button>
            <Button type="primary" onClick={onClickSuccess}>{info?.type}</Button>
          </div>
        </Modal>
      }

    </>
  );
};

export default UserModal;
