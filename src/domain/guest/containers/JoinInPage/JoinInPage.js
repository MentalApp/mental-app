import React, { useState } from 'react';
import { Button, Container, Row, Col, Alert } from 'react-bootstrap';
import JoinInPageWrapper from './JoinInPage.styles';
import { useNavigation } from 'react-navi';
import { Error, CodeTest } from 'const';

const JoinInPage = () => {
  const initialCodeMock = CodeTest;
  const { navigate } = useNavigation();
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);

  const handleCode = (e) => {
    setCode(e.target.value);
  };
  const handleSubmit = () => {
    setError(null);
    if (initialCodeMock === code) {
      localStorage.setItem('validCode', true);
      navigate('/examination');
    }
    setTimeout(() => {
      setError(Error.VALIDATION_CODE_INVALID);
    }, 500);
    setCode('');
  };

  return (
    <JoinInPageWrapper>
      <Container>
        <Row className="justify-content-center">
          <Col sm={8} md={6} lg={5}>
            <div className="login-form">
              <form className="form-join">
                <input
                  className="form-control"
                  placeholder="Nhập mã kiểm tra"
                  type="text"
                  value={code}
                  onChange={handleCode}
                />
                {error && <Alert variant="danger">{error}</Alert>}
                <div className="wrapper">
                  <Button
                    variant="outline-success"
                    className="justify-content-center buttonTest"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Kiểm tra
                  </Button>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </JoinInPageWrapper>
  );
};

export default JoinInPage;
