import styled from 'styled-components';

const Wrapper = styled.div`
  .dropdown-toggle {
    background-color: #fff;
    color: #007bff;

    &::after {
      display: none;
    }
  }

  .dropdown-item {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 10px 40px;
    border-bottom: 1px solid #707070;

    &:last-child {
      border-bottom: none;
    }
  }
`;

export default Wrapper;
