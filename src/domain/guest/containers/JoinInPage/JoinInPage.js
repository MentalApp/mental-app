import React, { useCallback } from 'react';
import { useMutation } from 'hooks/axios.hooks';
import JoinInPageWrapper from './JoinInPage.styles';

const JoinInPage = () => {
  const initialValues = { code: '' };
  const [sign_in] = useMutation({ url: '/sign_in' });

  const handleSubmit = useCallback();

  return (
    <JoinInPageWrapper>
      <div className="login-form">
        <form>
          <input className="form-control" placeholder="Nhập mã kiểm tra" type="text"></input>
          <div class="wrapper">
            <button type="submit">Kiểm tra</button>
          </div>
        </form>
      </div>
    </JoinInPageWrapper>
  );
};

export default JoinInPage;
