import styled from 'styled-components';

export default styled.div`
  background: #f0ede9;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  margin: auto;

  .login-form {
    margin: 0 auto;
    color: #dd4b39;
    justify-content: center;

    input.form-control {
      height: 40px;
      padding: 8px;
      width: 100%;
      text-align: center;
      border: 1px solid #c3b9b9;
    }
  }
  .form-join {
    background-color: #fff;
    padding: 50px;
  }
  .title {
    padding: 10px;
    text-align: center;
  }

  .alert {
    margin: 10px 0px;
  }

  .align--button {
    padding: 10px;
    text-align: center;
  }
`;
