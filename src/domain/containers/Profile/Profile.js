import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Row, Col, Card, Form, InputGroup, FormControl, Container, Alert, Dropdown } from 'react-bootstrap';
import { useMutation, useQuery } from 'hooks/axios.hooks';
import Loading from 'components/Loading';
import * as Yup from 'yup';
import { toastSuccess } from 'utils/toastify';
import ModalEditProfile from './ModalEditProfile/ModalEditProfile';
import ModalEditPassword from './ModalEditPass/ModalEditPass';
import { LIST_UNIT } from 'utils/constants';

const Profile = (userId) => {
  const { data, loading, force, errors } = useQuery({
    url: `admin/users/${userId.id}`,
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = useState(null);

  const [showModelPass, setShowModelPass] = useState(false);
  const handleClosePass = () => setShowModelPass(false);
  const handleShowPass = () => setShowModelPass(true);
  const [errorPass, setErrorPass] = useState(null);
  const [errorGetData, setErrorGetData] = useState(null);

  const [updateProfile] = useMutation({ url: `/admin/users/${userId.id}`, method: 'PUT' });

  const dataDetail = useMemo(() => !loading && !!data && data.data, [data, loading]);
  const initialValues = useMemo(
    () => ({
      fullName: dataDetail?.fullName || '',
      email: dataDetail?.email || '',
      address: dataDetail?.address || '',
      rank: dataDetail?.rank || '',
      position: dataDetail?.position || '',
      phone: dataDetail?.phone || '',
      militaryCode: dataDetail?.militaryCode || '',
      unit: dataDetail?.unit || '',
    }),
    [dataDetail],
  );
  const initialPassValues = useMemo(
    () => ({
      password: '',
      newPassword: '',
    }),
    [],
  );

  const validateSchema = Yup.object({
    fullName: Yup.string().required('*Bắt buộc').trim().max(255, '*Tên quá dài').min(5, '*Tên quá ngắn'),
    email: Yup.string().required('*Bắt buộc').trim().max(255, '*Tên quá dài').min(8, '*Tên quá ngắn'),
    address: Yup.string().trim().max(255, '*Địa chỉ quá dài'),
    rank: Yup.string().trim().max(255, '*Chữ quá dài'),
    position: Yup.string().trim().max(255, '*Chữ quá dài'),
    phone: Yup.number(),
    militaryCode: Yup.string().trim().max(255, '*Mã số quá dài'),
  });

  const validatePassSchema = Yup.object({
    password: Yup.string().required('*Bắt buộc').trim().max(255, '*Mật khẩu quá dài').min(6, '*Mật khẩu quá ngắn'),
    newPassword: Yup.string().required('*Bắt buộc').trim().max(255, '*Mật khẩu quá dài').min(6, '*Mật khẩu quá ngắn'),
  });

  const handleSubmit = useCallback(
    (values, actions) => {
      const valuesCasted = validateSchema.cast(values);
      const valuesCloned = {
        ...valuesCasted,
      };
      updateProfile({
        ...valuesCloned,
      })
        .then((response) => {
          if (!response.data.success) {
            setError({ type: 'danger', message: 'Cập nhật thông tin không thành công' });
            return;
          }
          handleClose();
          actions.resetForm({ values: { ...initialValues } });
          force();
          toastSuccess('Cập nhật thông tin thành công.');
        })
        .catch((er) => {
          setError({ type: 'danger', message: 'Cập nhật thông tin không thành công' });
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
    [updateProfile, force, initialValues, validateSchema],
  );

  const handleSubmitEditPass = useCallback(
    (values, actions) => {
      const valuesCasted = validatePassSchema.cast(values);
      const valuesCloned = {
        ...valuesCasted,
      };
      updateProfile({
        ...valuesCloned,
      })
        .then((response) => {
          if (!response.data.success) {
            setErrorPass({ type: 'danger', message: 'Cập nhật thông tin không thành công' });
            return;
          }
          handleClosePass();
          actions.resetForm({ values: { ...initialPassValues } });
          force();
          toastSuccess('Cập nhật thông tin thành công.');
        })
        .catch((er) => {
          setErrorPass({ type: 'danger', message: 'Cập nhật thông tin không thành công' });
          setTimeout(() => {
            setErrorPass(null);
          }, 10000);
          return;
        })
        .finally(() => {
          setTimeout(() => {
            setErrorPass(null);
          }, 3000);
        });
    },
    [updateProfile, force, initialPassValues, validatePassSchema],
  );

  useEffect(() => {
    if (errors && errors.response?.status === 404) {
      setErrorGetData('Dữ liệu trả về không có!');
    }
    if (data) {
      setErrorGetData(null);
    }
  }, [errors, data]);
  const userInfor = useMemo(() => !loading && !!data && data.data, [data, loading]);

  return (
    <>
      {loading && <Loading />}
      {errors && (
        <Alert show={errorGetData} variant="danger">
          {errorGetData}
          <hr />
        </Alert>
      )}
      {data && !errors && !loading && (
        <Container className="mt-4">
          <Row className="d-flex justify-content-center ">
            <Col md="8">
              <Card className="card-user">
                <Card.Header>
                  <Row>
                    <Col
                      md="8"
                      className="d-flex justify-content-sm-center justify-content-xs-center
                    justify-content-md-start
                    "
                    >
                      <Card.Title tag="h5">Thông tin tài khoản</Card.Title>
                    </Col>
                    <Col md="4" className="d-flex justify-content-end">
                      <Dropdown>
                        <Dropdown.Toggle className="update" color="primary" id="dropdown-basic">
                          Sửa
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item onClick={handleShow}>Sửa thông tin</Dropdown.Item>
                          <Dropdown.Item onClick={handleShowPass}>Đổi mật khẩu</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      <ModalEditProfile
                        title="Cập nhật thông tin cá nhân"
                        initialValues={initialValues}
                        validateSchema={validateSchema}
                        handleSubmit={handleSubmit}
                        show={show}
                        error={error}
                        setError={setError}
                        handleClose={handleClose}
                      />
                      <ModalEditPassword
                        title="Đổi mật khẩu"
                        initialValues={initialPassValues}
                        validateSchema={validatePassSchema}
                        handleSubmit={handleSubmitEditPass}
                        show={showModelPass}
                        error={errorPass}
                        setError={setErrorPass}
                        handleClose={handleClosePass}
                      />
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  <Form autoComplete="off">
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <label>Tên đầy đủ</label>
                        <InputGroup className="mb-3">
                          <FormControl placeholder="Nguyễn Văn A" type="text" value={userInfor.fullName || '-'} />
                        </InputGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <label>Email</label>
                        <InputGroup className="mb-3">
                          <FormControl placeholder="doctor@gmail.com" type="text" value={userInfor.email || '-'} />
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <label>Địa chỉ</label>
                        <InputGroup className="mb-md-3">
                          <FormControl
                            placeholder="Số 1, ngõ 30, Tả Thành Oai, Thanh Trì, Hà Nội"
                            type="text"
                            value={userInfor.address || '-'}
                          />
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <label>Cấp bậc</label>
                        <InputGroup className="mb-3">
                          <FormControl placeholder="Thượng tá" type="text" value={userInfor.rank || '-'} />
                        </InputGroup>
                      </Col>
                      <Col md="4">
                        <label>Chức vụ</label>
                        <InputGroup className="mb-3">
                          <FormControl placeholder="Bác sĩ" type="text" value={userInfor.position || '-'} />
                        </InputGroup>
                      </Col>
                      <Col md="4">
                        <label>Số điện thoại</label>
                        <InputGroup className="mb-3">
                          <FormControl placeholder="0914.538.xxx" type="text" value={userInfor.phone || '-'} />
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <label>Mã số quân nhân</label>
                        <InputGroup className="mb-3">
                          <FormControl placeholder="" type="text" value={userInfor.militaryCode} />
                        </InputGroup>
                      </Col>
                      <Col md="6">
                        <Form.Group>
                          <label>Đơn vị</label>
                          <InputGroup className="mb-3">
                            <FormControl
                              placeholder="Học viện quân y"
                              type="text"
                              value={userInfor.unit ? LIST_UNIT[userInfor.unit - 1].name : '-'}
                            />
                          </InputGroup>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Profile;
