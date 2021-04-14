import React, { useCallback, useState, useMemo } from 'react';
import { useMutation, useQuery } from 'hooks/axios.hooks';
import Loading from 'components/Loading';
import QuestionForm from 'domain/components/QuestionForm/QuestionForm';
import { Button, Modal } from 'react-bootstrap';
import Wrapper, { WrapperModal } from './Question.styles';
import PreviewPage from '../PreviewPage';
import { useNavigation } from 'react-navi';
import { CODE, ENTRYCODE_TOKEN, ErrorMessage } from 'utils/constants';

const Question = ({ information, setToExamTest, resultTest, setResultTest }) => {
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);
  const [note, setNote] = useState({ for_me: '', for_teammate: '' });
  const [complete, setComplete] = useState(false);

  const { navigate } = useNavigation();
  const code = window.localStorage.getItem(CODE);

  const { data, loading } = useQuery({ url: '/guest/tests', params: { code: JSON.parse(code) } });
  const questions = useMemo(() => !!data && !!data.data && data.data?.questions, [data]);

  const [submit] = useMutation({ url: '/guest/officer_tests', method: 'POST' });

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
      militaryCode: information?.militaryCode,
      unit: information?.unit,
      rank: information?.rank,
      position: information?.position,
      answer: resultTest,
      testVersion: !!data && !!data.data && data.data?.testVersionId,
      otherSymptom: note?.for_me,
      otherPeople: note?.for_teammate,
    })
      .then((response) => {
        if (!response.data.success) {
          setError(ErrorMessage.INTERNAL_SERVER_ERROR);
          return;
        }
        setComplete(true);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setError(ErrorMessage.POST_TEST_IS_NOT_FOUND);
          setTimeout(() => {
            setError(null);
            localStorage.removeItem(ENTRYCODE_TOKEN);
            localStorage.removeItem(CODE);
            navigate('/');
          }, 5000);
          return;
        }
        if (err.response?.status === 500) {
          setError(ErrorMessage.INTERNAL_SERVER_ERROR);
          setTimeout(() => {
            setError(null);
            navigate('/examination');
          }, 5000);
          return;
        }
      });
  }, [submit, information, resultTest, data, note, navigate]);

  const handleAfterComplete = useCallback(() => {
    localStorage.removeItem(CODE);
    localStorage.removeItem(ENTRYCODE_TOKEN);
    setComplete(false);
    navigate('/');
  }, [navigate]);

  if (questions.length > 0 && count === questions?.length + 1) {
    return (
      <>
        <PreviewPage
          information={information}
          resultTest={resultTest}
          data={questions}
          note={note}
          handlePrevious={() => handleEvent('previous')}
          handleSubmit={handleSubmit}
          error={error}
          setError={setError}
        />
        <WrapperModal show={complete}>
          <Modal.Header>Đã hoàn thành khảo sát</Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleAfterComplete}>
              Trở về
            </Button>
          </Modal.Footer>
        </WrapperModal>
      </>
    );
  }

  return (
    <Wrapper>
      {loading && <Loading />}
      {!loading && (
        <>
          {count < questions?.length && (
            <QuestionForm
              question={!!questions && questions[count]}
              index={count}
              resultTest={resultTest}
              setResultTest={setResultTest}
            />
          )}
          {questions.length > 0 && count === questions?.length && (
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
            {questions.length > 0 && count < questions?.length && (
              <Button
                variant="outline-success"
                onClick={() => handleEvent('next')}
                disabled={resultTest.length === count}
              >
                Tiếp theo
              </Button>
            )}
            {questions.length > 0 && count === questions?.length && (
              <Button variant="outline-success" onClick={() => handleEvent('next')}>
                Kết thúc
              </Button>
            )}
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default Question;
