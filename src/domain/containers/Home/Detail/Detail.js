import TablePaginationData from 'components/TablePagination';
import { useQuery } from 'hooks/axios.hooks';
import React, { useMemo } from 'react';
import { Button, Container, Row, Col, Media, Image } from 'react-bootstrap';
import Wrapper from './Detail.styles';
import questionsMock from './questionsMock.json';
import Loading from 'components/Loading';
import { format } from 'date-fns';
import { handleUnit } from 'utils/utils';

const Detail = ({ id }) => {
  const { data, loading } = useQuery({ url: `/admin/officer_new_tests/${id}` });
  const dataPredict = useQuery({ url: `/admin/predicts/${id}` });
  const answerMap = (arr, id) => {
    const answer = arr.find((val) => val.test_pool_id === id);
    if (answer) {
      return answer.answer;
    }
  };

  const restructureData = useMemo(() => {
    if (!data) return;
    return questionsMock.data?.questions.map((item, index) => ({
      question: `${index + 1}. ${item?.question}`,
      answer: !!data && answerMap(data.data.answer, item.test_pool_id),
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
              { name: 'Câu hỏi', field: 'question', width: 'w-75' },
              { name: 'Trả lời', field: 'answer', width: 'w-25' },
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
              data.data?.predictDeepFilter === 1
                ? '- Có mâu thuẫn trong câu trả lời.'
                : '- Có khả năng cao trả lời câu hỏi trung thực'
            }`}</p>
          </div>

          <div className="note-information">
            <div>
              <div className="d-inline-flex justify-content-between">
                <div className="">
                  <h5>Chuẩn đoán của bác sỹ</h5>
                </div>
              </div>
              <hr />
              {dataPredict.data &&
                dataPredict.data?.data.map((item) => {
                  return (
                    <Media>
                      <Image
                        src="https://react.semantic-ui.com/images/avatar/small/matt.jpg"
                        height={35}
                        className="mx-1"
                      />
                      <Media.Body className="ml-2">
                        <div className="d-inline-flex time">
                          <div className="text--title mt-2">{item?.nameUser || 'Bác sỹ'}</div>
                          <div className="ml-1 mt-2">
                            {format(new Date(item?.updatedAt), 'HH:mm dd/MM/yyyy') || '-'}
                          </div>
                        </div>
                        <div classNam="p1 mb-1">
                          {item?.predict === 1 ? '- Trả lời câu hỏi không trung thực' : '- Trả lời câu hỏi trung thực'}
                        </div>
                        <div classNam="p1">{item?.diagnosis === 1 ? '- Có mắc bệnh' : '- Không mắc bệnh'}</div>
                        <div classNam="p1">lý do: {item?.conflict || '-'}</div>
                        <div className="actions d-inline-flex">
                          <p className="ml-4 edit">edit</p>
                          <p className="ml-2 delete">delete</p>
                        </div>
                      </Media.Body>
                    </Media>
                  );
                })}

              <div className="d-flex align-center">
                <Button variant="primary" className="">
                  Tạo chuẩn đoán
                </Button>
              </div>
            </div>
          </div>
        </Container>
      )}
    </Wrapper>
  );
};

export default Detail;
