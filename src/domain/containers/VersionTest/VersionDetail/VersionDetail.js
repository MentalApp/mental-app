import React, { useCallback, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'hooks/axios.hooks';
import { Container, Button, Modal, Alert, Form, Badge } from 'react-bootstrap';
import Wrapper, { ModalWrapper } from './VersionDetail.style';
// import questionsMock from '../../Home/Detail/questionsMock.json';
import Loading from 'components/Loading';
import { addHours, compareDesc, format } from 'date-fns';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import vi from 'date-fns/locale/vi';
import { Formik } from 'formik';
import * as Yup from 'yup';

registerLocale('vi', vi);

const VersionDetail = ({ id }) => {
  const { data, loading, force } = useQuery({ url: `/admin/tests/${id}` });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = useState(null);
  const [createTestVersion] = useMutation({ url: `/admin/tests/${id}`, method: 'PUT' });

  const dataDetail = useMemo(() => !loading && !!data && data.data, [data, loading]);
  const initialValues = useMemo(
    () => ({
      questionIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
      name: dataDetail?.name || '',
      description: dataDetail?.description || '',
      code: dataDetail?.code || '',
      startDate: new Date(dataDetail?.startDate) || '',
      endDate: new Date(dataDetail?.endDate) || '',
    }),
    [dataDetail],
  );

  const validateSchema = Yup.object({
    name: Yup.string().required('*Bắt buộc').trim().max(255, '*Tên quá dài'),
    description: Yup.string().required('*Bắt buộc').trim().max(600, '*Mô tả quá dài'),
    code: Yup.string().required('*Bắt buộc').trim().min(4, '*Tối thiểu 4 ký tự'),
    startDate: Yup.string()
      .required('*Bắt buộc')
      .test('test_startDate', '*Ngày tạo không được sau ngày kết thúc', function (startDate) {
        if (!!this.parent.endDate) {
          return compareDesc(new Date(this.parent.endDate), new Date(startDate)) === -1;
        }
        return !this.parent.endDate;
      }),
    endDate: Yup.string().required('*Bắt buộc'),
  });

  const handleSubmit = useCallback(
    (values, actions) => {
      const valuesCasted = validateSchema.cast(values);
      const valuesCloned = {
        ...valuesCasted,
        startDate: addHours(new Date(valuesCasted.startDate), 7).toISOString(),
        endDate: addHours(new Date(valuesCasted.endDate), 7).toISOString(),
      };
      createTestVersion({
        ...valuesCloned,
      })
        .then((response) => {
          if (!response.data.success) {
            setError({ type: 'danger', message: 'Tạo đợt kiểm tra không thành công' });
            return;
          }
          setError({ type: 'success', message: 'Tạo đợt kiểm tra thành công' });
          setTimeout(() => {
            handleClose();
            actions.resetForm({ values: { ...initialValues } });
          }, 3000);
          force();
        })
        .catch((er) => {
          setError({ type: 'danger', message: 'Tạo đợt kiểm tra không thành công' });
          setTimeout(() => {
            setError(null);
          }, 10000);
          return;
        })
        .finally(() => {
          setTimeout(() => {
            setError(null);
          }, 10000);
        });
    },
    [createTestVersion, force, initialValues, validateSchema],
  );

  return (
    <Wrapper>
      {loading && <Loading />}
      {!loading && data && (
        <Container>
          <div style={{ display: 'flex' }}>
            <Button variant="primary" onClick={handleShow} className="create--button" style={{ marginLeft: 'auto' }}>
              Sửa kì khảo sát
            </Button>
            <Formik
              initialValues={initialValues}
              validationSchema={validateSchema}
              enableReinitialize
              onSubmit={handleSubmit}
            >
              {(props) => (
                <ModalWrapper show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
                  <Modal.Header className="text-center">
                    <Modal.Title>Tạo đợt khảo sát</Modal.Title>
                  </Modal.Header>
                  <Form onSubmit={props.handleSubmit}>
                    <Modal.Body>
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
                            (!!props.values?.startDate && format(props.values?.startDate, 'dd/MM/yyyy HH:mm')) || null
                          }
                          onChange={(date) => props.setFieldValue('startDate', date)}
                          dataFormat="dd/MM/yyyy HH:mm"
                          showMonthDropdown
                          showYearDropdown
                          showTimeSelect
                          selectsStart
                          selected={props.values.startDate}
                          dropdownMode="select"
                          locale="vi"
                          placeholderText="Nhập ngày bắt đầu khảo sát"
                          startDate={props.values.startDate}
                          endDate={props.values.endDate}
                          maxDate={props.values.endDate}
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
                          value={(!!props.values?.endDate && format(props.values?.endDate, 'dd/MM/yyyy HH:mm')) || null}
                          onChange={(date) => props.setFieldValue('endDate', date)}
                          dataFormat="dd/MM/yyyy HH:mm"
                          showMonthDropdown
                          showYearDropdown
                          showTimeSelect
                          selected={props.values.endDate}
                          selectsEnd
                          dropdownMode="select"
                          locale="vi"
                          placeholderText="Nhập ngày kết thúc khảo sát"
                          startDate={props.values.startDate}
                          endDate={props.values.endDate}
                          minDate={props.values.startDate}
                        />
                        {props.touched.endDate && props.errors.endDate && (
                          <p className="error-text">{props.errors.endDate}</p>
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
                        Sửa
                      </Button>
                    </Modal.Footer>
                  </Form>
                </ModalWrapper>
              )}
            </Formik>
          </div>
          <div className="information">
            <div>
              <p className="row">
                <p className="col-6">Tên đợt khảo sát:</p> <p className="col-6">{data.data?.name || '-'}</p>
              </p>
              <p className="row">
                <p className="col-6">Mô tả đợt khảo sát:</p> <p className="col-6">{data.data?.description || '-'}</p>
              </p>
              <p className="row">
                <p className="col-6">Mã đợt khảo sát:</p> <p className="col-6">{data.data?.code || '-'}</p>
              </p>
              <p className="row">
                <p className="col-6">Thời gian bắt đầu đợt khảo sát:</p>
                <p className="col-6">{format(new Date(data.data?.startDate), 'dd/MM/yyyy HH:mm') || '-'}</p>
              </p>
              <p className="row">
                <p className="col-6">Thời gian kết thúc đợt khảo sát:</p>
                <p className="col-6">{format(new Date(data.data?.endDate), 'dd/MM/yyyy HH:mm') || '-'}</p>
              </p>
              <p className="row">
                <p className="col-6">Trạng thái đợt khảo sát:</p>
                <p className="col-6">
                  {compareDesc(new Date(data.data?.startDate), new Date()) !== -1 &&
                  compareDesc(new Date(), new Date(data.data?.endDate)) !== -1 ? (
                    <Badge variant="success">Đang mở</Badge>
                  ) : (
                    <Badge variant="secondary">Đang đóng</Badge>
                  )}
                </p>
              </p>
            </div>
          </div>
        </Container>
      )}
    </Wrapper>
  );
};

export default VersionDetail;

// code: "khaosatlan1"
// description: "Đợt khảo sát lần 1"
// entryCode: ""
// id: 1
// isClose: false
// name: "Khảo sát lần 1"
// questions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]
// testVersionId: "qwerty"
// timer: 90
