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

  const [
    setAlertView,
    setAlertConfig,
    AuthAlert,
  ] = useAlert();

  const onSubmit = () => {
    button.onClick(input)
      .then(res => {
        document.cookie = `token=${res.data.token};`;
        setAlertView(true);
        setAlertConfig({
          title: '성공',
          type: '로그인',
          message: '로그인 되었습니다.',
          isOk: true,
          okOnClick: () => { router.push('/'); },
        })
      })
      .catch(error => {
        setAlertView(true);
        setAlertConfig({
          title: '실패',
          type: '로그인',
          message: error.response.data.msg,
          isOk: true,
        })
      });
  }

  useEffect(() => {
    if (isNotEmptyObjectValue(input)) {
      return setFormDisabled(false);
    }
    setFormDisabled(true);
  }, [input]);

  return (
    <>
      <AuthAlert />
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

export default InputForm;
