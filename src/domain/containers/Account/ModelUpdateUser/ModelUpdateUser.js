import React, { useMemo, useCallback, useState, useEffect } from 'react';
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
const ModalUpdateForm = ({
  title,
  initialValues,
  validateSchema,
  handleSubmit,
  error,
  setError,
  show,
  handleClose,
}) => {
  const [isSwitchOn, setIsSwitchOn] = useState(initialValues.isBlock === 2 ? true : false);
  const [labelSwitch, setLabelSwitch] = useState(initialValues.isBlock === 2 ? 'Đang hoạt động' : 'Đang bị khóa');

  const onSwitchAction = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  useEffect(() => {
    isSwitchOn ? setLabelSwitch('Đang hoạt động') : setLabelSwitch('Đang bị khóa');
  }, [isSwitchOn, labelSwitch]);

  return (
    <Formik initialValues={initialValues} validationSchema={validateSchema} enableReinitialize onSubmit={handleSubmit}>
      {(props) => (
        <WrapperModal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
          <Modal.Header className="text-center">
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={props.handleSubmit} autoComplete="off">
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
                    console.log(uppercaseString(event.target.value));
                  }}
                />
                {props.touched.fullName && props.errors.fullName && (
                  <p className="error-text">{props.errors.fullName}</p>
                )}
              </Form.Group>
              <Form.Group controlId="isBlock">
                <Form.Label>Thay đổi trạng thái tài khoản:</Form.Label>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label={labelSwitch}
                  onChange={() => {
                    onSwitchAction();
                    props.setFieldValue('isBlock', isSwitchOn === true ? 1 : 2);
                  }}
                  checked={isSwitchOn}
                />
              </Form.Group>
              {!!error && <Alert variant={error?.type}>{error?.message}</Alert>}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  handleClose();
                  setError(null);
                  setIsSwitchOn(initialValues.isBlock === 2 ? true : false);
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

export default ModalUpdateForm;
