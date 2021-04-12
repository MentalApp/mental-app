import TablePaginationData from 'components/TablePagination';
import { useQuery } from 'hooks/axios.hooks';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useCurrentRoute, useNavigation } from 'react-navi';
import Filter from './Filter';
import Wrapper from './Home.styles';
import { TestCollums } from 'utils/constants';
import { handleUnit } from 'utils/utils';

const Home = () => {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const route = useCurrentRoute().url.pathname;

  const { navigate, _history } = useNavigation();
  const { data, loading } = useQuery({
    url: '/admin/officer_tests',
    params: { ...params },
  });

  const dataTests = useQuery({
    url: '/admin/tests',
  });

  const columns = TestCollums;

  useEffect(() => {
    route !== '/home' && _history.replace('/home');
  }, [_history, route]);

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

  const backgroudColor = useCallback((item) => {
    if (item.predictShallowFilter === 1 && item.predictDeepFilter === 1) return 'backgroud-red';
    if (item.predictShallowFilter === 1 && item.predictDeepFilter === 0) return 'backgroud-yellow';
    return;
  }, []);

  const restructureData = useMemo(() => {
    if (!data) return [];
    return (
      !!data &&
      data.data &&
      data?.data.map((item) => ({
        ...item,
        predictDeepFilter: item.predictDeepFilter === 1 ? 'Không' : 'Có',
        predictShallowFilter: item.predictShallowFilter === 1 ? 'Có' : 'Không',
        unit: handleUnit(item.unit),
        onClick: () => navigate(`/home/${item.id}`),
        className: backgroudColor(item),
      }))
    );
  }, [data, backgroudColor, navigate]);

  return (
    <Wrapper>
      <Container fluid>
        <div className="filter">
          <Filter
            values={params}
            dataTests={dataTests && dataTests.data ? dataTests.data.data : []}
            onFilter={handleOnFilter}
          />
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
