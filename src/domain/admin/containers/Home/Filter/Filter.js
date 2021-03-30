import React from 'react';
import Wrapper from './Filter.styles';
import { Container, Row, Col } from 'react-bootstrap';

const Filter = () => {
  return (
    <Wrapper>
      <Container fluid>
        <Row>
          <Col xs={12} sm={6} md={4}>
            <div className="group-item-filter">
              <div className="title">Tên quân nhân</div>
              <input type="text" className="form-control" />
            </div>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <div className="group-item-filter">
              <div className="title">Mã quân nhân</div>
              <input type="text" className="form-control" />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} md={4}>
            <div className="group-item-filter">
              <div className="title">Đợt kiểm tra</div>
              <select className="custom-select">
                <option selected>Tất cả</option>
                <option value="1">Đợt 1 năm 2021</option>
                <option value="2">Đợt 2 năm 2021</option>
              </select>
            </div>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <div className="group-item-filter">
              <div className="title">Mức độ trung thực</div>
              <select className="custom-select">
                <option selected>Tất cả</option>
                <option value="1">Trung thực</option>
                <option value="2">Chưa trung thực</option>
              </select>
            </div>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <div className="group-item-filter">
              <div className="title">Mức độ vấn đề </div>
              <select className="custom-select">
                <option selected>Tất cả</option>
                <option>Bình thường</option>
                <option>Có vấn đề</option>
                <option>Nghiêm trọng</option>
              </select>
            </div>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default Filter;
