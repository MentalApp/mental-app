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
        <p className="format--quest">
          {index + 1}. {question?.question}
        </p>
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <input
              type="radio"
              id="false"
              name="question"
              className="input-yes"
              checked={resultTest[index]?.answer === 'Không có'}
              onChange={(e) => {
                if (e.currentTarget.checked) {
                  handleSelect({ test_pool_id: question?.id, answer: 'Không có' });
                }
              }}
            />
            <label htmlFor="false">Không có</label>
          </div>
          <div className="col-md-6 col-sm-12">
            <input
              type="radio"
              id="sometime"
              name="question"
              className="input-no"
              checked={resultTest[index]?.answer === 'Thỉnh thoảng'}
              onChange={(e) => {
                if (e.currentTarget.checked) {
                  handleSelect({ test_pool_id: question?.id, answer: 'Thỉnh thoảng' });
                }
              }}
            />
            <label htmlFor="sometime">Thỉnh thoảng</label>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <input
              type="radio"
              id="usually"
              name="question"
              className="input-no"
              checked={resultTest[index]?.answer === 'Thường xuyên'}
              onChange={(e) => {
                if (e.currentTarget.checked) {
                  handleSelect({ test_pool_id: question?.id, answer: 'Thường xuyên' });
                }
              }}
            />
            <label htmlFor="usually">Thường xuyên</label>
          </div>
          <div className="col-md-6 col-sm-12">
            <input
              type="radio"
              id="always"
              name="question"
              className="input-no"
              checked={resultTest[index]?.answer === 'Hầu như cả ngày'}
              onChange={(e) => {
                if (e.currentTarget.checked) {
                  handleSelect({ test_pool_id: question?.id, answer: 'Hầu như cả ngày' });
                }
              }}
            />
            <label htmlFor="always">Hầu như cả ngày</label>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default QuestionForm;
