import Checkbox from 'components/Checkbox';
import { useMutation } from 'hooks/axios.hooks';
import React, { useCallback, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { User } from 'react-feather';
import { useNavigation } from 'react-navi';
import Wrapper from './SignIn.styles';

const SignIn = () => {
  const [loginInfo, setLoginInfo] = useState({});
  const [remember, setRemember] = useState(false);
  const { navigate } = useNavigation();

  const [signin] = useMutation({ url: '/api/admin/login' });

  const handleLogin = useCallback(() => {
    signin({ email: loginInfo.email, password: loginInfo.password })
      .then((req) => {
        if (req.success) {
          navigate('/home');
        }
      })
      .catch((error) => console.log(error));
  }, [loginInfo, navigate, signin]);

  return (
    <Wrapper>
      <div className="form-sign_in">
        <div className="icon-user">
          <User size="30px" color="#fff" />
        </div>
        <div className="title">Đăng nhập</div>
        <Form>
          <Form.Control
            placeholder="Tài khoản"
            value={loginInfo?.email || ''}
            onChange={(event) => setLoginInfo({ ...loginInfo, email: event.target.value })}
          />
          <Form.Control
            type="password"
            placeholder="Mật khẩu"
            value={loginInfo?.password || ''}
            onChange={(event) => setLoginInfo({ ...loginInfo, password: event.target.value })}
          />
          <div className="remember-forgot">
            <Checkbox label="Nhớ mật khẩu" size="medium" checked={remember} onChange={() => setRemember(!remember)} />
            <p>Quên mật khẩu?</p>
          </div>
          <Button onClick={handleLogin}>Đăng nhập</Button>
        </Form>
      </div>
    </Wrapper>
  );
};

export default SignIn;
