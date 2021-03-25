import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigation } from 'react-navi';
import Wrapper from './SignIn.styles';

const SignIn = () => {
  const { navigate } = useNavigation();

  return (
    <Wrapper>
      <div className="form-sign_in">
        <div className="title">Đăng nhập</div>
        <Form>
          <Form.Control placeholder="Tài khoản" />
          <Form.Control type="password" placeholder="Mật khẩu" />
          <Button variant="outline-primary" onClick={() => navigate('/home')}>
            Đăng nhập
          </Button>
        </Form>
      </div>
    </Wrapper>
  );
};

export default SignIn;
