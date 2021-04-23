import TablePaginationData from 'components/TablePagination';
import { useQuery, useMutation } from 'hooks/axios.hooks';
import React, { useMemo, useState, useCallback } from 'react';
import { Button, Container, Media, Image } from 'react-bootstrap';
import Wrapper from './Detail.styles';
import questionsMock from './questionsMock.json';
import Loading from 'components/Loading';
import { format } from 'date-fns';
import { handleUnit } from 'utils/utils';
import * as Yup from 'yup';
import ModalCreateForm from '../Modal';
import { toastSuccess, toastError } from 'utils/toastify';
import { CURRENT_USER } from 'utils/constants';

const Detail = ({ id }) => {
  const { data, loading } = useQuery({ url: `/admin/officer_new_tests/${id}` });
  const dataPredict = useQuery({ url: `/admin/predicts/${id}` });
  const [createPredict] = useMutation({ url: '/admin/predicts' });

  const { force } = dataPredict;
  const user = JSON.parse(localStorage.getItem(CURRENT_USER));

  const [idEdit, setIdEdit] = useState(null);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [errorEdit, setErrorEdit] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleEditClose = () => setShowEdit(false);
  const handleEditShow = () => setShowEdit(true);
  const [predict, setPredict] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);
  const [conflict, setConflict] = useState(null);
  const [editPredict] = useMutation({ url: `/admin/predicts/${idEdit}`, method: 'PUT' });
  const [deletePredict] = useMutation({ url: `/admin/predicts/${idEdit}`, method: 'DELETE' });

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
      predict: 0,
      diagnosis: 0,
      conflict: '',
      officerTestId: id,
      nameUser: user.name || '',
      userId: user.id || '',
    }),
    [id, user],
  );

  const initialValuesEdit = useMemo(
    () => ({
      predict: predict || 0,
      diagnosis: diagnosis || 0,
      conflict: conflict || '',
      officerTestId: id,
      nameUser: user.name || '',
      userId: user.id || '',
    }),
    [id, user, predict, diagnosis, conflict],
  );

  const validateSchemaCreate = Yup.object({
    diagnosis: Yup.string().required('*Bắt buộc'),
    predict: Yup.string().required('*Bắt buộc'),
    conflict: Yup.string(),
  });

  const handleSubmit = useCallback(
    (values, actions) => {
      const valuesCasted = validateSchemaCreate.cast(values);
      const valuesCloned = {
        ...valuesCasted,
      };
      createPredict({
        ...valuesCloned,
      })
        .then((response) => {
          if (!response.data.success) {
            setError({ type: 'danger', message: 'Tạo đợt kiểm tra không thành công' });
            return;
          }
          setError({ type: 'success', message: 'Tạo đợt kiểm tra thành công' });
          handleClose();
          actions.resetForm({ values: { ...initialValuesCreate } });
          toastSuccess('Tạo đợt khảo sát thành công.');
          force();
        })
        .catch((er) => {
          setError({ type: 'danger', message: 'Tạo đợt kiểm tra không thành công' });
          setTimeout(() => {
            setError(null);
          }, 10000);
          return;
        })
        .finally(() => {
          setTimeout(() => {
            setError(null);
          }, 3000);
        });
    },
    [createPredict, force, initialValuesCreate, validateSchemaCreate],
  );
  const handleClickRemoveStateEdit = () => {
    setPredict(null);
    setDiagnosis(null);
    setConflict(null);
  };

  const handleSubmitEdit = useCallback(
    (values, actions) => {
      const valuesCasted = validateSchemaCreate.cast(values);
      const valuesCloned = {
        ...valuesCasted,
      };
      editPredict({
        ...valuesCloned,
      })
        .then((response) => {
          if (!response.data.success) {
            setErrorEdit({ type: 'danger', message: 'Chỉnh sửa không thành công' });
            return;
          }
          handleClickRemoveStateEdit();
          handleEditClose();
          setIdEdit(null);
          actions.resetForm({ values: { ...initialValuesEdit } });
          toastSuccess('Chỉnh sửa thành công');
          force();
        })
        .catch((er) => {
          if (er.response?.status === 403) {
            setErrorEdit({ type: 'danger', message: 'Bạn không có quyền chỉnh sửa' });
            return;
          }
          setErrorEdit({ type: 'danger', message: 'Chỉnh sửa không thành công' });
          setTimeout(() => {
            setErrorEdit(null);
          }, 10000);
          return;
        })
        .finally(() => {
          setTimeout(() => {
            setErrorEdit(null);
          }, 3000);
        });
    },
    [editPredict, force, initialValuesEdit, validateSchemaCreate],
  );

  const handleDeletePredict = useCallback(() => {
    deletePredict()
      .then((response) => {
        if (!response.data.success) {
          toastError('Xóa bình luận không thành công');
        }
        toastSuccess('Xóa bình luận thành công');
        force();
        setIdEdit(null);
      })
      .catch((er) => {
        if (er.response?.status === 403) {
          toastError('Bạn không có quyền xóa');

          return;
        }
        toastError('Xóa bình luận không thành công');
      })
      .finally(() => {
        setTimeout(() => {
          setError(null);
        }, 3000);
      });
  }, [deletePredict, force]);

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
                    <Media key={item.id}>
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
                        <div className="p1 mb-1">
                          {item?.predict === 1 ? '- Trả lời câu hỏi không trung thực' : '- Trả lời câu hỏi trung thực'}
                        </div>
                        <div className="p1">{item?.diagnosis === 1 ? '- Có mắc bệnh' : '- Không mắc bệnh'}</div>
                        <div className="p1">lý do: {item?.conflict || '-'}</div>
                        {user.role === 'admin' || user.id === item.userId ? (
                          <div className="actions d-inline-flex">
                            <p
                              className="ml-4 edit"
                              onClick={() => {
                                setPredict(item?.predict);
                                setDiagnosis(item?.diagnosis);
                                setConflict(item?.conflict);
                                setIdEdit(item?.id);
                                setTimeout(() => {
                                  handleEditShow();
                                }, 300);
                              }}
                            >
                              edit
                            </p>
                            <p
                              className="ml-2 delete"
                              onClick={() => {
                                setIdEdit(item?.id);
                                setTimeout(() => {
                                  handleDeletePredict();
                                }, 100);
                              }}
                            >
                              delete
                            </p>
                          </div>
                        ) : (
                          <div className="actions mb-4"></div>
                        )}
                      </Media.Body>
                    </Media>
                  );
                })}

              <div className="d-flex align-center">
                <Button variant="primary" className="" style={{ marginLeft: 'auto' }} onClick={handleShow}>
                  Tạo chuẩn đoán
                </Button>
                <ModalCreateForm
                  title="Chỉnh sửa chuẩn đoán"
                  initialValues={initialValuesEdit}
                  validateSchema={validateSchemaCreate}
                  handleSubmit={handleSubmitEdit}
                  show={showEdit}
                  error={errorEdit}
                  setError={setErrorEdit}
                  handleClose={handleEditClose}
                />
                <ModalCreateForm
                  title="Tạo chuẩn đoán"
                  initialValues={initialValuesCreate}
                  validateSchema={validateSchemaCreate}
                  handleSubmit={handleSubmit}
                  show={show}
                  error={error}
                  setError={setError}
                  handleClose={handleClose}
                />
              </div>
            </div>
          </div>
        </Container>
      )}
    </Wrapper>
  );
};

export default Detail;
