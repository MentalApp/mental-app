import React, { useMemo } from 'react';

import TablePaginationData from 'components/TablePagination';
import QuestionHeader from 'domain/guest/components/QuestionHeader/QuestionHeader';
import Wrapper from './PreviewPage.styles';
import { Button } from 'react-bootstrap';

const PreviewPage = ({ information, resultTest, data, note, handlePrevious, handleSubmit }) => {
  const restructureData = useMemo(() => {
    return data.map((item, index) => ({
      question: `${index + 1}. ${item.question}`,
      answer: resultTest[index]?.answer || '',
    }));
  }, [data, resultTest]);

  return (
    <Wrapper>
      <QuestionHeader information={information} />
      <TablePaginationData
        columns={[
          { name: 'Câu hỏi', field: 'question' },
          { name: 'Trả lời', field: 'answer' },
        ]}
        data={restructureData}
      />
      <div className="note-information">
        <p>Các triệu chứng bệnh khác (nếu có):</p>
        <p className="note-answer">{note?.for_me || ''}</p>
        <p>Các đồng chí trong cùng đơn vị có biểu hiện bất thường hoặc có triệu chứng bệnh như trên (nếu có):</p>
        <p className="note-answer">{note?.for_teammate || ''}</p>
      </div>
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
