import React from 'react';

import { Formik } from 'formik';
import ModalWrapper from './ModalPredict.style';
import { Modal, Form, Alert, Button } from 'react-bootstrap';
import { LIST_PREDICT, LIST_DIAGNOSIS } from 'utils/constants';

const ModalCreateForm = ({
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
        <ModalWrapper show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
          <Modal.Header className="text-center">
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={props.handleSubmit} autoComplete="off">
            <Modal.Body>
              <Form.Group controlId="predict">
                <Form.Label>Trả lời câu hỏi:</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(event) => {
                    props.setFieldValue('predict', event.target.value);
                  }}
                >
                  {LIST_PREDICT &&
                    LIST_PREDICT.map((item) => (
                      <option value={item.id} key={item.id} selected={item.id === props.values.predict}>
                        {item.name}
                      </option>
                    ))}
                </Form.Control>
                {props.touched.predict && props.errors.predict && <p className="error-text">{props.errors.predict}</p>}
              </Form.Group>

              <Form.Group controlId="diagnosis">
                <Form.Label>Phát hiện học viên:</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(event) => {
                    props.setFieldValue('diagnosis', event.target.value);
                  }}
                >
                  {LIST_DIAGNOSIS &&
                    LIST_DIAGNOSIS.map((item) => (
                      <option value={item.id} key={item.id} selected={item.id === props.values.diagnosis}>
                        {item.name}
                      </option>
                    ))}
                </Form.Control>
                {props.touched.diagnosis && props.errors.diagnosis && (
                  <p className="error-text">{props.errors.diagnosis}</p>
                )}
              </Form.Group>

              <Form.Group controlId="conflict">
                <Form.Label>Lý do.</Form.Label>
                <Form.Control
                  className={`input-control ${props.touched.conflict && props.errors.conflict ? 'has-error' : ''}`}
                  type="text"
                  placeholder="Nhập lý do"
                  value={props.values.conflict}
                  onChange={(event) => props.setFieldValue('conflict', event.target.value)}
                />
                {props.touched.conflict && props.errors.conflict && (
                  <p className="error-text">{props.errors.conflict}</p>
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
        </ModalWrapper>
      )}
    </Formik>
  );
};

export default ModalCreateForm;
