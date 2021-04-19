import React, { useMemo, useState, useEffect } from 'react';
import { Button, Badge, Container } from 'react-bootstrap';
import { useQuery } from 'hooks/axios.hooks';
import Loading from 'components/Loading';
import Wrapper from './Account.styles';
import { useNavigation } from 'react-navi';
import TablePaginationData from 'components/TablePagination';
import { AccountCollums } from 'utils/constants';
import { uppercaseString } from 'utils/utils';
import { format } from 'date-fns';
import AlertError from 'components/AlertError';

const Account = () => {
  const [errorGetData, setErrorGetData] = useState(null);
  const { navigate } = useNavigation();
  const [page, setPage] = useState(1);
  const [setShow] = useState(false);

  const { data, loading, errors } = useQuery({
    url: 'admin/doctors',
  });

  useEffect(() => {
    if (errors && errors.response?.status === 404) {
      setErrorGetData('Dữ liệu trả về không có!');
    }
    if (data) {
      setErrorGetData(null);
    }
  }, [errors, data]);
  const handleShow = () => setShow(true);

  const restructureData = useMemo(() => {
    if (!data) return;
    return (
      !!data &&
      data.data?.map((item, index) => ({
        ...item,
        stt: index + 1,
        name: <div className="typography">{uppercaseString(item.fullName)}</div>,
        militaryCode: <div>{item.militaryCode}</div>,
        status:
          item.isBlock === 2 ? (
            <Badge variant="success">Đang hoạt động</Badge>
          ) : (
            <Badge variant="secondary">Đang ngừng hoạt động</Badge>
          ),
        startDate: <div>{format(new Date(item.createdAt), 'HH:mm dd/MM/yyyy')}</div>,

        onClick: () => navigate(`/account/${item.id}`),
      }))
    );
  }, [data, navigate]);

  return (
    <>
      {loading && <Loading />}
      {errors && <AlertError message={errorGetData} isShow={!!errorGetData} />}
      {data && data.data.length > 0 && !errorGetData && !loading ? (
        <Wrapper>
          <Container className="mt-4" fluid>
            <div style={{ display: 'flex' }}>
              <Button
                variant="primary"
                className="create--button mb-4"
                onClick={handleShow}
                style={{ marginLeft: 'auto' }}
              >
                Tạo
              </Button>
            </div>
            <TablePaginationData
              columns={AccountCollums}
              isLoading={loading}
              data={restructureData}
              page={page}
              totalPages={(data && data.totalPages) || 0}
              onChangePage={(page) => {
                setPage(page);
              }}
            />
          </Container>
        </Wrapper>
      ) : (
        <Wrapper>
          <Container className="mt-4" fluid>
            <TablePaginationData
              columns={AccountCollums}
              isLoading={false}
              data={[]}
              page={page}
              totalPages={(data && data.totalPages) || 0}
              onChangePage={(page) => {
                setPage(page);
              }}
            />
          </Container>
        </Wrapper>
      )}
    </>
  );
};

export default Account;
