import React from 'react';

import { Formik } from 'formik';
import ModalWrapper from './ModalCreate.styles';
import { Modal, Form, Alert, Button } from 'react-bootstrap';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import vi from 'date-fns/locale/vi';
import { format } from 'date-fns';

registerLocale('vi', vi);

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
          <Form onSubmit={props.handleSubmit}>
            <Modal.Body>
              {console.log(props.values)}
              <Form.Group controlId="nameVersion">
                <Form.Label>Tên đợt khảo sát.</Form.Label>
                <Form.Control
                  className={`input-control ${props.touched.name && props.errors.name ? 'has-error' : ''}`}
                  type="text"
                  placeholder="Nhập tên mới"
                  value={props.values.name}
                  onChange={(event) => props.setFieldValue('name', event.target.value)}
                />
                {props.touched.name && props.errors.name && <p className="error-text">{props.errors.name}</p>}
              </Form.Group>

              <Form.Group controlId="descVersion">
                <Form.Label>Mô tả đợt khảo sát.</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập mô tả mới"
                  className={`input-control ${
                    props.touched.description && props.errors.description ? 'has-error' : ''
                  }`}
                  value={props.values.description}
                  onChange={(event) => props.setFieldValue('description', event.target.value)}
                />
                {props.touched.description && props.errors.description && (
                  <p className="error-text">{props.errors.description}</p>
                )}
              </Form.Group>

              <Form.Group controlId="authenVersion">
                <Form.Label>Mã đợt khảo sát.</Form.Label>
                <Form.Control
                  type="text"
                  className={`input-control ${props.touched.code && props.errors.code ? 'has-error' : ''}`}
                  placeholder="Nhập mã mới"
                  value={props.values.code}
                  onChange={(event) => props.setFieldValue('code', event.target.value)}
                />
                {props.touched.code && props.errors.code && <p className="error-text">{props.errors.code}</p>}
              </Form.Group>
              <Form.Group controlId="timeStartTestVersion">
                <Form.Label>Thời gian khảo sát.</Form.Label>
                <ReactDatePicker
                  className={props.touched.startDate && props.errors.startDate ? 'has-error' : ''}
                  value={
                    (!!props.values?.startDate && format(new Date(props.values?.startDate), 'dd/MM/yyyy HH:mm')) || null
                  }
                  onChange={(date) => props.setFieldValue('startDate', date.toISOString())}
                  dataFormat="dd/MM/yyyy HH:mm"
                  showMonthDropdown
                  showYearDropdown
                  showTimeSelect
                  selectsStart
                  selected={new Date(props.values.startDate)}
                  dropdownMode="select"
                  locale="vi"
                  placeholderText="Nhập ngày bắt đầu khảo sát"
                  startDate={new Date(props.values.startDate)}
                  endDate={new Date(props.values.endDate)}
                  maxDate={new Date(props.values.endDate)}
                  minDate={new Date()}
                />
                {props.touched.startDate && props.errors.startDate && (
                  <p className="error-text">{props.errors.startDate}</p>
                )}
              </Form.Group>
              <Form.Group controlId="timeEndTestVersion">
                <Form.Label>Thời gian kết thúc khảo sát.</Form.Label>
                <ReactDatePicker
                  className={props.touched.endDate && props.errors.endDate ? 'has-error' : ''}
                  value={
                    (!!props.values?.endDate && format(new Date(props.values?.endDate), 'dd/MM/yyyy HH:mm')) || null
                  }
                  onChange={(date) => props.setFieldValue('endDate', date.toISOString())}
                  dataFormat="dd/MM/yyyy HH:mm"
                  showMonthDropdown
                  showYearDropdown
                  showTimeSelect
                  selected={new Date(props.values.endDate)}
                  selectsEnd
                  dropdownMode="select"
                  locale="vi"
                  placeholderText="Nhập ngày kết thúc khảo sát"
                  startDate={new Date(props.values.startDate)}
                  endDate={new Date(props.values.endDate)}
                  minDate={new Date(props.values.startDate)}
                />
                {props.touched.endDate && props.errors.endDate && <p className="error-text">{props.errors.endDate}</p>}
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
