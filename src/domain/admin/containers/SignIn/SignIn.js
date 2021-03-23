import React from 'react';
import { Button, Form } from 'react-bootstrap';
import Wrapper from './SignIn.styles';

const SignIn = () => {
  return (
    <Wrapper>
      <div>Đăng nhập</div>
      <Form>
        <Form.Control placeholder="Tài khoản" />
        <Form.Control type="password" placeholder="Mật khẩu" />
        <Button variant="outline-primary">Đăng nhập</Button>
      </Form>
    </Wrapper>
  );
};

export default SignIn;
