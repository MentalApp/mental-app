import styled from 'styled-components';

const Wrapper = styled.div`
  .filter-question {
    display: flex;
    background: #fff;
    padding: 15px;

    .filter-search {
      display: flex;
      justify-content: space-between;
      margin-right: 50px;
      align-items: center;

      .label-search {
        font-size: 16px;
        margin-right: 10px;
      }

      input {
        height: 37px;
      }
    }
  }
`;

export default Wrapper;
