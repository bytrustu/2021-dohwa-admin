import React from 'react';
import TextArea from 'antd/lib/input/TextArea';

const Answer = ({ edit, answer, input, onChangeInput }) => {

  return (
    <div className="answer">
      <span className="mark">답변</span>
      <p className="writing">
        {
          edit
            ?
            <TextArea value={input} onChange={onChangeInput}/>
            :
            <>
              {
                answer && answer.replace(/(?:\r\n|\r|\n)/g, '\n')
              }
            </>
        }
      </p>
    </div>
  );
};

export default React.memo(Answer);
