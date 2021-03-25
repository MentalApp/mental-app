import styled from 'styled-components';

const Wrapper = styled.div`
  .group-filter {
    display: flex;
    justify-content: space-between;
  }
  .group-item-filter {
    display: flex;
    margin-bottom: 20px;
    align-items: center;
  }

  .title {
    width: 150px;
  }

  input,
  select {
    width: 200px;
    height: 37px;
  }
`;

export default Wrapper;
