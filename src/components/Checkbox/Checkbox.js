import React from 'react';

import styled from 'styled-components';

const CheckboxWrapper = styled.div`
  display: flex;

  .check-label {
    color: #333;
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 18px;
    margin-top: 5px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    input:checked ~ .checkmark:after {
      display: block;
    }

    .checkmark:after {
      left: 9px;
      top: 3px;
      border-width: 0 2px 2px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }

  .checkmark {
    position: absolute;
    top: ${({ inform }) => (inform ? '2px' : 0)};
    left: 6px;
    border: 1px solid;
    background-color: #fff;
    &:after {
      content: '';
      position: absolute;
      display: none;
    }
  }

  .check-label {
    font-size: 14px !important;
  }

  .checkmark {
    height: 20px;
    width: 20px;

    &:after {
      border: solid #fff;
      width: 4px;
      height: 12px;
    }
  }

  ${({ inform }) =>
    inform &&
    `align-items: center;
  .checkmark {
    height: 25px !important;
    width: 25px !important;
    &:after {
      border: solid #8d448b;
      width: 5px;
      height: 17px;
    }
  }

  span {
    height: 33px;
    margin-bottom: 10px;
  }

  .check-label {
    margin-right: 25px !important;
    font-size: 18px !important;
  }`}

  .add-bg {
    background: #8d448b;
    &:after {
      border-color: #fff !important;
    }
  }

  .small-size {
    .checkmark {
      height: 13px;
      width: 13px;
      &:after {
        left: 4px;
        top: 0px;
        width: 4px;
        height: 10px;
      }
    }
  }

  .medium-size {
    .checkmark {
      width: 15px !important;
      height: 15px !important;
      top: 8.5px;

      &.add-bg {
        &::after {
          left: 5px !important;
          top: 0 !important;
          border-color: #8d448b;
        }
      }
    }
  }

  .large-size {
    .checkmark {
      width: 21px !important;
      height: 21px !important;
      top: 8.5px;
      &.add-bg {
        &::after {
          left: 8px !important;
          top: 2 !important;
          border-color: #8d448b;
        }
      }
    }
    .check-label {
      line-height: 29px;
      height: 21px;
    }
  }

  .disabled {
    opacity: 0.3 !important;
    background: #fff;
    border: 1px solid #1c1c1c !important;
    cursor: default;
  }
`;

const Checkbox = ({ label, inform = false, size = '', ...props }) => {
  return (
    <CheckboxWrapper inform={inform}>
      <label className={`check-label ${size}-size`}>
        {label}
        <input type="checkbox" {...props} />
        <span className={`checkmark ${props.checked ? 'add-bg' : ''} ${props.disabled ? 'disabled' : ''}`}></span>
      </label>
    </CheckboxWrapper>
  );
};

export default Checkbox;
