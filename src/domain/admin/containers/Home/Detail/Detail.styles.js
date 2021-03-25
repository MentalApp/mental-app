import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #f0ede9;
  overflow: auto;

  .information {
    padding: 30px;
    background-color: #fff;
  }

  table {
    thead {
      border-top: 1px solid #707070;
      border-bottom: 1px solid #707070;

      .question {
        padding-left: 50px;
      }
      .answer {
        width: 12%;
        white-space: nowrap;
      }
    }
    p {
      margin-bottom: 0;
      max-width: 175px;
      width: auto !important;
      @media (max-width: 1919px) {
        max-width: 96px;
      }
    }

    .post-detail-column {
      padding: 15px 0 15px 20px;
    }

    .posted-by-column {
      padding: 15px 0;

      p {
        width: 140px;
        white-space: pre;
      }
    }

    th {
      padding: 20px;
      font-size: 16px;
      color: #464646;
      font-weight: 500;
    }

    td {
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
    background-color: #fff;

    .notice-table {
      width: 100%;
    }
  }

  .note-information {
    background-color: #fff;
    padding: 30px;
    border-bottom: 1px solid #707070;
  }

  .note-answer {
    margin-left: 20px;
  }

  .note-by-doctor {
    background-color: #fff;
    margin-bottom: 100px;
    padding: 30px;

    textarea {
      width: 100%;
    }

    .button-wrapper {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;

      button {
        width: 105px;
      }
    }
  }
`;

export default Wrapper;
