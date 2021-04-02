import TablePaginationData from 'components/TablePagination';
// import { useQuery } from 'hooks/axios.hooks';
import React, { useMemo } from 'react';
import { Button, Container } from 'react-bootstrap';
import Wrapper from './Detail.styles';
import dataMock from './mockData.json';

const Detail = ({ id }) => {
  // const { data } = useQuery({ url: `/officer_tests/${id}` });

  const restructureData = useMemo(() => {
    return (
      !!dataMock?.answer &&
      dataMock?.question.map((item, index) => ({
        question: `${index + 1}. ${item?.question}`,
        answer: dataMock?.answer.find((val) => val.test_pool_id === item.test_pool_id).answer,
      }))
    );
  }, []);
  console.log(restructureData);
  return (
    <Wrapper>
      <Container>
        <div className="information">
          <div className="row">
            <p className="col"> Họ và tên: {dataMock?.name || '-'} </p>
            <p className="col">Đợt kiểm tra: {dataMock?.testVersion || '-'}</p>
          </div>
          <div className="row">
            <p className="col">Năm sinh: {dataMock?.dateOfBirth || '-'} </p>
            <p className="col"> Giới tính: {dataMock?.gender || '-'} </p>
          </div>
          <div className="row">
            <p className="col"> Dân tộc: {dataMock?.nation || '-'} </p>
            <p className="col">Nhập ngũ: {dataMock?.joinArmy || '-'} </p>
          </div>
          <div className="row">
            <p className="col"> Đơn vị: {dataMock?.unit || '-'} </p>
            <p className="col">Số hiệu quân nhân: {dataMock?.militaryCode || '-'} </p>
          </div>
          <p> </p>
          <div className="row">
            <p className="col"> Cấp bậc: {dataMock?.rank || '-'} </p>
            <p className="col"> Chức vụ: {dataMock?.position || '-'} </p>
          </div>
        </div>
        <TablePaginationData
          columns={[
            { name: 'Câu hỏi', field: 'question' },
            { name: 'Trả lời', field: 'answer' },
          ]}
          dataMock={restructureData || []}
        />
        <div className="note-information">
          <p>Các triệu chứng bệnh khác (nếu có):</p>
          <p className="note-answer">{dataMock?.otherSymptom || ''}</p>
          <p>Các đồng chí trong cùng đơn vị có biểu hiện bất thường hoặc có triệu chứng bệnh như trên (nếu có):</p>
          <p className="note-answer">{dataMock?.otherPeople || ''}</p>
        </div>
        <div className="note-information">
          <p>Chẩn đoán:</p>
          <p className="note-answer">{`${dataMock?.predictShallowFilter === 0 ? 'Bình thường' : 'Có bệnh'} / ${
            dataMock?.predictDeepFilter === 0 ? 'Không trung thực' : 'Trung thực'
          }`}</p>
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
