import React from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import styled from 'styled-components';

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
const ModalEditPassword = ({
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
          <Form onSubmit={props.handleSubmit} autoComplete="off">
            <Modal.Body>
              <Form.Group controlId="password">
                <Form.Label>Nhập mật khẩu hiện tại:</Form.Label>
                <Form.Control
                  className={`input-control ${props.touched.password && props.errors.password ? 'has-error' : ''}`}
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={props.values.password}
                  onChange={(event) => {
                    console.log(event.target.value);
                    props.setFieldValue('password', event.target.value);
                  }}
                />
                {props.touched.password && props.errors.password && (
                  <p className="error-text">{props.errors.password}</p>
                )}
              </Form.Group>
              <Form.Group controlId="newPassword">
                <Form.Label>Nhập mật khẩu mới:</Form.Label>
                <Form.Control
                  className={`input-control ${
                    props.touched.newPassword && props.errors.newPassword ? 'has-error' : ''
                  }`}
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  value={props.values.newPassword}
                  onChange={(event) => {
                    props.setFieldValue('newPassword', event.target.value);
                  }}
                />
                {props.touched.newPassword && props.errors.newPassword && (
                  <p className="error-text">{props.errors.newPassword}</p>
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

export default ModalEditPassword;
