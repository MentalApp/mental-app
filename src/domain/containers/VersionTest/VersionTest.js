import React, { useCallback, useMemo, useState } from 'react';
import { Container, Button, Modal, Form, Badge } from 'react-bootstrap';
import { useNavigation } from 'react-navi';
import Wrapper, { ModalWrapper } from './VersionTest.styles';
// import data from './mockVersionTest.json';
import TablePaginationData from 'components/TablePagination';
import Filter from './FilterVersion';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useMutation, useQuery } from 'hooks/axios.hooks';
import InformationForm from 'domain/components/InformationForm/InformationForm';
import { addHours, compareDesc, format, subHours } from 'date-fns';
import ModalCreateForm from './ModalCreate';

const VersionTest = () => {
  const { navigate } = useNavigation();
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [idTest, setIDTest] = useState(null);

  const [error, setError] = useState(null);

  const [createTestVersion] = useMutation({ url: '/admin/tests' });
  const [startVersion] = useMutation({ url: '/admin/tests/start' });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { data, loading, force } = useQuery({ url: '/admin/tests', params: { page } });

  const collums = [
    {
      name: 'STT',
      field: 'stt',
    },
    {
      name: 'Đợt khảo sát',
      field: 'name',
    },
    {
      name: 'Mã khảo sát',
      field: 'code',
    },
    {
      name: 'Thời gian bắt đầu',
      field: 'startDate',
    },
    {
      name: 'Thời gian kết thúc',
      field: 'endDate',
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
      data.data?.map((item, index) => ({
        ...item,
        stt: index + 1,
        name: <div className="typography">{item.name}</div>,
        startDate: <div>{format(subHours(new Date(item.startDate), 7), 'dd/MM/yyyy HH:mm')}</div>,
        endDate: <div>{format(subHours(new Date(item.endDate), 7), 'dd/MM/yyyy HH:mm')}</div>,
        isClose:
          compareDesc(subHours(new Date(item.startDate), 7), new Date()) !== -1 &&
          compareDesc(new Date(), subHours(new Date(item.endDate), 7)) !== -1 ? (
            <Badge variant="success">Đang mở</Badge>
          ) : (
            <Badge variant="secondary">Đang đóng</Badge>
          ),
        onClick: () => navigate(`/version/${item.id}`),
      }))
    );
  }, [data, navigate]);

  const initialValues = useMemo(
    () => ({
      questionIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
      name: '',
      description: '',
      code: '',
      startDate: '',
      endDate: '',
    }),
    [],
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

          <ModalCreateForm
            title="Tạo đợt khảo sát"
            initialValues={initialValues}
            validateSchema={validateSchema}
            handleSubmit={handleSubmit}
            show={show}
            error={error}
            setError={setError}
            handleClose={handleClose}
          />
        </div>
        <div className="filter">
          <Filter />
        </div>
        <TablePaginationData
          columns={collums}
          isLoading={loading}
          data={restructureData}
          page={page}
          totalPages={(data && data.totalPages) || 0}
          onChangePage={(page) => {
            setPage(page);
          }}
        />

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
