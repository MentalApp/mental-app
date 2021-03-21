import React from 'react';
import { Button, Container } from 'react-bootstrap';
import Wrapper from './QuestionSurvey.styles';

const QuestionSurvey = () => {
  return (
    <Wrapper>
      <Container>
        <div className="filter-question">
          <div className="filter-search">
            <div className="label-search">Tìm kiếm</div>
            <input type="text" />
          </div>
          <Button variant="outline-primary">Thêm câu hỏi</Button>
        </div>
      </Container>
    </Wrapper>
  );
};

export default QuestionSurvey;
