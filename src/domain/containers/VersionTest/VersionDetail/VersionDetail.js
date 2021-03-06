import React, { useCallback, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'hooks/axios.hooks';
import { Container, Button, Badge } from 'react-bootstrap';
import Wrapper from './VersionDetail.style';
import Loading from 'components/Loading';
import { compareDesc, format } from 'date-fns';
import * as Yup from 'yup';
import ModalCreateForm from '../ModalCreate';
import { toastSuccess } from 'utils/toastify';
import { authService } from 'utils/auth.service';

const VersionDetail = ({ id }) => {
  const { data, loading, force } = useQuery({ url: `/admin/tests/${id}` });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = useState(null);

  const currentUser = authService.getCurrentUser();

  const [createTestVersion] = useMutation({ url: `/admin/tests/${id}`, method: 'PUT' });

  const dataDetail = useMemo(() => !loading && !!data && data.data, [data, loading]);
  const initialValues = useMemo(
    () => ({
      questionIds: [
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        43,
        45,
        46,
        47,
        48,
        49,
        50,
        51,
        52,
        53,
      ],
      name: dataDetail?.name || '',
      description: dataDetail?.description || '',
      code: dataDetail?.code || '',
      startDate: dataDetail?.startDate || '',
      endDate: dataDetail?.endDate || '',
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
          <div className="btn-create">
            {currentUser.roleMaster?.roleCategories.includes(3) && (
              <Button variant="primary" onClick={handleShow} style={{ marginLeft: 'auto' }}>
                Sửa kì khảo sát
              </Button>
            )}
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
                <p className="col-6">{format(new Date(data.data?.startDate), 'dd/MM/yyyy HH:mm') || '-'}</p>
              </p>
              <p className="row">
                <p className="col-6">Thời gian kết thúc đợt khảo sát:</p>
                <p className="col-6">{format(new Date(data.data?.endDate), 'dd/MM/yyyy HH:mm') || '-'}</p>
              </p>
              <p className="row">
                <p className="col-6">Trạng thái đợt khảo sát:</p>
                <p className="col-6">
                  {compareDesc(new Date(data.data?.startDate), new Date()) !== -1 &&
                  compareDesc(new Date(), new Date(data.data?.endDate)) !== -1 ? (
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
