import TablePaginationData from 'components/TablePagination';
import { useQuery } from 'hooks/axios.hooks';
import React, { useCallback, useMemo, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigation } from 'react-navi';
import Filter from './Filter';
import Wrapper from './Home.styles';
import { TestCollums } from 'utils/constants';

const Home = () => {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);

  const { navigate } = useNavigation();
  const { data, loading } = useQuery({
    url: '/admin/officer_tests',
    params: { ...params },
  });
  const columns = TestCollums;
  console.log(data);

  const handleOnFilter = useCallback(
    (queryObject) => {
      setPage(1);
      const newQuery = { ...params, ...queryObject };
      Object.keys(newQuery).forEach((key) => {
        if (!newQuery[key]) {
          delete newQuery[key];
        }
      });
      setParams(newQuery);
    },
    [params],
  );
  const restructureData = useMemo(() => {
    if (!data) return [];
    return (
      !!data &&
      data.data &&
      data?.data.map((item) => ({
        ...item,
        predict: `${item.predictShallowFilter}/${item.predictDeepFilter}`,
        onClick: () => navigate(`/home/${item.id}`),
      }))
    );
  }, [navigate, data]);

  return (
    <Wrapper>
      <Container fluid>
        <div className="filter">
          <Filter values={params} onFilter={handleOnFilter} />
        </div>
        <TablePaginationData
          columns={columns}
          data={restructureData}
          isLoading={loading}
          page={page}
          totalPages={(data && data.total_pages) || 0}
          onChangePage={(page) => {
            setPage(page);
          }}
        />
      </Container>
    </Wrapper>
  );
};

export default Home;
