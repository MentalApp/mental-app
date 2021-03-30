import React from 'react';
import Wrapper from './Filter.styles';
import { Container, Row, Col, FormControl, InputGroup, Button } from 'react-bootstrap';
import { Search } from 'react-feather';

const Filter = () => {
  return (
    <Wrapper>
      <Container fluid>
        <Row>
          <Col xs={12} sm={12} md={6}>
            <label htmlFor="searchVersionTest">Tìm kiếm</label>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Tên đợt khảo sát"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <Button id="searchVersionTest" variant="outline-secondary">
                  <Search />
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default Filter;

// <div className="group-item-filter input-group mb-3">
//               <label for="searchVersionTest" className="title">
//                 Tìm kiếm
//               </label>
//               <input type="text" id="searchVersionTest" placeholder="Tên đợt test" className="form-control" />
//             </div>
