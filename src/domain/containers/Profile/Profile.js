import React, { useMemo, useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, InputGroup, FormControl, Container, Alert } from 'react-bootstrap';
import { useMutation, useQuery } from 'hooks/axios.hooks';
import Loading from 'components/Loading';

const Profile = (userId) => {
  // const [fullName, setFullName] = useState(null);
  // const [email, setEmail] = useState(null);
  // const [address, setAddress] = useState(null);
  // const [sex, setSex] = useState(true);
  // const [joinArmy, setJoinArmy] = useState(null);
  // const [rank, setRank] = useState(null);
  // const [position, setPosition] = useState(null);
  // const [phoneNumber, setPhoneNumber] = useState(null);
  // const [militaryCode, setMilitaryCode] = useState(null);
  // const [unit, setUnit] = useState(null);
  const [errorGetData, setErrorGetData] = useState(null);

  const { data, loading, force, errors } = useQuery({
    url: `admin/users/${userId.id}`,
  });

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
            <Col md="10" className="">
              <Card className="card-user">
                <Card.Header className="mx-auto">
                  <Card.Title tag="h5">Thông tin tài khoản</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
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
                      <Col md="8">
                        <label>Địa chỉ</label>
                        <InputGroup className="mb-md-3">
                          <FormControl
                            placeholder="Số 1, ngõ 30, Tả Thành Oai, Thanh Trì, Hà Nội"
                            type="text"
                            value={userInfor.address || '-'}
                          />
                        </InputGroup>
                      </Col>
                      <Col md="4">
                        <label>Giới tính</label>
                        <div className="mb-3">
                          <Form.Check
                            inline
                            checked={userInfor.sex && userInfor.sex === 1}
                            label="Nam"
                            name="group1"
                            id={'default-radio-1'}
                            type={'radio'}
                          />
                          <Form.Check
                            inline
                            checked={userInfor.sex && userInfor.sex === 2}
                            label="Nũ"
                            name="group1"
                            id={'default-radio-2'}
                            type={'radio'}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="3">
                        <label>Nhập ngũ</label>
                        <InputGroup className="mb-3">
                          <FormControl placeholder="02/2020" type="month" value={userInfor.joinArmy || null} />
                        </InputGroup>
                      </Col>
                      <Col md="3">
                        <label>Cấp bậc</label>
                        <InputGroup className="mb-3">
                          <FormControl placeholder="Thượng tá" type="text" value={userInfor.rank || '-'} />
                        </InputGroup>
                      </Col>
                      <Col md="3">
                        <label>Chức vụ</label>
                        <InputGroup className="mb-3">
                          <FormControl placeholder="Bác sĩ" type="text" value={userInfor.position || '-'} />
                        </InputGroup>
                      </Col>
                      <Col md="3">
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
                          <FormControl
                            placeholder=""
                            type="text"
                            value={userInfor.militaryCode}
                            onChange={(e) => {
                              console.log(e.target.value);
                            }}
                          />
                        </InputGroup>
                      </Col>
                      <Col md="6">
                        <Form.Group>
                          <label>Đơn vị</label>
                          <InputGroup className="mb-3">
                            <FormControl placeholder="Học viện quân y" type="text" value={'-'} />
                          </InputGroup>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="justify-content-center">
                      <Col md="4">
                        <div className="mx-auto align-self-end">
                          <Button color="primary">Hủy bỏ</Button>
                        </div>
                      </Col>
                      <Col md="4">
                        <div className="update mx-auto">
                          <Button color="primary">Sửa thông tin</Button>
                        </div>
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
