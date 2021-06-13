import React from 'react';
import Wrapper from './Filter.styles';
import { Container, FormControl, InputGroup, Button } from 'react-bootstrap';
import { authService } from 'utils/auth.service';
// import { Search } from 'react-feather';

const Filter = ({ values, onFilter, handleShow }) => {
  const currentUser = authService.getCurrentUser();

  return (
    <Wrapper>
      <Container fluid>
        <div className="group-filter">
          <div>
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
          </div>
          {currentUser.roleMaster?.roleCategories.includes(3) && (
            <Button variant="primary" className="create--button" onClick={handleShow} style={{ marginLeft: 'auto' }}>
              Tạo
            </Button>
          )}
        </div>
      </Container>
    </Wrapper>
  );
};

export default Filter;
