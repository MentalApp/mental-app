import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { Button, Badge, Container, Modal, InputGroup, FormControl } from 'react-bootstrap';
import { useQuery, useMutation } from 'hooks/axios.hooks';
import Loading from 'components/Loading';
import Wrapper from './Account.styles';
import { useNavigation } from 'react-navi';
import TablePaginationData from 'components/TablePagination';
import { AccountCollums } from 'utils/constants';
import { uppercaseString } from 'utils/utils';
import ModalCreateUser from './ModalCreateUser';
import AlertError from 'components/AlertError';
import * as Yup from 'yup';
import { toastSuccess, toastError } from 'utils/toastify';
import { Trash2 } from 'react-feather';
import { authService } from 'utils/auth.service';

const Account = () => {
  const [errorGetData, setErrorGetData] = useState(null);
  const { navigate } = useNavigation();
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = useState(null);
  const [idDelete, setIdDelete] = useState(null);

  const currentUser = authService.getCurrentUser();

  //show modal delete
  const [showDelete, setShowDelete] = useState(false);

  const handleModalDeleteClose = () => setShowDelete(false);
  const handleModalDeleteShow = () => setShowDelete(true);

  const { data, loading, errors, force } = useQuery({
    url: '/admin/users',
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
          toastError('Xóa tài khoản không thành công');
        }
        setId(null);
        handleModalDeleteClose();
        force();
        toastSuccess('Xóa tài khoản thành công');
      })
      .catch((er) => {
        handleModalDeleteClose();
        force();
        toastError('Xóa tài khoản không thành công');
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
        email: <div onClick={() => navigate(`/account/${item.id}`)}>{item.email}</div>,
        phone: <div onClick={() => navigate(`/account/${item.id}`)}>{item.phone}</div>,
        role: <Badge variant={item.role === 'admin' ? 'success' : 'primary'}>{item.role}</Badge>,
        delete: currentUser.id !== item.id && currentUser.roleMaster?.roleCategories.includes(1) && (
          <>
            <Trash2
              color="#ff1919"
              onClick={() => {
                setId(item.id);
                handleModalDeleteShow();
              }}
            />
            <Modal show={showDelete} onHide={handleModalDeleteClose}>
              <Modal.Header>Bạn có muốn xóa tài khoản có tên {item.fullName} không?</Modal.Header>
              <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleModalDeleteClose}>
                  Đóng
                </Button>
                <Button
                  variant="outline-danger"
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
  }, [data, currentUser, showDelete, navigate, handleDelete]);

  const initialValues = useMemo(
    () => ({
      user: {
        fullName: '',
        email: '',
        phone: '',
        militaryCode: '',
        password: '',
        role: '',
        unit: '',
        rank: '',
        position: '',
      },
      roleMaster: {
        name: '',
        roleMasterId: '',
        roleCategoryIds: [],
      },
    }),
    [],
  );

  const validateSchema = Yup.object({
    user: Yup.object({
      fullName: Yup.string().required('*Bắt buộc').trim().max(255, '*Tên quá dài'),
      email: Yup.string()
        .email('*Vui lòng nhập một địa chỉ email')
        .required('*Bắt buộc')
        .trim()
        .max(255, '*Email quá dài'),
      phone: Yup.string()
        .required('*Bắt buộc')
        .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, { message: '*Vui lòng nhập số điện thoại.' }),
      password: Yup.string().required('*Bắt buộc').trim().max(255, '*Mật khẩu quá dài').min(6, '*Mật khẩu quá ngắn'),
      militaryCode: Yup.string().trim().max(255, '*Mã số  quân nhân quá dài'),
      role: Yup.string().required('*Bắt buộc'),
      unit: Yup.string().trim().max(255, '*Nhập đơn vị quá dài'),
      rank: Yup.string().trim().max(255, '*Nhập cấp bậc quá dài'),
      position: Yup.string().trim().max(255, '*Nhập chức vụ quá dài'),
    }),
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
            <div className="filter-group">
              <div className="search-select">
                <div className="input-search">
                  <label>Tìm kiếm</label>
                  <InputGroup>
                    <FormControl
                      placeholder="Nhập tên người dùng, email"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      style={{ border: '1px solid #c3b9b9' }}
                    />
                  </InputGroup>
                </div>
                <div className="select-search">
                  <label>Phân loại</label>
                  <FormControl as="select">
                    <option>Tất cả</option>
                    <option>Quản trị viên</option>
                    <option>Bác sĩ</option>
                  </FormControl>
                </div>
              </div>
              {currentUser.roleMaster?.roleCategories.includes(1) && (
                <Button variant="primary" className="create--button" onClick={handleShow}>
                  Tạo tài khoản
                </Button>
              )}
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
        </Wrapper>
      )}
    </>
  );
};

export default Account;
