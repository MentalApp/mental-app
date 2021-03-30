import React, { useCallback, useState } from 'react';
import { Button, Container, Row, Col, Alert } from 'react-bootstrap';
import JoinInPageWrapper from './JoinInPage.styles';
import { useNavigation } from 'react-navi';
import { useMutation } from 'hooks/axios.hooks';
import { CODE, TOKEN } from 'utils/constants';

const JoinInPage = () => {
  const { navigate } = useNavigation();
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);

  const [joinin] = useMutation({ url: '/joinin' });

  const handleSubmit = useCallback(() => {
    joinin({ code: code })
      .then((response) => {
        if (!response.data.success) {
          setError('Mã kiểm tra không chính xác.');
        }
        window.localStorage.setItem(TOKEN, JSON.stringify(response.data.token));
        window.localStorage.setItem(CODE, JSON.stringify(code));

        navigate('/examination');
      })
      .catch(() => setError('Mã kiểm tra không chính xác.'));
  }, [code, joinin, navigate]);

  setTimeout(() => {
    setError(null);
  }, 5000);

  return (
    <JoinInPageWrapper>
      <Container>
        <Row className="justify-content-center">
          <Col sm={8} md={6} lg={5}>
            <div className="login-form">
              <form className="form-join">
                {error && <Alert variant="danger">{error}</Alert>}
                <input
                  className="form-control"
                  placeholder="Nhập mã kiểm tra"
                  type="text"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                />

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
