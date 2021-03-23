import { useCallback } from 'react';
import Wrapper from './QuestionForm.styles';

const QuestionForm = ({ question, index, resultTest, setResultTest }) => {
  const handleSelect = useCallback(
    (value) => {
      const newValues = [...resultTest];
      newValues.splice(index, 1, value);

      setResultTest(newValues);
    },
    [index, resultTest, setResultTest],
  );

  return (
    <Wrapper>
      <p>
        {index + 1}. {question}
      </p>
      <input
        type="radio"
        id="true"
        name="question"
        className="input-yes"
        checked={resultTest[index] === '0'}
        onChange={(e) => {
          if (e.currentTarget.checked) {
            handleSelect('0');
          }
        }}
      />
      <label htmlFor="true">Có</label>
      <input
        type="radio"
        id="false"
        name="question"
        className="input-no"
        checked={resultTest[index] === '1'}
        onChange={(e) => {
          if (e.currentTarget.checked) {
            handleSelect('1');
          }
        }}
      />
      <label htmlFor="false">Không</label>
    </Wrapper>
  );
};

export default QuestionForm;
