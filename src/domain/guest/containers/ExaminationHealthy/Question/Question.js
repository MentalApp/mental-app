import React, { useCallback, useState } from 'react';
import { useQuery } from 'hooks/axios.hooks';
import Loading from 'components/Loading';
import QuestionForm from 'domain/guest/components/QuestionForm/QuestionForm';
import { Button } from 'react-bootstrap';
import Wrapper from './Question.styles';
import PreviewPage from '../PreviewPage';

const Question = ({ information }) => {
  const [count, setCount] = useState(0);
  const [resultTest, setResultTest] = useState([]);
  const [note, setNote] = useState({ for_me: '', for_teammate: '' });

  const { data, loading } = useQuery({ url: '/tests' });

  const handleEvent = useCallback(
    (action) => {
      if (action === 'next') {
        setCount(count + 1);
      }
      if (action === 'previous') {
        setCount(count - 1);
      }
    },
    [count],
  );

  if (count === data?.length + 1) {
    return (
      <PreviewPage
        information={information}
        resultTest={resultTest}
        data={data}
        note={note}
        handlePrevious={() => handleEvent('previous')}
      />
    );
  }

  return (
    <Wrapper>
      {loading && <Loading />}
      {count < data?.length && (
        <QuestionForm
          question={!!data && data[count].question}
          index={count}
          resultTest={resultTest}
          setResultTest={setResultTest}
        />
      )}
      {count === data?.length && (
        <div className="note-if">
          <p>Các triệu chứng bệnh khác (nếu có):</p>
          <textarea
            value={note.for_me}
            onChange={(event) => setNote({ ...note, for_me: event.target.value })}
            rows="4"
          />
          <p>Các đồng chí trong cùng đơn vị có biểu hiện bất thường hoặc có triệu chứng bệnh như trên (nếu có):</p>
          <textarea
            value={note.for_teammate}
            onChange={(event) => setNote({ ...note, for_teammate: event.target.value })}
            rows="4"
          />
        </div>
      )}
      <div className="group-button">
        <Button variant="outline-secondary" onClick={() => handleEvent('previous')} disabled={count === 0}>
          Câu trước
        </Button>
        {count < data?.length && (
          <Button variant="outline-success" onClick={() => handleEvent('next')}>
            Tiếp theo
          </Button>
        )}
        {count === data?.length && (
          <Button variant="outline-success" onClick={() => handleEvent('next')}>
            Kết thúc
          </Button>
        )}
      </div>
    </Wrapper>
  );
};

export default Question;
