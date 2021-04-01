import TablePaginationData from 'components/TablePagination';
// import { useQuery } from 'hooks/axios.hooks';
import React, { useMemo } from 'react';
import { Button, Container } from 'react-bootstrap';
import Wrapper from './Detail.styles';
import data from './mockData.json';

const Detail = ({ id }) => {
  // const { data } = useQuery({ url: `/officer_tests/${id}` });

  const restructureData = useMemo(() => {
    return (
      !!data?.answer &&
      data?.question.map((item, index) => ({
        question: `${index + 1}. ${item?.question}`,
        answer: data?.answer.find((val) => val.test_pool_id === item.test_pool_id).answer,
      }))
    );
  }, []);
  console.log(restructureData);
  return (
    <Wrapper>
      <Container>
        <div className="information">
          <div className="row">
            <p className="col"> Họ và tên: {data?.name || '-'} </p>
            <p className="col">Đợt kiểm tra: {data?.testVersion || '-'}</p>
          </div>
          <div className="row">
            <p className="col">Năm sinh: {data?.dateOfBirth || '-'} </p>
            <p className="col"> Giới tính: {data?.gender || '-'} </p>
          </div>
          <div className="row">
            <p className="col"> Dân tộc: {data?.nation || '-'} </p>
            <p className="col">Nhập ngũ: {data?.joinArmy || '-'} </p>
          </div>
          <div className="row">
            <p className="col"> Đơn vị: {data?.unit || '-'} </p>
            <p className="col">Số hiệu quân nhân: {data?.militaryCode || '-'} </p>
          </div>
          <p> </p>
          <div className="row">
            <p className="col"> Cấp bậc: {data?.rank || '-'} </p>
            <p className="col"> Chức vụ: {data?.position || '-'} </p>
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
          <p className="note-answer">{data?.otherSymptom || ''}</p>
          <p>Các đồng chí trong cùng đơn vị có biểu hiện bất thường hoặc có triệu chứng bệnh như trên (nếu có):</p>
          <p className="note-answer">{data?.otherPeople || ''}</p>
        </div>
        <div className="note-information">
          <p>Chẩn đoán:</p>
          <p className="note-answer">{data?.predictShallowFilter || ''}</p>
        </div>
        <div className="note-by-doctor">
          <textarea rows="4" />
          <div className="button-wrapper">
            <Button variant="outline-primary">Lưu</Button>
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

export default Detail;
