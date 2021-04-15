import TablePaginationData from 'components/TablePagination';
import { useQuery } from 'hooks/axios.hooks';
import React, { useMemo } from 'react';
import { Button, Container } from 'react-bootstrap';
import Wrapper from './Detail.styles';
import questionsMock from './questionsMock.json';
import Loading from 'components/Loading';
import { format } from 'date-fns';
import { handleUnit } from 'utils/utils';

const Detail = ({ id }) => {
  const { data, loading } = useQuery({ url: `/admin/officer_tests/${id}` });

  const restructureData = useMemo(() => {
    if (!data) return;
    return questionsMock.data?.questions.map((item, index) => ({
      question: `${index + 1}. ${item?.question}`,
      answer: !!data && data.data?.answer.find((val) => val.test_pool_id === item.test_pool_id).answer,
    }));
  }, [data]);

  return (
    <Wrapper>
      {loading && <Loading />}
      {!loading && data && (
        <Container>
          <div className="information">
            <div className="row">
              <p className="col-sm-12 col-md-6"> Họ và tên: {data.data?.name || '-'} </p>
              <p className="col-sm-12 col-md-6">Đợt kiểm tra: {data.data?.testVersion?.name || '-'}</p>
              <p className="col-sm-12 col-md-6">
                Năm sinh: {format(new Date(data.data?.dateOfBirth), 'dd/MM/yyyy') || '-'}{' '}
              </p>
              <p className="col-sm-12 col-md-6"> Giới tính: {data.data?.gender === 0 ? 'Nam' : 'Nữ' || '-'} </p>
              <p className="col-sm-12 col-md-6"> Dân tộc: {data.data?.nation || '-'} </p>
              <p className="col-sm-12 col-md-6">Nhập ngũ: {format(new Date(data.data?.joinArmy), 'MM/yyyy') || '-'} </p>
              <p className="col-sm-12 col-md-6"> Đơn vị: {data && handleUnit(data.data?.unit)} </p>
              <p className="col-sm-12 col-md-6">Mã số quân nhân: {data.data?.militaryCode || '-'} </p>
              <p className="col-sm-12 col-md-6"> Cấp bậc: {data.data?.rank || '-'} </p>
              <p className="col-sm-12 col-md-6"> Chức vụ: {data.data?.position || '-'} </p>
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
          <div className="note">
            <p>
              Dựa trên kết quả trả lời của đối tượng tham gia khảo sát và dựa trên tri thức học từ chuyên gia, hệ thống
              đưa ra nhận định như sau:
            </p>
            <p className="note-answer">{` ${
              data.data?.predictShallowFilter === 0
                ? '- Có khả năng cao không có bệnh tâm thần.'
                : '- Có khả năng cao có bệnh tâm thần.'
            }`}</p>
            <p className="note-answer">{`${
              data.data?.predictDeepFilter === 1 ? '- Có mâu thuẫn trong câu trả lời.' : '- Có khả năng cao trung thực'
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
