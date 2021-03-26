import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  padding: 10px 30px;
  .active {
    color: #29afaf;
  }
  .side-bar-menu {
    position: fixed;
    min-height: 100vh;
    background-color: #e9ecef;
    top: 0;
    left: 0;
    z-index: 1;

    .title {
      margin: 20px;
      display: flex;
      justify-content: center;
      font-size: 20px;
      position: relative;
      border-bottom: 1px solid #707070;
    }

    .settings {
      position: absolute;
      bottom: 30px;
      width: 100%;
    }

    .button-close {
      position: absolute;
      right: -70px;
      top: -20px;
      width: 50px;
      height: 50px;
      background-color: #e9ecef;
    }
  }

  .item-header {
    margin-right: 15px;
    cursor: pointer;
  }
`;

export default Wrapper;
