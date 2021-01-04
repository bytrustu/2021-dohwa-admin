import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import useInputs from '../../../hooks/useInputs';
import { isNotEmptyObjectValue, makeNameToObject } from '../../../lib/util';
import useAlert from '../../../hooks/useAlert';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';


const InputForm = ({ data }) => {
  const { form, request } = data;
  const [inputForm] = Form.useForm();
  const [formDisabled, setFormDisabled] = useState(true);

  const [input, onChangeInput, setInput] = useInputs(
    makeNameToObject(form.map(el => el.name)),
  );

  const router = useRouter();

  const {
    SuccessAlert,
    ErrorAlert,
    MessageAlert,
  } = useAlert();

  const onSubmit = async () => {
    if (request.type === '로그인') {
      try {
        const result = await request.funcAPI(input);
        new Cookies().set('token', result.data.token, { path: '/' });
        MessageAlert({
          title: '로그인 인증 완료',
          type: '로그인 인증',
          message: '로그인 되었습니다.',
          okOnClick: () => {
            router.push('/');
          },
          isSuccess: true,
        });
      } catch (e) {
        MessageAlert({
          title: '로그인 인증 실패',
          type: '로그인 인증',
          message: e.response.data.msg,
          isSuccess: false,
        });
      }
    }
    if (request.type === '가입') {
      try {
        const result = await request.funcAPI(input);
        MessageAlert({
          title: '계정 가입 완료',
          type: '계정 가입',
          message: result.data.msg,
          okOnClick: () => {
            setInput({
              email: '',
              password: '',
              name: ''
            })
          },
          isSuccess: true,
        });
      } catch (e) {
        MessageAlert({
          title: '계정 가입 실패',
          type: '계정 가입',
          message: e.response.data.msg,
          isSuccess: false,
        });
      }
    }
  };

  useEffect(() => {
    if (isNotEmptyObjectValue(input)) {
      return setFormDisabled(false);
    }
    setFormDisabled(true);
  }, [input]);

  return (
    <>
      <SuccessAlert />
      <ErrorAlert />
      <div className='input-wrap'>
        <Form
          form={inputForm}
          layout="vertical"
        >
          {
            form.map(el => (
              <Form.Item label={el.label} className='input-form'>
                <Input
                  type={el.type}
                  name={el.name}
                  value={input[el.name]}
                  onChange={onChangeInput}
                  placeholder={el.placeholder}
                />
              </Form.Item>
            ))
          }

          <Form.Item className='input-form'>
            <Button
              type="primary"
              onClick={onSubmit}
              disabled={formDisabled}
            >
              {request.type}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default React.memo(InputForm);
