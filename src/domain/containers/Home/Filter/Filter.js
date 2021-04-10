import React from 'react';
import Wrapper from './Filter.styles';
import { Container, Row, Col } from 'react-bootstrap';
import { LIST_UNIT } from 'utils/constants';

const Filter = ({ values, dataTests, onFilter }) => {
  return (
    <Wrapper>
      <Container fluid>
        <Row>
          <Col xs={12} sm={6} md={4}>
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
          <Col xs={12} sm={6} md={4}>
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
                {LIST_UNIT &&
                  LIST_UNIT.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} md={4}>
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
                {dataTests &&
                  dataTests?.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          </Col>
          <Col xs={12} sm={6} md={4}>
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
                <option value={0}>Trung thực</option>
                <option value={1}>Chưa trung thực</option>
              </select>
            </div>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <div className="group-item-filter">
              <div className="title">Tình trạng bệnh lý</div>
              <select
                className="custom-select"
                value={values?.predictShallowFilter || ''}
                onChange={(event) => onFilter({ predictShallowFilter: event.target.value })}
              >
                <option value="" selected>
                  Tất cả
                </option>
                <option value={0}>Bình thường</option>
                <option value={1}>Có bệnh</option>
              </select>
            </div>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default Filter;
