import React from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import styled from 'styled-components';
import { uppercaseString } from 'utils/utils';

const WrapperModal = styled(Modal)`
  .error-text {
    margin: 0;
    color: red;
  }
  .react-datepicker-wrapper {
    display: unset;

    input {
      height: 40px;
      border: 1px solid #dddddd;
      border-radius: 5px;
      padding: 10px;
      color: #66615b;
    }
  }

  .has-error {
    border-color: red !important;
  }

  .row-wrapper {
    display: flex;

    .field-left {
      margin-right: 10px;
    }
  }
`;
const ModalCreateUser = ({
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
        <WrapperModal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
          <Modal.Header className="text-center">
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={props.handleSubmit} autoComplete="off">
            <Modal.Body>
              <Form.Group controlId="fullName">
                <Form.Label>Họ và tên:</Form.Label>
                <Form.Control
                  className={`input-control ${
                    props.touched.user?.fullName && props.errors.user?.fullName ? 'has-error' : ''
                  }`}
                  type="text"
                  placeholder="Nhập tên mới"
                  value={props.values.user.fullName}
                  onChange={(event) => {
                    props.setFieldValue('user[fullName]', uppercaseString(event.target.value));
                  }}
                />
                {props.touched.user?.fullName && props.errors.user?.fullName && (
                  <p className="error-text">{props.errors.user?.fullName}</p>
                )}
              </Form.Group>
              <div className="row-wrapper">
                <Form.Group controlId="email" className="field-left">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    className={`input-control ${
                      props.touched.user?.email && props.errors.user?.email ? 'has-error' : ''
                    }`}
                    type="text"
                    placeholder="Nhập email"
                    value={props.values.user?.email}
                    onChange={(event) => {
                      props.setFieldValue('user[email]', event.target.value);
                    }}
                  />
                  {props.touched.user?.email && props.errors.user?.email && (
                    <p className="error-text">{props.errors.user?.email}</p>
                  )}
                </Form.Group>
                <Form.Group controlId="phone">
                  <Form.Label>Số điện thoại:</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    className={`input-control ${
                      props.touched.user?.phone && props.errors.user?.phone ? 'has-error' : ''
                    }`}
                    type="text"
                    placeholder="Nhập số điện thoại"
                    value={props.values.user?.phone}
                    onChange={(event) => {
                      props.setFieldValue('user[phone]', event.target.value);
                    }}
                  />
                  {props.touched.user?.phone && props.errors.user?.phone && (
                    <p className="error-text">{props.errors.user?.phone}</p>
                  )}
                </Form.Group>
              </div>

              <div className="row-wrapper">
                <Form.Group controlId="unit" className="field-left">
                  <Form.Label>Đơn vị:</Form.Label>
                  <Form.Control
                    className={`input-control ${
                      props.touched.user?.unit && props.errors.user?.unit ? 'has-error' : ''
                    }`}
                    type="text"
                    placeholder="Nhập tên đơn vị"
                    value={props.values.user?.unit}
                    onChange={(event) => {
                      props.setFieldValue('user[unit]', event.target.value);
                    }}
                  />
                  {props.touched.user?.unit && props.errors.user?.unit && (
                    <p className="error-text">{props.errors.user?.unit}</p>
                  )}
                </Form.Group>
                <Form.Group controlId="militaryCode">
                  <Form.Label>Mã số quân nhân:</Form.Label>
                  <Form.Control
                    className={`input-control ${
                      props.touched.user?.militaryCode && props.errors.user?.militaryCode ? 'has-error' : ''
                    }`}
                    type="text"
                    placeholder="Nhập tên mới"
                    value={props.values.user?.militaryCode}
                    onChange={(event) => {
                      props.setFieldValue('user[militaryCode]', event.target.value);
                    }}
                  />
                  {props.touched.user?.militaryCode && props.errors.user?.militaryCode && (
                    <p className="error-text">{props.errors.user?.militaryCode}</p>
                  )}
                </Form.Group>
              </div>
              <div className="row-wrapper">
                <Form.Group controlId="rank" className="field-left">
                  <Form.Label>Cấp bậc :</Form.Label>
                  <Form.Control
                    className={`input-control ${
                      props.touched.user?.rank && props.errors.user?.rank ? 'has-error' : ''
                    }`}
                    type="text"
                    placeholder="Nhập cấp bậc quân hàm"
                    value={props.values.user?.rank}
                    onChange={(event) => {
                      props.setFieldValue('user[rank]', event.target.value);
                    }}
                  />
                  {props.touched.user?.rank && props.errors.user?.rank && (
                    <p className="error-text">{props.errors.user?.rank}</p>
                  )}
                </Form.Group>
                <Form.Group controlId="position">
                  <Form.Label>Chức vụ:</Form.Label>
                  <Form.Control
                    className={`input-control ${
                      props.touched.user?.position && props.errors.user?.position ? 'has-error' : ''
                    }`}
                    type="text"
                    placeholder="Nhập chức vụ"
                    value={props.values.user?.position}
                    onChange={(event) => {
                      props.setFieldValue('user[position]', event.target.value);
                    }}
                  />
                  {props.touched.user?.position && props.errors.user?.position && (
                    <p className="error-text">{props.errors.user?.position}</p>
                  )}
                </Form.Group>
              </div>
              <Form.Group controlId="role">
                <Form.Label>Nhóm các quyền chung:</Form.Label>
                <Form.Control
                  onChange={(event) => {
                    props.setFieldValue('user[role]', event.target.value);
                    props.setFieldValue('roleMaster[name]', event.target.value);
                    props.setFieldValue('roleMaster[roleMasterId]', event.target.value === 'admin' ? 1 : 2);
                    if (event.target.value === 'doctor') {
                      props.setFieldValue('roleMaster[roleCategoryIds]', [
                        ...props.values?.roleMaster?.roleCategoryIds.filter((item) => item !== 1 && item !== 3),
                        5,
                      ]);
                      return;
                    }
                    if (event.target.value === 'admin') {
                      props.setFieldValue('roleMaster[roleCategoryIds]', [
                        ...props.values?.roleMaster?.roleCategoryIds.filter((item) => item !== 5),
                        1,
                        3,
                      ]);
                      return;
                    }
                  }}
                  className={`input-control ${props.touched.user?.role && props.errors.user?.role ? 'has-error' : ''}`}
                  as="select"
                  value={props.values?.roleMaster?.name}
                >
                  <option value="">Vui lòng chọn nhóm các quyền chung</option>
                  <option value="admin">Quản trị viên</option>
                  <option value="doctor">Bác sĩ</option>
                </Form.Control>
                {props.touched.user?.role && props.errors.user?.role && (
                  <p className="error-text">{props.errors.user?.role}</p>
                )}
              </Form.Group>

              <Form.Group controlId="role">
                <Form.Label>Gán các quyền khác cần thiết:</Form.Label>
                <Form.Check
                  label="Comment bài khảo sát"
                  name="group1"
                  type="checkbox"
                  id="5"
                  checked={props.values.roleMaster?.roleCategoryIds?.includes(5)}
                  onChange={() => {
                    if (props.values.roleMaster?.roleCategoryIds?.includes(5)) {
                      props.setFieldValue(
                        'roleMaster[roleCategoryIds]',
                        props.values?.roleMaster?.roleCategoryIds.filter((item) => item !== 5),
                      );
                      return;
                    }
                    props.setFieldValue('roleMaster[roleCategoryIds]', [
                      ...props.values?.roleMaster?.roleCategoryIds,
                      5,
                    ]);
                  }}
                />
                <Form.Check
                  label="Thêm kỳ khảo sát"
                  name="group1"
                  type="checkbox"
                  id="3"
                  checked={props.values.roleMaster?.roleCategoryIds?.includes(3)}
                  onChange={() => {
                    if (props.values.roleMaster?.roleCategoryIds?.includes(3)) {
                      props.setFieldValue(
                        'roleMaster[roleCategoryIds]',
                        props.values?.roleMaster?.roleCategoryIds.filter((item) => item !== 3),
                      );
                      return;
                    }
                    props.setFieldValue('roleMaster[roleCategoryIds]', [
                      ...props.values?.roleMaster?.roleCategoryIds,
                      3,
                    ]);
                  }}
                />
                <Form.Check
                  label="Thêm, sửa, xóa tài khoản"
                  name="group1"
                  type="checkbox"
                  id="1"
                  checked={props.values.roleMaster?.roleCategoryIds?.includes(1)}
                  onChange={() => {
                    if (props.values.roleMaster?.roleCategoryIds?.includes(1)) {
                      props.setFieldValue(
                        'roleMaster[roleCategoryIds]',
                        props.values?.roleMaster?.roleCategoryIds.filter((item) => item !== 1),
                      );
                      return;
                    }
                    props.setFieldValue('roleMaster[roleCategoryIds]', [
                      ...props.values?.roleMaster?.roleCategoryIds,
                      1,
                    ]);
                  }}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Mật khẩu cho tài khoản này:</Form.Label>
                <Form.Control
                  className={`input-control ${
                    props.touched.user?.password && props.errors.user?.password ? 'has-error' : ''
                  }`}
                  type="input"
                  placeholder="Nhập mật khẩu"
                  value={props.values.user?.password}
                  onChange={(event) => {
                    props.setFieldValue('user[password]', event.target.value);
                  }}
                />
                {props.touched.user?.password && props.errors.user?.password && (
                  <p className="error-text">{props.errors.user?.password}</p>
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
        </WrapperModal>
      )}
    </Formik>
  );
};

export default ModalCreateUser;
