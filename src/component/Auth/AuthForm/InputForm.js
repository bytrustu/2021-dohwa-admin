import React, { useState, useEffect } from 'react';
import style from './AuthForm.module.scss';
import { Form, Input, Button } from 'antd';
import useInputs from '../../../hooks/useInputs';
import { isNotEmptyObjectValue, makeNameToObject } from '../../../utils';

const InputForm = ({ data }) => {
  const { form, button } = data;
  const [inputForm] = Form.useForm();
  const [formDisabled, setFormDisabled] = useState(true);

  const [input, onChangeInput] = useInputs(
    makeNameToObject(form.map(el => el.name))
  );

  useEffect(() => {
    if (isNotEmptyObjectValue(input)) {
      return setFormDisabled(false);
    }
    setFormDisabled(true);
  }, [input])

  return (
    <div className={style.inputWrap}>
      <Form
        form={inputForm}
        layout="vertical"
      >
        {
          form.map(el => (
            <Form.Item label={el.label} className={style.inputForm}>
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

        <Form.Item className={style.inputForm}>
          <Button
            type="primary"
            onClick={button.onClick}
            disabled={formDisabled}
          >
            {button.text}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default InputForm;
