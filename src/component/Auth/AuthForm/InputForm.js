import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import useInputs from '../../../hooks/useInputs';
import { isNotEmptyObjectValue, makeNameToObject } from '../../../lib/util';
import useAlert from '../../../hooks/useAlert';
import { useRouter } from 'next/router';

const InputForm = ({ data }) => {
  const { form, button } = data;
  const [inputForm] = Form.useForm();
  const [formDisabled, setFormDisabled] = useState(true);

  const [input, onChangeInput] = useInputs(
    makeNameToObject(form.map(el => el.name)),
  );

  const router = useRouter();

  const {
    SuccessAlert,
    ErrorAlert,
    MessageAlert,
  } = useAlert();

  const onSubmit = () => {
    button.onClick(input)
      .then(res => {
        document.cookie = `token=${res.data.token};`;
        MessageAlert({
          title: '로그인 인증 완료',
          type: '로그인 인증',
          message: '로그인 되었습니다.',
          okOnClick: () => {
            router.push('/');
          },
          isSuccess: true,
        });
      })
      .catch(error => {
        MessageAlert({
          title: '로그인 인증 실패',
          type: '로그인 인증',
          message: error.response.data.msg,
          isSuccess: false,
        });
      });
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
              {button.text}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default React.memo(InputForm);
