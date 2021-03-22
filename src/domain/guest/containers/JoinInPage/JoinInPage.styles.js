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

    input.form-control {
      height: 40px;
      width: 100%;
      padding: 8px;
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
    border: 1px solid #e0e0e0;
  }
  button {
    margin-top: 20px;
    background-color: #4caf50; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    // position: absolute;
  }
  .wrapper {
    width: 280px;
    text-align: center;
  }
`;
