import React, { useCallback, useMemo, useState } from 'react';
import { Container, Button, Modal, Form, Badge, Alert } from 'react-bootstrap';
import { useNavigation } from 'react-navi';
import Wrapper, { ModalWrapper } from './VersionTest.styles';
// import data from './mockVersionTest.json';
import TablePaginationData from 'components/TablePagination';
import Filter from './FilterVersion';
import vi from 'date-fns/locale/vi';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery } from 'hooks/axios.hooks';
import InformationForm from 'domain/components/InformationForm/InformationForm';
import { compareDesc, format } from 'date-fns';

registerLocale('vi', vi);

const VersionTest = () => {
  const { navigate } = useNavigation();
  const [show, setShow] = useState(false);
  const [idTest, setIDTest] = useState(null);

  const [error, setError] = useState(null);

  const [createTestVersion] = useMutation({ url: '/admin/tests' });
  const [startVersion] = useMutation({ url: '/admin/tests/start' });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { data, loading, force } = useQuery({ url: '/admin/tests' });

  const collums = [
    {
      name: 'Đợt khảo sát',
      field: 'name',
    },
    {
      name: 'Mã khảo sát',
      field: 'code',
    },
    {
      name: 'Thời gian khảo sát',
      field: 'timer',
    },
    {
      name: 'Trạng thái',
      field: 'isClose',
    },
  ];

  const restructureData = useMemo(() => {
    if (!data) return;
    return (
      !!data &&
      data.data?.map((item) => ({
        ...item,
        name: <div onClick={() => navigate(`/version/${item.id}`)}>{item.name}</div>,
        isClose: item.isClose ? (
          <Badge onClick={() => setIDTest(item.id)} variant="success">
            Đang mở
          </Badge>
        ) : (
          <Badge variant="secondary">Đang đóng</Badge>
        ),
      }))
    );
  }, [data, navigate]);

  const initialValues = useMemo(
    () => ({
      questionIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
      name: '',
      description: '',
      code: '',
      start_date: '',
      end_date: '',
    }),
    [],
  );

  const validateSchema = Yup.object({
    name: Yup.string().required('*Bắt buộc').trim().max(255, '*Tên quá dài'),
    description: Yup.string().required('*Bắt buộc').trim().max(600, '*Mô tả quá dài'),
    code: Yup.string().required('*Bắt buộc').trim().min(4, '*Tối thiểu 4 ký tự'),
    start_date: Yup.string()
      .required('*Bắt buộc')
      .test('test_start_date', '*Ngày tạo không được sau ngày kết thúc', function (start_date) {
        if (!!this.parent.end_date) {
          return compareDesc(new Date(this.parent.end_date), new Date(start_date)) === -1;
        }
        return !this.parent.end_date;
      }),
    end_date: Yup.string().required('*Bắt buộc'),
  });

  const handleSubmit = useCallback(
    (values, actions) => {
      const valuesCasted = validateSchema.cast(values);
      const valuesCloned = { ...valuesCasted };
      createTestVersion({ ...valuesCloned })
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

  const initialValuesStart = useMemo(
    () => ({
      entryCode: '',
    }),
    [],
  );

  const validateSchemaStart = Yup.object({
    entryCode: Yup.string().required('*Bắt buộc').trim().min(4, '*Mã tham gia quá ngắn'),
  });

  const handleStart = useCallback(
    (values, actions) => {
      const valuesCasted = validateSchema.cast(values);
      const valuesCloned = { ...valuesCasted };
      startVersion({ id: idTest, ...valuesCloned })
        .then((response) => {
          if (!response.data.success) {
            setError({ type: 'danger', message: 'Bắt đầu đợt kiểm tra không thành công' });
            return;
          }
          setError({ type: 'success', message: 'Bắt đầu đợt kiểm tra thành công' });
          force();
        })
        .catch((er) => setError({ type: 'danger', message: 'Bắt đầu đợt kiểm tra không thành công' }))
        .finally(() => {
          setIDTest(null);
          setTimeout(() => {
            setError(null);
          }, 5000);
          actions.resetForm({ values: { ...initialValuesStart } });
        });
    },
    [force, idTest, initialValuesStart, startVersion, validateSchema],
  );

  return (
    <Wrapper>
      <Container fluid>
        <div style={{ display: 'flex' }}>
          <Button variant="primary" className="create--button" onClick={handleShow} style={{ marginLeft: 'auto' }}>
            Tạo
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
                        className={props.touched.start_date && props.errors.start_date ? 'has-error' : ''}
                        value={
                          (!!props.values?.start_date && format(props.values?.start_date, 'dd/MM/yyyy HH:mm')) || null
                        }
                        onChange={(date) => props.setFieldValue('start_date', date)}
                        dataFormat="dd/MM/yyyy HH:mm"
                        showMonthDropdown
                        showYearDropdown
                        showTimeSelect
                        selectsStart
                        selected={props.values.start_date}
                        dropdownMode="select"
                        locale="vi"
                        placeholderText="Nhập ngày bắt đầu khảo sát"
                        startDate={props.values.start_date}
                        endDate={props.values.end_date}
                        maxDate={props.values.end_date}
                        minDate={new Date()}
                      />
                      {props.touched.start_date && props.errors.start_date && (
                        <p className="error-text">{props.errors.start_date}</p>
                      )}
                    </Form.Group>
                    <Form.Group controlId="timeEndTestVersion">
                      <Form.Label>Thời gian kết thúc khảo sát.</Form.Label>
                      <ReactDatePicker
                        className={props.touched.end_date && props.errors.end_date ? 'has-error' : ''}
                        value={(!!props.values?.end_date && format(props.values?.end_date, 'dd/MM/yyyy HH:mm')) || null}
                        onChange={(date) => props.setFieldValue('end_date', date)}
                        dataFormat="dd/MM/yyyy HH:mm"
                        showMonthDropdown
                        showYearDropdown
                        showTimeSelect
                        selected={props.values.end_date}
                        selectsEnd
                        dropdownMode="select"
                        locale="vi"
                        placeholderText="Nhập ngày kết thúc khảo sát"
                        startDate={props.values.start_date}
                        endDate={props.values.end_date}
                        minDate={props.values.start_date}
                      />
                      {props.touched.end_date && props.errors.end_date && (
                        <p className="error-text">{props.errors.end_date}</p>
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
        </div>
        <div className="filter">
          <Filter />
        </div>
        <TablePaginationData columns={collums} isLoading={loading} data={restructureData} />

        <ModalWrapper show={!!idTest} onHide={() => setIDTest(null)} centered>
          <Modal.Header>Nhập mã tham gia khảo sát</Modal.Header>
          <Formik
            initialValues={initialValuesStart}
            validationSchema={validateSchemaStart}
            enableReinitialize
            onSubmit={handleStart}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit}>
                <Modal.Body>
                  <InformationForm
                    className={`input-control ${props.touched.entryCode && props.errors.entryCode ? 'has-error' : ''}`}
                    value={props.values?.entryCode}
                    onChange={(event) => props.setFieldValue('entryCode', event.target.value)}
                  />
                  {props.touched.entryCode && props.errors.entryCode && (
                    <p className="error-text">{props.errors.entryCode}</p>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="outline-success" type="submit">
                    Bắt đầu
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </ModalWrapper>
      </Container>
    </Wrapper>
  );
};

export default VersionTest;
