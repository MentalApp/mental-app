import React from 'react';
import Wrapper from './Filter.styles';
import { Container, Row, Col } from 'react-bootstrap';

const Filter = ({ values, onFilter }) => {
  return (
    <Wrapper>
      <Container fluid>
        <Row>
          <Col xs={12} sm={6} lg={2}>
            <div className="group-item-filter">
              <div className="title">Tên hoặc mã quân nhân</div>
              <input
                type="text"
                className="form-control"
                placeholder="Tên/MSQN"
                value={values?.keyword || ''}
                onChange={(event) => onFilter({ keyword: event.target.value })}
              />
            </div>
          </Col>
          <Col xs={12} sm={6} lg={2}>
            <div className="group-item-filter">
              <div className="title">Đơn vị</div>
              <select
                className="custom-select"
                value={values?.unit || ''}
                onChange={(event) => onFilter({ unit: event.target.value })}
              >
                <option value="" selected>
                  Tất cả
                </option>
                <option value={1}>bộ binh 1</option>
                <option value={2}>thủy binh 1</option>
              </select>
            </div>
          </Col>
          <Col xs={12} sm={6} lg={2}>
            <div className="group-item-filter">
              <div className="title">Đợt kiểm tra</div>
              <select
                className="custom-select"
                value={values?.testVersion || ''}
                onChange={(event) => onFilter({ testVersion: event.target.value })}
              >
                <option value="" selected>
                  Tất cả
                </option>
                <option value={1}>Đợt 1 năm 2021</option>
                <option value={2}>Đợt 2 năm 2021</option>
              </select>
            </div>
          </Col>
          <Col xs={12} sm={6} lg={2}>
            <div className="group-item-filter">
              <div className="title">Mức độ trung thực</div>
              <select
                className="custom-select"
                value={values?.predictDeepFilter || ''}
                onChange={(event) => onFilter({ predictDeepFilter: event.target.value })}
              >
                <option value="" selected>
                  Tất cả
                </option>
                <option value={1}>Trung thực</option>
                <option value={0}>Chưa trung thực</option>
              </select>
            </div>
          </Col>
          <Col xs={12} sm={6} lg={2}>
            <div className="group-item-filter">
              <div className="title">Mức độ vấn đề </div>
              <select
                className="custom-select"
                value={values?.predictShallowFilter || ''}
                onChange={(event) => onFilter({ predictShallowFilter: event.target.value })}
              >
                <option value="" selected>
                  Tất cả
                </option>
                <option>Bình thường</option>
                <option>Có bệnh</option>
              </select>
            </div>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default Filter;
