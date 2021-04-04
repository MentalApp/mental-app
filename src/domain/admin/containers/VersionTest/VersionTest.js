import React, { useCallback, useMemo, useState } from 'react';
import { Container, Button, Modal, Form } from 'react-bootstrap';
import { useNavigation } from 'react-navi';
import Wrapper from './VersionTest.styles';
import data from './mockVersionTest.json';
import TablePaginationData from 'components/TablePagination';
import Filter from './FilterVersion';
import vi from 'date-fns/locale/vi';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery } from 'hooks/axios.hooks';

registerLocale('vi', vi);

const VersionTest = () => {
  const { navigate } = useNavigation();
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);

  const [createTestVersion] = useMutation({ url: '/tests' });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { data: dataSv, force } = useQuery({ url: '/tests' });
  console.log(dataSv);
  const collums = [
    {
      name: 'Đợt kiểm tra',
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
      name: '',
      field: 'isClose',
    },
  ];

  const restructureData = useMemo(() => {
    if (!data) return;
    return (
      !!data &&
      data.data?.map((item) => ({
        ...item,
        isClose: (
          <label className="switch">
            <input type="checkbox" checked />
            <span className="slider round"></span>
          </label>
        ),
        // onClick: () => navigate(`/version/${item.id}`),
      }))
    );
  }, [navigate]);

  const initialValues = {
    questionIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
    name: '',
    description: '',
    code: '',
    timer: '',
    isClose: false,
  };

  const validateSchema = Yup.object({
    name: Yup.string().required('*Bắt buộc').trim().max(255, '*Tên quá dài'),
    description: Yup.string().required('*Bắt buộc').trim().max(600, '*Mô tả quá dài'),
    code: Yup.string().required('*Bắt buộc').trim().min(4, '*Tối thiểu 4 ký tự'),
    timer: Yup.string().required('*Bắt buộc'),
  });

  const handleSubmit = useCallback(
    (values) => {
      const valuesCasted = validateSchema.cast(values);
      const valuesCloned = { ...valuesCasted };
      createTestVersion({ ...valuesCloned })
        .then((response) => {
          if (!response.data.success) {
            setError('Tạo đợt kiểm tra không thành công');
            return;
          }
          force();
        })
        .catch((er) => console.log(er))
        .finally(handleClose);
    },
    [createTestVersion, force, validateSchema],
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
              <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
                <Modal.Header className="text-center">
                  <Modal.Title>Tạo đợt khảo sát</Modal.Title>
                </Modal.Header>
                <Form onSubmit={props.handleSubmit}>
                  <Modal.Body>
                    {console.log(props.errors, props.values)}
                    <Form.Group controlId="nameVersion">
                      <Form.Label>Tên đợt khảo sát.</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập tên mới"
                        value={props.values.name}
                        onChange={(event) => props.setFieldValue('name', event.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="descVersion">
                      <Form.Label>Mô tả đợt khảo sát.</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập mô tả mới"
                        value={props.values.description}
                        onChange={(event) => props.setFieldValue('description', event.target.value)}
                      />
                    </Form.Group>
                    {/* <Form.Group controlId="timeTestVersion">
                      <Form.Label>Thời gian khảo sát.</Form.Label>
                      <ReactDatePicker
                        className={touched.yearOfBirth && errors.yearOfBirth ? 'has-error' : ''}
                        value={(!!values?.yearOfBirth && values?.yearOfBirth) || null}
                        onChange={(date) => setFieldValue('yearOfBirth', format(date, 'dd/MM/yyyy'))}
                        dataFormat="dd/MM/yyyy"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        locale="vi"
                      />
                    </Form.Group> */}

                    <Form.Group controlId="authenVersion">
                      <Form.Label>Mã tham gia đợt khảo sát.</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập mã mới"
                        value={props.values.code}
                        onChange={(event) => props.setFieldValue('code', event.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="timerTestVersion">
                      <Form.Label>Thời gian khảo sát (phút).</Form.Label>
                      <Form.Control
                        type="number"
                        value={props.values.timer}
                        onChange={(event) => props.setFieldValue('timer', event.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        label="Bắt đầu đợt kiểm tra lập tức"
                        checked={props.values.isClose}
                        onChange={(event) => props.setFieldValue('isClose', event.target.checked)}
                      />
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Hủy bỏ
                    </Button>
                    <Button variant="primary" type="submit">
                      Khởi tạo
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal>
            )}
          </Formik>
        </div>
        <div className="filter">
          <Filter />
        </div>
        <TablePaginationData columns={collums} data={restructureData} />
      </Container>
    </Wrapper>
  );
};

export default VersionTest;
