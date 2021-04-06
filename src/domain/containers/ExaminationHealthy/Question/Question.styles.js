import styled from 'styled-components';

const Wrapper = styled.div`
  box-shadow: 0px 10px 34px -15px rgba(0, 0, 0, 0.24);
  .note-if {
    background-color: #fff;
    padding: 15px 30px;
    margin-top: 30px;

    textarea {
      width: 100%;
    }
  }
  .group-button {
    background-color: #fff;
    padding: 30px;
    display: flex;
    justify-content: space-between;
  }
`;

export default Wrapper;
