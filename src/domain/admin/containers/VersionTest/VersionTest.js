import React, { useMemo, useState } from 'react';
import { Container, Button, Modal, Form } from 'react-bootstrap';
import { useNavigation } from 'react-navi';
import Wrapper from './VersionTest.styles';
import data from './mockVersionTest.json';
import TablePaginationData from 'components/TablePagination';
import Filter from './FilterVersion';

const VersionTest = () => {
  const { navigate } = useNavigation();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const { data } = useQuery({ url: '/officer_tests' });
  const collums = [
    {
      name: 'Đợt kiểm tra',
      field: 'name',
    },
    {
      name: 'Mã khảo sát',
      field: 'authen',
    },
    {
      name: 'Thời gian bắt đầu',
      field: 'startAt',
    },
    {
      name: 'Thời gian kết thúc',
      field: 'expireAt',
    },
  ];

  const restructureData = useMemo(() => {
    if (!data) return [];
    return (
      !!data &&
      data?.map((item) => ({
        ...item,
        onClick: () => navigate(`/version/${item.id}`),
      }))
    );
  }, [navigate]);

  return (
    <Wrapper>
      <Container fluid>
        <div style={{ display: 'flex' }}>
          <Button variant="primary" className="create--button" onClick={handleShow} style={{ marginLeft: 'auto' }}>
            Tạo
          </Button>
          <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header className="text-center">
              <Modal.Title>Tạo đợt khảo sát</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="nameVersion">
                  <Form.Label>Tên đợt khảo sát.</Form.Label>
                  <Form.Control type="text" placeholder="Nhập tên mới" />
                </Form.Group>

                <Form.Group controlId="descVersion">
                  <Form.Label>Mô tả đợt khảo sát.</Form.Label>
                  <Form.Control type="text" placeholder="Nhập mô tả mới" />
                </Form.Group>

                <Form.Group controlId="authenVersion">
                  <Form.Label>Mã tham gia đợt khảo sát.</Form.Label>
                  <Form.Control type="text" placeholder="Nhập mã mới" />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Hủy bỏ
              </Button>
              <Button variant="primary">Khởi tạo</Button>
            </Modal.Footer>
          </Modal>
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
