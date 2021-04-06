import styled from 'styled-components';

const Wrapper = styled.div`
  background: #f0ede9;
  min-height: 100vh;
  display: flex;
  align-items: center;

  .form-sign_in {
    padding: 50px;
    margin: 0 auto;
    position: relative;
    background: #fff;
    border-radius: 10px;
    -webkit-box-shadow: 0px 10px 34px -15px rgb(0 0 0 / 24%);
    -moz-box-shadow: 0px 10px 34px -15px rgba(0, 0, 0, 0.24);
    box-shadow: 0px 10px 34px -15px rgb(0 0 0 / 24%);

    .user {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      .text-user {
        color: #26df;
      }
    }

    .or {
      width: 100%;
      text-align: center;
      border-bottom: 1px solid #707070;
      line-height: 0.1em;
      margin: 30px 0;

      span {
        background: #fff;
        padding: 0 10px;
      }
    }

    .icon-user {
      margin: auto;
      width: 80px;
      height: 80px;
      background-color: #8d448b;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
    }
    .title {
      font-size: 28px;
      text-align: center;
      margin-bottom: 15px;
      color: #8d448b;
    }

    .remember-forgot {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #8d448b;

      .remember {
        position: relative;
      }

      .check-label {
        color: #8d448b;
        padding-left: 25px;

        .checkmark {
          top: 1.5px;
        }
      }
    }

    form {
      display: flex;
      flex-direction: column;
    }
    .form-input {
      margin-bottom: 10px;

      .help-block {
        color: red;
        margin-left: 5px;
      }
    }

    .has-error {
      input {
        border-color: red;
      }
    }
    button {
      position: absolute;
      bottom: -15px;
      margin: auto;
      left: 0;
      right: 0;
      background-color: #8d448b;
      border-color: #8d448b;
      padding: 10px 30px;
    }
  }
`;

export default Wrapper;
