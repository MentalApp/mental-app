import React, { useCallback } from 'react';
import { useMutation } from 'hooks/axios.hooks';
import JoinInPageWrapper from './JoinInPage.styles';
import { useNavigation } from 'react-navi';

const JoinInPage = () => {
  const { navigate } = useNavigation();
  // const initialValues = { code: '' };
  // const [sign_in] = useMutation({ url: '/sign_in' });

  // const handleSubmit = useCallback();

  return (
    <JoinInPageWrapper>
      <div className="login-form">
        <form className="form-join">
          <input className="form-control" placeholder="Nhập mã kiểm tra" type="text"></input>
          <div className="wrapper">
            <button type="submit" onClick={() => navigate('/examination')}>
              Kiểm tra
            </button>
          </div>
        </form>
      </div>
    </JoinInPageWrapper>
  );
};

export default JoinInPage;
