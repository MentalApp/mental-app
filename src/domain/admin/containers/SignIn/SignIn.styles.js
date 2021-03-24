import styled from 'styled-components';

const Wrapper = styled.div`
  background: #f0ede9;
  min-height: 100vh;
  display: flex;
  align-items: center;

  .form-sign_in {
    width: 260px;
    margin: 0 auto;

    .title {
      font-size: 28px;
      text-align: center;
      margin-bottom: 15px;
    }

    form {
      display: flex;
      flex-direction: column;
    }
    input {
      margin-bottom: 10px;
    }
    button {
      margin: 0 auto;
    }
  }
`;

export default Wrapper;
