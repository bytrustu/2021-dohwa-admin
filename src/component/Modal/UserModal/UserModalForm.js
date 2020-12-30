import React from 'react';
import { Button, Form, Input } from 'antd';

const UserModalForm = ({ userRef, input, onChangeInput, form }) => {

  const [inputForm] = Form.useForm();

  return (
    <div>
      <Form
        form={inputForm}
        layout="vertical"
      >
        {
          form.map(el => (
            <Form.Item label={el.label} className={`input-form ${el.required && 'require'}`}>
              <Input
                type={el.type}
                name={el.name}
                value={input[el.name]}
                onChange={onChangeInput}
                placeholder={el.placeholder}
                readOnly={el.readonly}
                ref={userRef[el.name]}
              />
            </Form.Item>
          ))
        }
      </Form>
    </div>
  );
};

export default UserModalForm;
