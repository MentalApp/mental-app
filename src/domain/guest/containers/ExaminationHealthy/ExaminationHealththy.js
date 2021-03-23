import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Wrapper from './ExaminationHealthy.styles';
import Information from './Information';
import Question from './Question';

const ExaminationHealth = () => {
  const [toExamtest, setToExamTest] = useState(false);
  const [information, setInformation] = useState({});

  if (!toExamtest) {
    return <Information onClick={setToExamTest} information={information} setInformation={setInformation} />;
  }
  return (
    <Wrapper>
      <Container>
        <Question information={information} />
      </Container>
    </Wrapper>
  );
};

export default ExaminationHealth;
