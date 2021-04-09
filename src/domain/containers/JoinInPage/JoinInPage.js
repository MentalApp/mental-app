import React, { useCallback, useState } from 'react';
import { Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import JoinInPageWrapper from './JoinInPage.styles';
import { useNavigation } from 'react-navi';
import { useMutation } from 'hooks/axios.hooks';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { CODE, ErrorMessage, ENTRYCODE_TOKEN } from 'utils/constants';

const JoinInPage = () => {
  const { navigate } = useNavigation();
  const [error, setError] = useState(null);

  const [joinin] = useMutation({ url: '/guest/joinin' });

  const initialValues = {
    code: '',
  };
  const validationSchema = Yup.object({
    // code: Yup.string().required('*Bắt buộc').trim().min(4, '*Mã tham gia quá ngắn'),
  });

  const handleSubmit = useCallback(
    (values, actions) => {
      const valuesCasted = validationSchema.cast(values);
      const valuesCloned = { ...valuesCasted };
      joinin({ ...valuesCloned })
        .then((response) => {
          if (!response.data.success) {
            setError(ErrorMessage.VALIDATE_CODE_INVALID);
            return;
          }
          window.localStorage.setItem(ENTRYCODE_TOKEN, JSON.stringify(response.data.token));
          window.localStorage.setItem(CODE, JSON.stringify(valuesCloned.code));
          navigate('/examination');
        })
        .catch((err) => {
          if (err.response?.status === 500) {
            setError(ErrorMessage.INTERNAL_SERVER_ERROR);
            return;
          }
          setError(ErrorMessage.VALIDATE_CODE_INVALID);
          return;
        })
        .finally(() => actions.setSubmitting(false));
    },
    [joinin, navigate, validationSchema],
  );

  setTimeout(() => {
    setError(null);
  }, 10000);

  return (
    <JoinInPageWrapper>
      <Container>
        <Row className="justify-content-center">
          <Col sm={10} md={6} lg={5}>
            <Card className="card-stats">
              <div className="login-form">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  {(props) => (
                    <form className="form-join" onSubmit={props.handleSubmit}>
                      <input
                        className={`form-control ${props.errors?.code && props.touched?.code ? 'has-error' : ''}`}
                        placeholder="Nhập mã đợt khảo sát"
                        type="text"
                        value={props.values.code}
                        onChange={(event) => props.setFieldValue('code', event.target.value)}
                      />
                      {props.errors?.code && props.touched?.code && (
                        <span className="help-block">{props.errors?.code}</span>
                      )}
                      {error && <Alert variant="danger">{error}</Alert>}

                      <div className="align--button">
                        <Button variant="outline-success" className="justify-content-center buttonTest" type="submit">
                          Bắt đầu
                        </Button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </JoinInPageWrapper>
  );
};

export default JoinInPage;
