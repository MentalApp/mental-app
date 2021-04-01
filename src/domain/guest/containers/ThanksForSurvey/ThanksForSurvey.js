import React, { useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Wrapper from './ThanksForSurvey.styles';
import { useNavigation } from 'react-navi';

const ThanksForSurvey = () => {
  const { navigate } = useNavigation();

  useEffect(() => localStorage.clear(), []);

  const handleback = () => {
    navigate('/');
  };

  return (
    <Wrapper>
      <Container>
        <Row className="justify-content-center">
          <Col sm={10} md={8} lg={7}>
            <div className="thanks-text">
              <p>Cảm ơn bạn đã tham gia khảo sát.</p>
              <Button variant="outline-success" className="button-back" onClick={handleback}>
                Quay lại
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default ThanksForSurvey;
