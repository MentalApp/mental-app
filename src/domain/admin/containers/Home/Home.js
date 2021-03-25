import TablePaginationData from 'components/TablePagination';
import { useQuery } from 'hooks/axios.hooks';
import React, { useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigation } from 'react-navi';
import Filter from './Filter';
import Wrapper from './Home.styles';
import data from './mockData.json';

const Home = () => {
  const { navigate } = useNavigation();

  // const { data } = useQuery({ url: '/officer_tests' });
  console.log(data);
  const collums = [
    {
      name: 'Đợt kiểm tra',
      field: 'testVersion',
    },
    {
      name: 'Tên quân nhân',
      field: 'name',
    },
    {
      name: 'Giới tính',
      field: 'gender',
    },
    {
      name: 'Ngày sinh',
      field: 'dateOfBirth',
    },
    {
      name: 'Dân tộc',
      field: 'nation',
    },
    {
      name: 'Đơn vị',
      field: 'unit',
    },
    {
      name: 'Cấp bậc',
      field: 'rank',
    },
    {
      name: 'Chức vụ',
      field: 'position',
    },
    {
      name: 'Ngày nhập ngũ',
      field: 'joinArmy',
    },
  ];

  const restructureData = useMemo(() => {
    if (!data) return [];
    return (
      !!data &&
      data?.map((item) => ({
        ...item,
        onClick: () => navigate(`/home/${item.id}`),
      }))
    );
  }, [data, navigate]);
  return (
    <Wrapper>
      <Container>
        <div className="filter">
          <Filter />
        </div>
        <TablePaginationData columns={collums} data={restructureData} />
      </Container>
    </Wrapper>
  );
};

export default Home;
