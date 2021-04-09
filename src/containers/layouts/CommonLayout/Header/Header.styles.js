import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  padding: 20px 30px;
  background-color: #fff;

  .header-wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .group-left {
      display: flex;
      align-items: center;

      .text-title {
        font-weight: 400;
        font-size: 20px;
        margin-left: 8px;
      }
    }
    .user-wrapper {
      border: 1px solid;
      border-radius: 50%;
    }
  }
  .active {
    color: #29afaf;
  }
  .side-bar-menu {
    position: fixed;
    min-height: 100vh;
    width: 300px;
    background-color: #e9ecef;
    top: 0;
    overflow-x: hidden;
    transition: 0.5s;
    left: 0;
    z-index: 2;

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

    /* .button-close {
      position: absolute;
      right: -60px;
      top: -20px;
      width: 40px;
      height: 40px;
      background-color: #e9ecef;
    } */

    .side-navigation-panel-select-option-selected {
      background-color: #6ecee4 !important;
      color: #fff !important;
    }
  }

  .item-header {
    margin-right: 15px;
    cursor: pointer;
  }
`;

export default Wrapper;
