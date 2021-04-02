import React, { useCallback, useState } from 'react';
import { Button, Container, Row, Col, Alert } from 'react-bootstrap';
import JoinInPageWrapper from './JoinInPage.styles';
import { useNavigation } from 'react-navi';
import { useMutation } from 'hooks/axios.hooks';
import { CODE, TOKEN, ErrorMessage } from 'utils/constants';

const JoinInPage = () => {
  const { navigate } = useNavigation();
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);

  const [joinin] = useMutation({ url: '/joinin' });

  const handleSetCode = useCallback((event) => setCode(event.target.value), []);

  const handleSubmit = useCallback(() => {
    joinin({ code: code })
      .then((response) => {
        if (!response.data.success) {
          setError(ErrorMessage.VALIDATE_CODE_INVALID);
        }
        window.localStorage.setItem(TOKEN, JSON.stringify(response.data.token));
        window.localStorage.setItem(CODE, JSON.stringify(code));

        navigate('/examination');
      })
      .catch((err) => {
        if (err?.response.status === 500) {
          setError(ErrorMessage.INTERNAL_SERVER_ERROR);
          return;
        }
        setError(ErrorMessage.VALIDATE_CODE_INVALID);
      });
  }, [code, joinin, navigate]);

  setTimeout(() => {
    setError(null);
  }, 5000);

  return (
    <JoinInPageWrapper>
      <Container>
        <Row className="justify-content-center">
          <Col sm={10} md={6} lg={5}>
            <div className="login-form">
              <form className="form-join">
                <input
                  className="form-control"
                  placeholder="Nhập mã kiểm tra"
                  type="text"
                  value={code}
                  onChange={handleSetCode}
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
