import { useQuery } from 'hooks/axios.hooks';
import React from 'react';
import { Container } from 'react-bootstrap';
import Wrapper from './VersionDetail.style';
// import questionsMock from '../../Home/Detail/questionsMock.json';
import Loading from 'components/Loading';
// import { format } from 'date-fns';

const VersionDetail = ({ id }) => {
  const { data, loading } = useQuery({ url: `/admin/tests/${id}` });
  console.log(data);

  return (
    <Wrapper>
      {loading && <Loading />}
      {!loading && data && (
        <Container>
          <div className="information">
            <div>
              <p className="col"> Tên đợt khảo sát: {data.data?.name || '-'} </p>
              <p className="col">Mô tả đợt khảo sát: {data.data?.code || '-'}</p>
              <p className="col">Mã code vào khảo sát: {data.data?.entryCode || ''}</p>
              <p className="col">Trạng thái đợt khảo sát:{data.data?.isClose ? 'Đóng' : 'Mở'}</p>
              <p className="col">Thời gian:{data.data?.timer + 'p'} </p>
            </div>
          </div>
        </Container>
      )}
    </Wrapper>
  );
};

export default VersionDetail;

// code: "khaosatlan1"
// description: "Đợt khảo sát lần 1"
// entryCode: ""
// id: 1
// isClose: false
// name: "Khảo sát lần 1"
// questions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]
// testVersionId: "qwerty"
// timer: 90
