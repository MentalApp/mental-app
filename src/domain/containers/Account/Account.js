import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { Button, Badge, Container, Modal } from 'react-bootstrap';
import { useQuery, useMutation } from 'hooks/axios.hooks';
import Loading from 'components/Loading';
import Wrapper from './Account.styles';
import { useNavigation } from 'react-navi';
import TablePaginationData from 'components/TablePagination';
import { AccountCollums } from 'utils/constants';
import { uppercaseString } from 'utils/utils';
import ModalCreateUser from './ModalCreateUser';
import { format } from 'date-fns';
import AlertError from 'components/AlertError';
import * as Yup from 'yup';
import { toastSuccess, toastError } from 'utils/toastify';
import { Trash2 } from 'react-feather';

const Account = () => {
  const [errorGetData, setErrorGetData] = useState(null);
  const { navigate } = useNavigation();
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = useState(null);
  const [idDelete, setIdDelete] = useState(null);

  //show modal delete
  const [showDelete, setShowDelete] = useState(false);

  const handleModalDeleteClose = () => setShowDelete(false);
  const handleModalDeleteShow = () => setShowDelete(true);

  const { data, loading, errors, force } = useQuery({
    url: '/admin/doctors',
  });

  const [createAccount] = useMutation({
    url: '/admin/users',
  });

  const [deleteAccount] = useMutation({
    url: `/admin/users/${idDelete}`,
    method: 'DELETE',
  });

  useEffect(() => {
    if (errors && errors.response?.status === 404) {
      setErrorGetData('Dữ liệu trả về không có!');
    }
    if (data) {
      setErrorGetData(null);
    }
  }, [errors, data]);

  const setId = (id) => {
    setIdDelete(id);
  };

  const handleDelete = useCallback(() => {
    deleteAccount()
      .then((response) => {
        if (!response.data.success) {
          handleModalDeleteClose();
          force();
          toastError('Xóa tài khoản không thành công.');
        }
        setId(null);
        handleModalDeleteClose();
        force();
        toastSuccess('Xóa tài khoản thành công.');
      })
      .catch((er) => {
        handleModalDeleteClose();
        force();
        toastError('Xóa tài khoản không thành công.');
      })
      .finally(() => {
        setTimeout(() => {
          setError(null);
        }, 3000);
      });
  }, [deleteAccount, force]);

  const restructureData = useMemo(() => {
    if (!data) return;
    return (
      !!data &&
      data.data?.map((item, index) => ({
        ...item,
        stt: index + 1,
        name: (
          <div className="typography" onClick={() => navigate(`/account/${item.id}`)}>
            {uppercaseString(item.fullName)}
          </div>
        ),
        militaryCode: <div>{item.militaryCode}</div>,
        status:
          item.isBlock === 2 ? (
            <Badge variant="success">Đang hoạt động</Badge>
          ) : (
            <Badge variant="secondary">Đang ngừng hoạt động</Badge>
          ),
        startDate: <div>{format(new Date(item.createdAt), 'HH:mm dd/MM/yyyy')}</div>,
        delete: (
          <>
            <Button
              variant="infor"
              onClick={() => {
                setId(item.id);
                handleModalDeleteShow();
              }}
            >
              Xóa
            </Button>
            <Modal show={showDelete} onHide={handleModalDeleteClose}>
              <Modal.Header>
                <Modal.Title>Xóa tài khoản</Modal.Title>
              </Modal.Header>
              <Modal.Body>Bạn có muốn xóa tài khoản {item.fullName}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleModalDeleteClose}>
                  Đóng
                </Button>
                <Button
                  variant="infor"
                  onClick={() => {
                    handleModalDeleteShow();
                    handleDelete();
                  }}
                >
                  Xóa
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        ),
      }))
    );
  }, [data, showDelete, navigate, handleDelete]);

  const initialValues = useMemo(
    () => ({
      fullName: '',
      email: '',
      militaryCode: '',
      password: '',
      role: 'doctor',
    }),
    [],
  );

  const validateSchema = Yup.object({
    fullName: Yup.string().required('*Bắt buộc').trim().max(255, '*Tên quá dài').min(5, '*Tên quá ngắn'),
    email: Yup.string().required('*Bắt buộc').trim().max(255, '*Tên quá dài').min(8, '*Tên quá ngắn'),
    password: Yup.string().required('*Bắt buộc').trim().max(255, '*Mật khẩu quá dài').min(6, '*Mật khẩu quá ngắn'),
    militaryCode: Yup.string().trim().max(255, '*Mã số quá dài'),
  });

  const handleSubmit = useCallback(
    (values, actions) => {
      const valuesCasted = validateSchema.cast(values);
      const valuesCloned = {
        ...valuesCasted,
      };
      createAccount({
        ...valuesCloned,
      })
        .then((response) => {
          if (!response.data.success) {
            setError({ type: 'danger', message: 'Tạo tài khoản không thành công' });
            return;
          }
          handleClose();
          actions.resetForm({ values: { ...initialValues } });
          force();
          toastSuccess('Tạo tài khoản thành công.');
        })
        .catch((er) => {
          setError({ type: 'danger', message: 'Tạo tài khoản không thành công' });
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
    [createAccount, force, initialValues, validateSchema],
  );

  return (
    <>
      {loading && <Loading />}
      {errors && <AlertError message={errorGetData} isShow={!!errorGetData} />}
      {data && !errorGetData && !loading && (
        <Wrapper>
          <Container className="mt-4" fluid>
            <div style={{ display: 'flex' }}>
              <Button
                variant="primary"
                className="create--button mb-4"
                onClick={handleShow}
                style={{ marginLeft: 'auto' }}
              >
                Tạo tài khoản
              </Button>
              <ModalCreateUser
                title="Tạo tài khoản"
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
              columns={AccountCollums}
              isLoading={loading}
              data={restructureData}
              page={page}
              totalPages={(data && data.totalPages) || 0}
              onChangePage={(page) => {
                setPage(page);
              }}
            />
          </Container>
        </Wrapper>
      )}
    </>
  );
};

export default Account;
