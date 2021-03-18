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
    width: 260px;
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
  button {
    margin-top: 20px;
    background-color: #4CAF50; /* Green */
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
