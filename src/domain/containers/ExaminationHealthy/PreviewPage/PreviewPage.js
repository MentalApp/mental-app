import React, { useMemo } from 'react';

import TablePaginationData from 'components/TablePagination';
import QuestionHeader from 'domain/components/QuestionHeader/QuestionHeader';
import Wrapper from './PreviewPage.styles';
import { Alert, Button, Container } from 'react-bootstrap';

const PreviewPage = ({ information, resultTest, data, note, handlePrevious, handleSubmit, error, setError }) => {
  const restructureData = useMemo(() => {
    return data.map((item, index) => ({
      question: `${index + 1}. ${item.question}`,
      answer: resultTest[index]?.answer || '',
    }));
  }, [data, resultTest]);

  return (
    <Wrapper>
      <QuestionHeader information={information} />
      <hr />
      <TablePaginationData
        columns={[
          { name: 'Câu hỏi', field: 'question', width: 'w-75' },
          { name: 'Trả lời', field: 'answer', width: 'w-25' },
        ]}
        data={restructureData}
      />
      <div className="note-information">
        <p>Các triệu chứng bệnh khác (nếu có):</p>
        <p className="note-answer">{note?.for_me || ''}</p>
        <p>Các đồng chí trong cùng đơn vị có biểu hiện bất thường hoặc có triệu chứng bệnh như trên (nếu có):</p>
        <p className="note-answer">{note?.for_teammate || ''}</p>
      </div>
      {error && (
        <Container>
          <Alert variant="danger">{error}</Alert>
        </Container>
      )}

      <div className="group-button">
        <Button variant="outline-secondary" onClick={handlePrevious}>
          Trở lại
        </Button>

        <Button variant="outline-success" onClick={handleSubmit}>
          Nộp
        </Button>
      </div>
    </Wrapper>
  );
};

export default PreviewPage;
