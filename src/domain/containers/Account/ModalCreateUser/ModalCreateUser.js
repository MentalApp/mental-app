import React from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import styled from 'styled-components';
import { uppercaseString } from 'utils/utils';

const WrapperModal = styled(Modal)`
  .error-text {
    margin: 0;
    color: red;
  }
  .react-datepicker-wrapper {
    display: unset;

    input {
      height: 40px;
      border: 1px solid #dddddd;
      border-radius: 5px;
      padding: 10px;
      color: #66615b;
    }
  }

  .has-error {
    border-color: red !important;
  }
`;
const ModalCreateUser = ({
  title,
  initialValues,
  validateSchema,
  handleSubmit,
  error,
  setError,
  show,
  handleClose,
}) => {
  return (
    <Formik initialValues={initialValues} validationSchema={validateSchema} enableReinitialize onSubmit={handleSubmit}>
      {(props) => (
        <WrapperModal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
          <Modal.Header className="text-center">
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={props.handleSubmit} autoComplete="off" autocomplete="off">
            <Modal.Body>
              <Form.Group controlId="fullName">
                <Form.Label>Họ và tên:</Form.Label>
                <Form.Control
                  className={`input-control ${props.touched.fullName && props.errors.fullName ? 'has-error' : ''}`}
                  type="text"
                  placeholder="Nhập tên mới"
                  value={props.values.fullName}
                  onChange={(event) => {
                    props.setFieldValue('fullName', uppercaseString(event.target.value));
                  }}
                />
                {props.touched.fullName && props.errors.fullName && (
                  <p className="error-text">{props.errors.fullName}</p>
                )}
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  autocomplete="off"
                  className={`input-control ${props.touched.email && props.errors.email ? 'has-error' : ''}`}
                  type="text"
                  placeholder="Nhập tên mới"
                  value={props.values.email}
                  onChange={(event) => {
                    props.setFieldValue('email', event.target.value);
                  }}
                />
                {props.touched.email && props.errors.email && <p className="error-text">{props.errors.email}</p>}
              </Form.Group>
              <Form.Group controlId="militaryCode">
                <Form.Label>Mã số quân nhân:</Form.Label>
                <Form.Control
                  className={`input-control ${
                    props.touched.militaryCode && props.errors.militaryCode ? 'has-error' : ''
                  }`}
                  type="text"
                  placeholder="Nhập tên mới"
                  value={props.values.militaryCode}
                  onChange={(event) => {
                    props.setFieldValue('militaryCode', event.target.value);
                  }}
                />
                {props.touched.militaryCode && props.errors.militaryCode && (
                  <p className="error-text">{props.errors.militaryCode}</p>
                )}
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Nhập mật khẩu hiện tại:</Form.Label>
                <Form.Control
                  className={`input-control ${props.touched.password && props.errors.password ? 'has-error' : ''}`}
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={props.values.password}
                  onChange={(event) => {
                    props.setFieldValue('password', event.target.value);
                  }}
                />
                {props.touched.password && props.errors.password && (
                  <p className="error-text">{props.errors.password}</p>
                )}
              </Form.Group>
              {!!error && <Alert variant={error?.type}>{error?.message}</Alert>}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  handleClose();
                  setError(null);
                  props.resetForm({ values: { ...initialValues } });
                }}
              >
                Hủy bỏ
              </Button>
              <Button variant="primary" type="submit">
                Khởi tạo
              </Button>
            </Modal.Footer>
          </Form>
        </WrapperModal>
      )}
    </Formik>
  );
};

export default ModalCreateUser;
