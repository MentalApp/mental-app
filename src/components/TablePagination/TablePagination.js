import React from 'react';

import get from 'lodash/get';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container, Row, Table, Col, Card } from 'react-bootstrap';
import Loading from 'components/Loading';
import Pagination from 'components/Pagination';

const propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      name: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    }),
  ).isRequired,
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  onChangePage: PropTypes.func,
  onSort: PropTypes.func,
  sortTitle: PropTypes.string,
  sortType: PropTypes.oneOf(['desc', 'asc']),
  hiddenHeader: PropTypes.bool,
};

const Wrapper = styled.div`
  .th-head-sorts {
    justify-content: flex-end;
    align-items: center;
    display: flex;
    text-align: right;
    padding: 0px;
  }

  .empty-data {
    height: 300px;

    td {
      vertical-align: middle;
    }
  }

  .no-padding {
    width: 100%;
    padding: 0px;
  }

  tbody {
    tr:hover {
      background: #2cb1b01c 0% 0% no-repeat;
      cursor: pointer;
    }
  }
`;

const TablePaginationData = ({
  columns,
  data,
  isLoading = false,
  sortTitle,
  sortValue,
  onSort,
  page = 0,
  totalPages = 0,
  onChangePage,
  customStyle = {},
  sortBy = '',
  hiddenHeader = false,
}) => {
  const colSpan = columns.length + (sortTitle ? 1 : 0);

  return (
    <Container fluid>
      <Row>
        <Col sm={12}>
          <Wrapper className="no-padding">
            <Card>
              <Table bordered hover responsive>
                {!hiddenHeader && (
                  <thead className="text-primary">
                    <tr>
                      {columns.map(({ name, field, width }, index) => (
                        <th key={index} className={(field, width)} onClick={field === sortBy ? onSort : undefined}>
                          {name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                )}
                <tbody>
                  {isLoading && (
                    <tr className="empty-data">
                      <td colSpan={colSpan}>
                        <Loading />
                      </td>
                    </tr>
                  )}

                  {!isLoading && !data.length && (
                    <tr className="empty-data">
                      <td className="text-center" colSpan={colSpan}>
                        Không có dữ liệu.
                      </td>
                    </tr>
                  )}

                  {!isLoading &&
                    data.map((row, index) => (
                      <tr key={index} onClick={row.onClick} className={row.className || ''}>
                        {columns.map(({ field }, index) => (
                          <td key={index} className={'td-' + field} colSpan={0}>
                            <div>{get(row, field, '')}</div>
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </Table>
              {totalPages !== 0 && (
                <div className="pagination block">
                  <Pagination currentPage={page} totalPages={totalPages} onChange={onChangePage} />
                </div>
              )}
            </Card>
          </Wrapper>
        </Col>
      </Row>
    </Container>
  );
};

TablePaginationData.propTypes = propTypes;

export default TablePaginationData;
