import { Modal } from 'react-bootstrap';
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
