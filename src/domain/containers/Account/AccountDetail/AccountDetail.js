import React, { useMemo, useCallback, useState } from 'react';
import { useMutation, useQuery } from 'hooks/axios.hooks';
import { Container, Button, Badge } from 'react-bootstrap';
import Wrapper from './AccountDetail.style';
import { toastSuccess } from 'utils/toastify';
import * as Yup from 'yup';
import Loading from 'components/Loading';
import ModalCreateUser from '../ModalCreateUser';
import { authService } from 'utils/auth.service';

const AccountDetail = ({ id }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = useState(null);
  const currentUser = authService.getCurrentUser();

  const { data, loading, force } = useQuery({ url: `/admin/users/${id}` });

  const [updateUser] = useMutation({ url: `/admin/users/${id}`, method: 'PUT' });

  const dataDetail = useMemo(() => !loading && !!data && data.data, [data, loading]);

  const initialValues = useMemo(
    () => ({
      user: {
        fullName: dataDetail?.fullName || '',
        email: dataDetail?.email || '',
        phone: dataDetail?.phone || '',
        militaryCode: dataDetail?.militaryCode || '',
        password: dataDetail?.password || '',
        role: dataDetail?.role || '',
        unit: dataDetail?.unit || '',
        rank: dataDetail?.rank || '',
        position: dataDetail?.position || '',
      },
      roleMaster: {
        name: dataDetail?.roleMaster?.name || '',
        roleMasterId: dataDetail?.roleMaster?.roleMasterCategory || '',
        roleCategoryIds: dataDetail?.roleMaster?.roleCategories || [],
      },
    }),
    [dataDetail],
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
      updateUser({
        ...valuesCloned,
      })
        .then((response) => {
          if (!response.data.success) {
            setError({ type: 'danger', message: 'Chỉnh sửa tài khoản không thành công' });
            return;
          }
          handleClose();
          actions.resetForm({ values: { ...initialValues } });
          force();
          toastSuccess('Chỉnh sửa tài khoản thành công.');
        })
        .catch((er) => {
          setError({ type: 'danger', message: 'Chỉnh sửa tài khoản không thành công' });
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
    [updateUser, force, initialValues, validateSchema],
  );

  return (
    <Wrapper>
      {loading && <Loading />}
      {!loading && data && (
        <Container>
          <div style={{ display: 'flex', marginTop: '15px' }}>
            {currentUser.roleMaster?.roleCategories.includes(1) && (
              <Button variant="primary" onClick={handleShow} style={{ marginLeft: 'auto' }}>
                Sửa thông tin
              </Button>
            )}
            <ModalCreateUser
              title="Chỉnh sửa tài khoản"
              initialValues={initialValues}
              validateSchema={validateSchema}
              handleSubmit={handleSubmit}
              show={show}
              error={error}
              setError={setError}
              handleClose={handleClose}
            />
          </div>
          <div className="information">
            <div>
              <p className="row">
                <p className="col-6">Họ và tên:</p> <p className="col-6">{data.data?.fullName || '-'}</p>
              </p>
              <p className="row">
                <p className="col-6">Email:</p> <p className="col-6">{data.data?.email || '-'}</p>
              </p>
              <p className="row">
                <p className="col-6">Địa chỉ:</p> <p className="col-6">{data.data?.address || '-'}</p>
              </p>
              <p className="row">
                <p className="col-6">Số điện thoại:</p> <p className="col-6">{data.data?.phone || '-'}</p>
              </p>
              <p className="row">
                <p className="col-6">Thời gian nhập ngũ:</p> <p className="col-6">{data.data?.joinArmy || '-'}</p>
              </p>
              <p className="row">
                <p className="col-6">Đơn vị:</p> <p className="col-6">{data.data?.unit || '-'}</p>
              </p>
              <p className="row">
                <p className="col-6">Cấp bậc:</p> <p className="col-6">{data.data?.rank || '-'}</p>
              </p>
              <p className="row">
                <p className="col-6">Số điện thoại:</p> <p className="col-6">{data.data?.phone || '-'}</p>
              </p>
              <p className="row">
                <p className="col-6">Chức vụ:</p> <p className="col-6">{data.data?.position || '-'}</p>
              </p>
              <p className="row">
                <p className="col-6">Thời gian tạo tài khoản:</p>
                {/* <p className="col-6">{format(new Date(data.data?.createdAt), 'HH:mm dd/MM/yyyy') || '-'}</p> */}
              </p>
              <p className="row">
                <p className="col-6">Trạng thái tài khoản:</p>
                <p className="col-6">
                  <Badge variant="success">Đang hoạt động</Badge>
                </p>
              </p>
            </div>
          </div>
        </Container>
      )}
    </Wrapper>
  );
};

export default AccountDetail;
