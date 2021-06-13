import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Container, Button, Modal, Form, Badge } from 'react-bootstrap';
import { useCurrentRoute, useNavigation } from 'react-navi';
import Wrapper, { ModalWrapper } from './VersionTest.styles';
// import data from './mockVersionTest.json';
import TablePaginationData from 'components/TablePagination';
import Filter from './FilterVersion';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useMutation, useQuery } from 'hooks/axios.hooks';
import InformationForm from 'domain/components/InformationForm/InformationForm';
import { addDays, compareDesc, format } from 'date-fns';
import ModalCreateForm from './ModalCreate';
import { toastSuccess } from 'utils/toastify';

const VersionTest = () => {
  const [params, setParams] = useState({});
  const { navigate } = useNavigation();
  const pathName = useCurrentRoute().url.pathname;

  const { _history } = useNavigation();
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [idTest, setIDTest] = useState(null);
  const [error, setError] = useState(null);

  const [createTestVersion] = useMutation({ url: '/admin/tests' });
  const [startVersion] = useMutation({ url: '/admin/tests/start' });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { data, loading, force } = useQuery({ url: '/admin/tests', params: { ...params, page } });

  useEffect(() => {
    pathName !== '/version_tests' && _history.replace('/version_tests');
  }, [_history, pathName]);

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

  const handleOnFilter = useCallback(
    (queryObject) => {
      setPage(1);
      const newQuery = { ...params, ...queryObject };
      Object.keys(newQuery).forEach((key) => {
        if (!newQuery[key]) {
          delete newQuery[key];
        }
      });
      setParams(newQuery);
    },
    [params],
  );

  const restructureData = useMemo(() => {
    if (!data) return;
    return (
      !!data &&
      data.data?.map((item, index) => ({
        ...item,
        stt: index + 1,
        name: <div className="typography">{item.name}</div>,
        startDate: <div>{format(new Date(item.startDate), 'dd/MM/yyyy HH:mm')}</div>,
        endDate: <div>{format(new Date(item.endDate), 'dd/MM/yyyy HH:mm')}</div>,
        isClose:
          compareDesc(new Date(item.startDate), new Date()) !== -1 &&
          compareDesc(new Date(), new Date(item.endDate)) !== -1 ? (
            <Badge variant="success">Đang mở</Badge>
          ) : (
            <Badge variant="secondary">Đang đóng</Badge>
          ),
        onClick: () => navigate(`${pathName}/${item.id}`),
      }))
    );
  }, [data, navigate, pathName]);

  const initialValues = useMemo(
    () => ({
      questionIds: [
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        46,
        47,
        48,
        49,
        50,
        51,
        52,
        53,
      ],
      name: '',
      description: '',
      code: '',
      startDate: new Date(),
      endDate: addDays(new Date(), 3),
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
          handleClose();
          actions.resetForm({ values: { ...initialValues } });
          toastSuccess('Tạo đợt khảo sát thành công.');
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
          }, 3000);
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
          }, 3000);
          actions.resetForm({ values: { ...initialValuesStart } });
        });
    },
    [force, idTest, initialValuesStart, startVersion, validateSchema],
  );

  return (
    <Wrapper>
      <Container fluid>
        <div className="filter">
          <Filter values={params} onFilter={handleOnFilter} handleShow={handleShow} />
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
              <Form onSubmit={props.handleSubmit} autoComplete="off">
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
