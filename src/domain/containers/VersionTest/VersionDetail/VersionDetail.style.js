import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: calc(100vh - 194px);
  background-color: #f0ede9;
  overflow: auto;

  .information {
    padding: 30px;
    background-color: #fff;
    margin: 10px 15px;
    border-radius: 7px;
  }

  .btn-create {
    display: flex;
    padding: 15px;
  }
`;

export default Wrapper;
