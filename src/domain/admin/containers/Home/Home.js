import TablePaginationData from 'components/TablePagination';
import { useQuery } from 'hooks/axios.hooks';
import React, { useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigation } from 'react-navi';
import Filter from './Filter';
import Wrapper from './Home.styles';
import dataMock from './mockData.json';
import { TestCollums } from 'utils/constants';

const Home = () => {
  const { navigate } = useNavigation();
  const { data } = useQuery({ url: '/officer_tests' });
  const columns = TestCollums;
  console.log(data);

  const restructureData = useMemo(() => {
    if (!dataMock) return [];
    return (
      !!dataMock &&
      dataMock?.map((item) => ({
        ...item,
        onClick: () => navigate(`/home/${item.id}`),
      }))
    );
  }, [navigate]);

  return (
    <Wrapper>
      <Container fluid>
        <div className="filter">
          <Filter />
        </div>
        <TablePaginationData columns={columns} data={restructureData} />
      </Container>
    </Wrapper>
  );
};

export default Home;
