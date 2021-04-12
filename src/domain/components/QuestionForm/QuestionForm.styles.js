import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #fff;
  margin-top: 30px;
  padding: 15px 30px;

  .format--quest {
    padding: 10px 0px 100px 0px;
    font-size: 28px;
  }

  input {
    margin-right: 5px;
    width: 18px;
    height: 18px;
  }
  .input-yes {
    margin-left: 15px;
  }

  .input-no {
    margin-left: 100px;
  }

  label {
    font-size: 20px;
  }

  .anwer-wrapper {
    display: flex;
    justify-content: center;
  }
`;

export default Wrapper;
