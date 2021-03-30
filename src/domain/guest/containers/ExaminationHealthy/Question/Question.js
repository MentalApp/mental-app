import React, { useCallback, useState } from 'react';
import { useMutation, useQuery } from 'hooks/axios.hooks';
import Loading from 'components/Loading';
import QuestionForm from 'domain/guest/components/QuestionForm/QuestionForm';
import { Button } from 'react-bootstrap';
import Wrapper from './Question.styles';
import PreviewPage from '../PreviewPage';
import { useNavigation } from 'react-navi';
import dataMock from './mockData.json';

const Question = ({ information, setToExamTest, resultTest, setResultTest }) => {
  const [count, setCount] = useState(0);
  const [note, setNote] = useState({ for_me: '', for_teammate: '' });
  const { navigate } = useNavigation();
  const code = window.localStorage.getItem('code');

  const { data, loading } = useQuery({ url: '/tests', params: { code: code } });
  const [submit] = useMutation({ url: '/officer_tests', method: 'POST' });
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

  const handleSubmit = useCallback(() => {
    submit({
      name: information?.name,
      dateOfBirth: information?.yearOfBirth,
      nation: information?.nation,
      gender: information?.gender,
      joinArmy: information?.dateOfEnlistment,
      unit: information?.unit,
      rank: information?.rank,
      position: information?.position,
      answer: resultTest,
      testVersion: '2021/02',
      otherSymptom: note?.for_me,
      otherPeople: note?.for_teammate,
    })
      .then((response) => {
        // if (response.data.success) {
        navigate('/thanks');
        // }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [information, note, navigate, resultTest, submit]);

  if (count === dataMock?.length + 1) {
    return (
      <PreviewPage
        information={information}
        resultTest={resultTest}
        data={dataMock}
        note={note}
        handlePrevious={() => handleEvent('previous')}
        handleSubmit={handleSubmit}
      />
    );
  }
  if (loading) {
    <Wrapper>
      <Loading />
    </Wrapper>;
  }
  return (
    <Wrapper>
      {count < dataMock?.length && (
        <QuestionForm
          question={!!dataMock && dataMock[count]}
          index={count}
          resultTest={resultTest}
          setResultTest={setResultTest}
        />
      )}
      {count === dataMock?.length && (
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
        <Button
          variant="outline-secondary"
          onClick={() => {
            if (count === 0) {
              setToExamTest(false);
              return;
            }
            handleEvent('previous');
          }}
        >
          Về trước
        </Button>
        {count < dataMock?.length && (
          <Button variant="outline-success" onClick={() => handleEvent('next')}>
            Tiếp theo
          </Button>
        )}
        {count === dataMock?.length && (
          <Button variant="outline-success" onClick={() => handleEvent('next')}>
            Kết thúc
          </Button>
        )}
      </div>
    </Wrapper>
  );
};

export default Question;
