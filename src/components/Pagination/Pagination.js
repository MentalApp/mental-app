import React from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

const Wrapper = styled.div`
  .pagination {
    align-items: center;
  }
  a {
    margin: 5px;
    cursor: pointer;
  }

  svg {
    margin: 7px 5px;
  }

  .active a {
    color: #29afaf;
  }
`;

const propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Pagination = ({ currentPage = 0, totalPages = 0, onChange }) => {
  if (totalPages === 0) return null;

  return (
    <Wrapper>
      <ReactPaginate
        previousLabel={<ArrowLeft />}
        nextLabel={<ArrowRight />}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={
          /* istanbul ignore next */ (page) => {
            onChange(page.selected + 1);
          }
        }
        forcePage={currentPage - 1}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </Wrapper>
  );
};

Pagination.propTypes = propTypes;
export default Pagination;
