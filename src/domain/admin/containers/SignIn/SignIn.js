import Checkbox from 'components/Checkbox';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { User } from 'react-feather';
import { useNavigation } from 'react-navi';
import Wrapper from './SignIn.styles';

const SignIn = () => {
  const [remember, setRemember] = useState(false);
  const { navigate } = useNavigation();

  return (
    <Wrapper>
      <div className="form-sign_in">
        <div className="icon-user">
          <User size="30px" color="#fff" />
        </div>
        <div className="title">Đăng nhập</div>
        <Form>
          <Form.Control placeholder="Tài khoản" />
          <Form.Control type="password" placeholder="Mật khẩu" />
          <div className="remember-forgot">
            <Checkbox label="Nhớ mật khẩu" size="medium" checked={remember} onChange={() => setRemember(!remember)} />
            <p>Quên mật khẩu?</p>
          </div>
          <Button onClick={() => navigate('/home')}>Đăng nhập</Button>
        </Form>
      </div>
    </Wrapper>
  );
};

export default SignIn;
