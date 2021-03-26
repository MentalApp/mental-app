import React, { useCallback } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useMutation } from 'hooks/axios.hooks';
import JoinInPageWrapper from './JoinInPage.styles';
import { useNavigation } from 'react-navi';

const JoinInPage = () => {
  const { navigate } = useNavigation();
  // const initialValues = { code: '' };
  // const [sign_in] = useMutation({ url: '/sign_in' });

  // const handleSubmit = useCallback();

  return (
    <JoinInPageWrapper>
      <Container>
        <Row className="justify-content-center">
          <Col sm={8} md={6} lg={5}>
            <div className="login-form">
              <form className="form-join">
                <input className="form-control" placeholder="Nhập mã kiểm tra" type="text" />
                <div className="wrapper">
                  <Button
                    variant="outline-success"
                    className="justify-content-center buttonTest"
                    type="submit"
                    onClick={() => navigate('/examination')}
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
