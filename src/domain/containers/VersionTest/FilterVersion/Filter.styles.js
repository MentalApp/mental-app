import styled from 'styled-components';

const Wrapper = styled.div`
  .title {
    min-width: 150px;
  }

  input,
  select {
    width: 200px;
    height: 37px;
  }

  .group-filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export default Wrapper;
