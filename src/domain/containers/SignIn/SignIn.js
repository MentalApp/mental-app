import Checkbox from 'components/Checkbox';
import { useMutation } from 'hooks/axios.hooks';
import React, { useCallback, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { User } from 'react-feather';
import { useNavigation } from 'react-navi';
import Wrapper from './SignIn.styles';
import { TOKEN, ErrorMessage, CURRENT_USER } from 'utils/constants';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Footer from 'components/Footer';

const SignIn = () => {
  const [remember, setRemember] = useState(false);
  const { navigate } = useNavigation();
  const [error, setError] = useState(null);

  const [signin] = useMutation({ url: '/admin/login' });

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().trim().email('*Tài khoản phải là email').required('*Yêu cầu nhập tài khoản'),
    password: Yup.string().required('*Yêu cầu nhập mật khẩu').min(6, '*Mật khẩu tối thiểu 6 ký tự'),
  });

  const handleLogin = useCallback(
    (values, actions) => {
      const valuesCasted = validationSchema.cast(values);

      signin({ ...valuesCasted })
        .then((response) => {
          if (!response.data.success) {
            setError(ErrorMessage.EMAIL_AND_PASSWORD_IS_INVALID);
            return;
          }
          window.localStorage.setItem(CURRENT_USER, JSON.stringify(response.data.data));
          window.localStorage.setItem(TOKEN, JSON.stringify(response.data.data.token));
          navigate('/home');
        })
        .catch((err) => {
          if (err.response.status === 404 && err.response.data.code === 1001) {
            setError(ErrorMessage.USER_IS_BLOCKING);
            return;
          }

          setError(ErrorMessage.EMAIL_AND_PASSWORD_IS_INVALID);
          return;
        })
        .finally(() => actions.setSubmitting(false));
    },
    [navigate, signin, validationSchema],
  );

  setTimeout(() => {
    setError(null);
  }, 5000);

  return (
    <Wrapper>
      <div className="form-sign_in">
        <div className="icon-user">
          <User size="30px" color="#fff" />
        </div>
        <div className="title">Đăng nhập</div>
        {error && <Alert variant="danger">{error}</Alert>}
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
          {(props) => (
            <Form onSubmit={props.handleSubmit} autoComplete="off">
              <div className={`form-input ${props.errors?.email && props.touched?.email ? 'has-error' : ''}`}>
                <Form.Control
                  placeholder="Tài khoản"
                  name="email"
                  value={props.values?.email || ''}
                  onChange={props.handleChange}
                />
                {props.errors?.email && props.touched?.email && (
                  <span className="help-block">{props.errors?.email}</span>
                )}
              </div>
              <div className={`form-input ${props.errors?.password && props.touched?.password ? 'has-error' : ''}`}>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  value={props.values?.password || ''}
                  onChange={props.handleChange}
                />
                {props.errors?.password && props.touched?.password && (
                  <span className="help-block">{props.errors?.password}</span>
                )}
              </div>
              <div className="remember-forgot">
                <Checkbox
                  label="Nhớ mật khẩu"
                  size="medium"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                />
              </div>
              <Button type="submit" disabled={props.isSubmitting}>
                Đăng nhập
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <Footer />
    </Wrapper>
  );
};

export default SignIn;
