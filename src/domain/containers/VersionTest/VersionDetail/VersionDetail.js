import React, { useCallback, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'hooks/axios.hooks';
import { Container, Button, Badge } from 'react-bootstrap';
import Wrapper from './VersionDetail.style';
// import questionsMock from '../../Home/Detail/questionsMock.json';
import Loading from 'components/Loading';
import { addHours, compareDesc, format, subHours } from 'date-fns';
import * as Yup from 'yup';
import ModalCreateForm from '../ModalCreate';
import { toastSuccess } from 'utils/toastify';

const VersionDetail = ({ id }) => {
  const { data, loading, force } = useQuery({ url: `/admin/tests/${id}` });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = useState(null);
  const [createTestVersion] = useMutation({ url: `/admin/tests/${id}`, method: 'PUT' });

  const dataDetail = useMemo(() => !loading && !!data && data.data, [data, loading]);
  const initialValues = useMemo(
    () => ({
      questionIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
      name: dataDetail?.name || '',
      description: dataDetail?.description || '',
      code: dataDetail?.code || '',
      startDate: subHours(new Date(dataDetail?.startDate), 7) || '',
      endDate: subHours(new Date(dataDetail?.endDate), 7) || '',
    }),
    [dataDetail],
  );

  const validateSchema = Yup.object({
    name: Yup.string().required('*Bắt buộc').trim().max(255, '*Tên quá dài'),
    description: Yup.string().required('*Bắt buộc').trim().max(600, '*Mô tả quá dài'),
    code: Yup.string().required('*Bắt buộc').trim().min(4, '*Tối thiểu 4 ký tự'),
    startDate: Yup.string()
      .required('*Bắt buộc')
      .test('test_startDate', '*Ngày tạo không được sau ngày kết thúc', function (startDate) {
        if (!!this.parent.endDate) {
          return compareDesc(new Date(this.parent.endDate), new Date(startDate)) === -1;
        }
        return !this.parent.endDate;
      }),
    endDate: Yup.string().required('*Bắt buộc'),
  });

  const handleSubmit = useCallback(
    (values, actions) => {
      const valuesCasted = validateSchema.cast(values);
      const valuesCloned = {
        ...valuesCasted,
        startDate: addHours(new Date(valuesCasted.startDate), 7).toISOString(),
        endDate: addHours(new Date(valuesCasted.endDate), 7).toISOString(),
      };
      createTestVersion({
        ...valuesCloned,
      })
        .then((response) => {
          if (!response.data.success) {
            setError({ type: 'danger', message: 'Chỉnh sửa đợt kiểm tra không thành công' });
            return;
          }
          setError({ type: 'success', message: 'Chỉnh sửa đợt kiểm tra thành công' });
          handleClose();
          actions.resetForm({ values: { ...initialValues } });
          force();
          toastSuccess('Cập nhật thông tin thành công.');
        })
        .catch((er) => {
          setError({ type: 'danger', message: 'Chỉnh sửa đợt kiểm tra không thành công' });
          setTimeout(() => {
            setError(null);
          }, 10000);
          return;
        })
        .finally(() => {
          setTimeout(() => {
            setError(null);
          }, 10000);
        });
    },
    [createTestVersion, force, initialValues, validateSchema],
  );

  return (
    <Wrapper>
      {loading && <Loading />}
      {!loading && data && (
        <Container>
          <div style={{ display: 'flex' }}>
            <Button variant="primary" onClick={handleShow} className="create--button" style={{ marginLeft: 'auto' }}>
              Sửa kì khảo sát
            </Button>
            <ModalCreateForm
              title="Chỉnh sửa đợt khảo sát"
              initialValues={initialValues}
              validateSchema={validateSchema}
              handleSubmit={handleSubmit}
              show={show}
              error={error}
              setError={setError}
              handleClose={handleClose}
            />
          </div>
          <div className="information">
            <div>
              <p className="row">
                <p className="col-6">Tên đợt khảo sát:</p> <p className="col-6">{data.data?.name || '-'}</p>
              </p>
              <p className="row">
                <p className="col-6">Mô tả đợt khảo sát:</p> <p className="col-6">{data.data?.description || '-'}</p>
              </p>
              <p className="row">
                <p className="col-6">Mã đợt khảo sát:</p> <p className="col-6">{data.data?.code || '-'}</p>
              </p>
              <p className="row">
                <p className="col-6">Thời gian bắt đầu đợt khảo sát:</p>
                <p className="col-6">
                  {format(subHours(new Date(data.data?.startDate), 7), 'dd/MM/yyyy HH:mm') || '-'}
                </p>
              </p>
              <p className="row">
                <p className="col-6">Thời gian kết thúc đợt khảo sát:</p>
                <p className="col-6">{format(subHours(new Date(data.data?.endDate), 7), 'dd/MM/yyyy HH:mm') || '-'}</p>
              </p>
              <p className="row">
                <p className="col-6">Trạng thái đợt khảo sát:</p>
                <p className="col-6">
                  {compareDesc(subHours(new Date(data.data?.startDate), 7), new Date()) !== -1 &&
                  compareDesc(new Date(), subHours(new Date(data.data?.endDate), 7)) !== -1 ? (
                    <Badge variant="success">Đang mở</Badge>
                  ) : (
                    <Badge variant="secondary">Đang đóng</Badge>
                  )}
                </p>
              </p>
            </div>
          </div>
        </Container>
      )}
    </Wrapper>
  );
};

export default VersionDetail;
