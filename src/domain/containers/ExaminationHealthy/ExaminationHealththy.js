import React, { useCallback, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Wrapper, { WrapperInfor } from './ExaminationHealthy.styles';
import Information from './Information';
import Question from './Question';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useCurrentRoute, useNavigation } from 'react-navi';
import Footer from 'components/Footer';

const ExaminationHealth = () => {
  const [toExamtest, setToExamTest] = useState(false);
  const [information, setInformation] = useState({});
  const [resultTest, setResultTest] = useState([]);
  const route = useCurrentRoute().url.pathname;
  const { _history } = useNavigation();

  useEffect(() => {
    route !== '/' && _history.replace('/examination');
  }, [_history, route]);

  const initialValues = {
    name: information?.name || '',
    yearOfBirth: information?.yearOfBirth || '',
    gender: information?.gender || '',
    nation: information?.nation || '',
    dateOfEnlistment: information?.dateOfEnlistment || '',
    militaryCode: information?.militaryCode || '',
    unit: information?.unit || '',
    rank: information?.rank || '',
    position: information?.position || '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('*Bắt buộc').trim().max(255, 'Tên quá dài'),
    yearOfBirth: Yup.string().required('*Bắt buộc'),
    gender: Yup.string().required('*Bắt buộc'),
    nation: Yup.string().required('*Bắt buộc').trim(),
    dateOfEnlistment: Yup.string().required('*Bắt buộc'),
    militaryCode: Yup.string().required('*Bắt buộc'),
    unit: Yup.string().required('*Bắt buộc').trim(),
    rank: Yup.string().required('*Bắt buộc').trim(),
    position: Yup.string().required('*Bắt buộc').trim(),
  });

  const handleSubmit = useCallback(
    (values) => {
      const valuesCasted = validationSchema.cast(values);
      const valuesCloned = { ...valuesCasted };
      setInformation(valuesCloned);
      setToExamTest(true);
    },
    [validationSchema],
  );

  if (!toExamtest) {
    return (
      <WrapperInfor>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(props) => <Information {...props} />}
        </Formik>
        <Footer />
      </WrapperInfor>
    );
  }
  return (
    <Wrapper>
      <Container>
        <Row className="justify-content-center">
          <Col sm={11} md={10} lg={7}>
            <Question
              information={information}
              setToExamTest={setToExamTest}
              resultTest={resultTest}
              setResultTest={setResultTest}
            />
          </Col>
        </Row>
      </Container>
      <Footer />
    </Wrapper>
  );
};

export default ExaminationHealth;
