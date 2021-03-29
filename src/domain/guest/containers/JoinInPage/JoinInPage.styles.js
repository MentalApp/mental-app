import styled from 'styled-components';

export default styled.div`
  background: #f0ede9;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

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
    .has-error {
      input {
        border-color: #dd4b39 !important;
        border-width: 2px;
      }
      .help-block {
        color: #dd4b39;
        font-size: 16px;
      }
    }
  }
  .form-join {
    background-color: #fff;
    padding: 50px;
    box-shadow: 0px 10px 34px -15px rgba(0, 0, 0, 0.24);
    border: 1px solid #c3b9b9;
  }
  .title {
    padding: 10px;
    text-align: center;
  }

  .alert {
    margin: 10px 0px;
  }

  .wrapper {
    padding: 10px;
    text-align: center;
  }
`;
