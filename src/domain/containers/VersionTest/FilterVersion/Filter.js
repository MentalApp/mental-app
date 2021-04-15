import React from 'react';
import Wrapper from './Filter.styles';
import { Container, Row, Col, FormControl, InputGroup } from 'react-bootstrap';
// import { Search } from 'react-feather';

const Filter = ({ values, onFilter }) => {
  return (
    <Wrapper>
      <Container fluid>
        <Row>
          <Col xs={12} sm={12} md={4} lg={3}>
            <label htmlFor="searchVersionTest">Tìm kiếm</label>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Tên đợt khảo sát"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                style={{ border: '1px solid #c3b9b9' }}
                value={values?.name || ''}
                onChange={(event) => onFilter({ name: event.target.value })}
              />
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default Filter;
