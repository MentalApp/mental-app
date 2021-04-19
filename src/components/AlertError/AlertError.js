import React from 'react';
import { Row, Col, Container, Alert } from 'react-bootstrap';

const AlertError = ({ message, isShow, variant = 'danger' }) => {
  return (
    <Container className="mt-4">
      <Row className="d-flex justify-content-center ">
        <Col className="">
          <Alert show={isShow} variant={variant}>
            {message}
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default AlertError;
