import TablePaginationData from 'components/TablePagination';
import { useQuery } from 'hooks/axios.hooks';
import React, { useMemo } from 'react';
import { Button, Container } from 'react-bootstrap';
import Wrapper from './Detail.styles';
import questionsMock from './questionsMock.json';
import Loading from 'components/Loading';
import { format } from 'date-fns';

const Detail = ({ id }) => {
  const { data, loading } = useQuery({ url: `/admin/officer_tests/${id}` });
  console.log(data);

  const restructureData = useMemo(() => {
    if (!data) return;
    return questionsMock.data?.questions.map((item, index) => ({
      question: `${index + 1}. ${item?.question}`,
      answer: !!data && data.data?.answer.find((val) => val.test_pool_id === item.test_pool_id).answer,
    }));
  }, [data]);
  console.log(restructureData);

  return (
    <Wrapper>
      {loading && <Loading />}
      {!loading && (
        <Container>
          <div className="information">
            <div className="row">
              <p className="col"> Họ và tên: {data.data?.name || '-'} </p>
              <p className="col">Đợt kiểm tra: {data.data?.testVersion || '-'}</p>
            </div>
            <div className="row">
              <p className="col">Năm sinh: {format(new Date(data.data?.dateOfBirth), 'dd/MM/yyyy') || '-'} </p>
              <p className="col"> Giới tính: {data.data?.gender === 0 ? 'Nam' : 'Nữ' || '-'} </p>
            </div>
            <div className="row">
              <p className="col"> Dân tộc: {data.data?.nation || '-'} </p>
              <p className="col">Nhập ngũ: {data.data?.joinArmy || '-'} </p>
            </div>
            <div className="row">
              <p className="col"> Đơn vị: {data.data?.unit || '-'} </p>
              <p className="col">Số hiệu quân nhân: {data.data?.militaryCode || '-'} </p>
            </div>
            <p> </p>
            <div className="row">
              <p className="col"> Cấp bậc: {data.data?.rank || '-'} </p>
              <p className="col"> Chức vụ: {data.data?.position || '-'} </p>
            </div>
          </div>
          <TablePaginationData
            columns={[
              { name: 'Câu hỏi', field: 'question' },
              { name: 'Trả lời', field: 'answer' },
            ]}
            data={restructureData || []}
          />
          <div className="note-information">
            <p>Các triệu chứng bệnh khác (nếu có):</p>
            <p className="note-answer">{data.data?.otherSymptom || ''}</p>
            <p>Các đồng chí trong cùng đơn vị có biểu hiện bất thường hoặc có triệu chứng bệnh như trên (nếu có):</p>
            <p className="note-answer">{data.data?.otherPeople || ''}</p>
          </div>
          <div className="note-information">
            <p>Chẩn đoán:</p>
            <p className="note-answer">{`Lọc nông: ${
              data.data?.predictShallowFilter === 0 ? 'Không có bệnh' : 'Có bệnh'
            }`}</p>
            <p className="note-answer">{`Lọc sâu: ${
              data.data?.predictDeepFilter === 1 ? 'Không trung thực' : 'Trung thực'
            }`}</p>
          </div>
          <div className="note-by-doctor">
            <textarea rows="4" />
            <div className="button-wrapper">
              <Button variant="outline-primary">Lưu</Button>
            </div>
          </div>
        </Container>
      )}
    </Wrapper>
  );
};

export default Detail;
