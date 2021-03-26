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
      <div>
        <p>
          {index + 1}. {question?.question}
        </p>
        <input
          type="radio"
          id="true"
          name="question"
          className="input-yes"
          checked={resultTest[index]?.answer === 'Có'}
          onChange={(e) => {
            if (e.currentTarget.checked) {
              handleSelect({ test_pool_id: question?.id, answer: 'Có' });
            }
          }}
        />
        <label htmlFor="true">Có</label>
        <input
          type="radio"
          id="false"
          name="question"
          className="input-no"
          checked={resultTest[index]?.answer === 'Không'}
          onChange={(e) => {
            if (e.currentTarget.checked) {
              handleSelect({ test_pool_id: question?.id, answer: 'Không' });
            }
          }}
        />
        <label htmlFor="false">Không</label>
      </div>
    </Wrapper>
  );
};

export default QuestionForm;
