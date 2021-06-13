import TablePaginationData from 'components/TablePagination';
import { useQuery, useMutation } from 'hooks/axios.hooks';
import React, { useMemo, useState, useCallback } from 'react';
import { Button, Container } from 'react-bootstrap';
import Wrapper from './Detail.styles';
import questionsMock from './questionsMock.json';
import Loading from 'components/Loading';
import { format } from 'date-fns';
import { handleUnit } from 'utils/utils';
import * as Yup from 'yup';
import { toastSuccess } from 'utils/toastify';
import { CURRENT_USER } from 'utils/constants';
import { Formik } from 'formik';
import { Edit3 } from 'react-feather';
import { toastError } from 'utils/toastify';

const FormComment = ({
  initialValuesCreate,
  handleSubmit,
  validationSchema,
  labelButton = 'Tạo chuẩn đoán',
  onCancel,
}) => {
  return (
    <Formik initialValues={initialValuesCreate} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <textarea
            className={`field-comment ${props.errors.comment && props.touched.comment ? 'has-error' : ''}`}
            value={props.values.comment}
            onChange={props.handleChange}
            name="comment"
          />
          {props.errors.comment && props.touched.comment && <div className="text-error">{props.errors.comment}</div>}
          <div className="d-flex align-center">
            <Button variant="primary" type="submit" style={{ marginLeft: 'auto' }} disabled={props.isSubmitting}>
              {labelButton}
            </Button>
            {!!onCancel && (
              <Button variant="secondary" onClick={onCancel} style={{ marginLeft: '20px' }}>
                Hủy bỏ
              </Button>
            )}
          </div>
        </form>
      )}
    </Formik>
  );
};

const Detail = ({ id }) => {
  const [updateComment, setUpdateComment] = useState(null);

  const { data, loading, force } = useQuery({ url: `/admin/officer_tests/${id}` });
  const [createComment] = useMutation({ url: '/admin/comments' });
  const [editComment] = useMutation({ url: `/admin/comments/${updateComment?.id}`, method: 'PUT' });

  const user = JSON.parse(localStorage.getItem(CURRENT_USER));

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
      answer: !!data && !loading && answerMap(data.data.answer, item.test_pool_id),
    }));
  }, [data, loading]);

  const initialValuesCreate = useMemo(
    () => ({
      comment: updateComment?.comment || '',
      officerId: id,
    }),
    [id, updateComment],
  );

  const validationSchema = Yup.object({
    comment: Yup.string().required('*Bắt buộc').trim(),
  });

  const createOrUpdate = useMemo(() => (!!updateComment ? editComment : createComment), [
    createComment,
    editComment,
    updateComment,
  ]);

  const handleSubmit = useCallback(
    (values, actions) => {
      const valuesCasted = validationSchema.cast(values);
      const valuesCloned = {
        ...valuesCasted,
      };
      createOrUpdate({
        ...valuesCloned,
      })
        .then((response) => {
          if (!response.data.success) {
            toastError('Comment không thành công.');
            return;
          }
          toastSuccess('Comment thành công.');
          setUpdateComment(null);
          force();
        })
        .catch((er) => {
          toastError('Comment không thành công.');

          return;
        })
        .finally(() => {
          actions.setSubmitting(false);
        });
    },
    [createOrUpdate, force, validationSchema],
  );

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
              {data?.data?.comments.map((comment, index) => (
                <div className="group-comment" key={index}>
                  <div className="user-comment">
                    <div className="user-name">{comment.user.fullName}</div>
                    {user.id === comment.user.id && (
                      <Edit3
                        color="#007bff"
                        onClick={() => setUpdateComment({ id: comment.id, comment: comment.comment })}
                      />
                    )}
                  </div>
                  {!!updateComment && updateComment?.id === comment.id ? (
                    <FormComment
                      initialValuesCreate={initialValuesCreate}
                      validationSchema={validationSchema}
                      handleSubmit={handleSubmit}
                      labelButton="Cập nhật"
                      onCancel={() => setUpdateComment(null)}
                    />
                  ) : (
                    <div className="comment">{comment.comment}</div>
                  )}
                  <hr />
                </div>
              ))}
              {!updateComment && user.roleMaster?.roleCategories.includes(5) && (
                <FormComment
                  initialValuesCreate={initialValuesCreate}
                  validationSchema={validationSchema}
                  handleSubmit={handleSubmit}
                />
              )}
            </div>
          </div>
        </Container>
      )}
    </Wrapper>
  );
};

export default Detail;
