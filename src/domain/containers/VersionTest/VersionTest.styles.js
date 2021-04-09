import { Modal } from 'react-bootstrap';
import styled from 'styled-components';

const Wrapper = styled.div`
  .filter {
    background-color: #fff;
    padding: 15px;
    margin: 10px 15px 10px 15px;
    border-radius: 7px;
  }

  .create--button {
    margin: 5px 15px 0px 15px;
  }

  table {
    thead {
      border-top: 1px solid #707070;
      border-bottom: 1px solid #707070;
    }
    p {
      margin-bottom: 0;
      max-width: 175px;
      width: auto !important;
      @media (max-width: 1919px) {
        max-width: 96px;
      }
    }

    th {
      text-align: center;
      padding: 20px;
      font-size: 16px;
      color: #464646;
      font-weight: 500;
    }

    td {
      text-align: center;
      font-size: 15px;
      vertical-align: middle;
      border-bottom: 1px dashed #dbdbdb;
      padding: 20px;

      &:last-child {
        border-right: 0;
      }
    }

    tr {
      &:hover {
        background: #e5f1f1;
        cursor: pointer;
      }

      td {
        font-size: 15px !important;

        button {
          margin: auto;
          font-size: 15px !important;
          display: unset;
          color: #fff;
          font-weight: 500;
        }
      }
    }
  }

  .three-up {
    width: 100%;
    padding: 0 30px;

    .notice-table {
      width: 100%;
      border-bottom: 1px solid #707070;
    }
  }
`;

export default Wrapper;

export const ModalWrapper = styled(Modal)`
  .error-text {
    margin: 0;
    color: red;
  }
  .react-datepicker-wrapper {
    display: unset;

    input {
      height: 40px;
      border: 1px solid #dddddd;
      border-radius: 5px;
      padding: 10px;
      color: #66615b;
    }
  }

  .has-error {
    border-color: red !important;
  }
`;
