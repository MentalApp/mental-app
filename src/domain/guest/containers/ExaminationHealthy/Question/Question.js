import React, { useCallback, useState } from 'react';
import { useQuery } from 'hooks/axios.hooks';
import Loading from 'components/Loading';
import QuestionHeader from 'domain/guest/components/QuestionHeader/QuestionHeader';
import QuestionForm from 'domain/guest/components/QuestionForm/QuestionForm';
import { Button } from 'react-bootstrap';

const Question = ({ information }) => {
  const [count, setCount] = useState(0);
  const { data, force, loading } = useQuery({ url: '/questions' });

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
  return (
    <>
      {loading && <Loading />}
      <QuestionHeader information={information} />
      <QuestionForm question={!!data && data[count].question} />
      <div className="group-button">
        <Button variant="outline-secondary" onClick={() => handleEvent('previous')} disabled={count === 0}>
          Câu trước
        </Button>
        <Button variant="outline-success" onClick={() => handleEvent('next')} disabled={count === data?.length - 1}>
          Tiếp theo
        </Button>
      </div>
    </>
  );
};

export default Question;
