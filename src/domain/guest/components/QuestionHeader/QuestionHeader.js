import { format } from 'date-fns';
import React from 'react';
import Wrapper from './QuestionHeader.styles';

const QuestionHeader = ({ information }) => {
  return (
    <Wrapper>
      <p> Họ và tên: {(!!information && information.name) || ''} </p>
      <div className="row-infor">
        <p> Năm sinh: {(!!information && format(information?.yearOfBirth, 'dd/MM/yyyy')) || ''} </p>
        <p> Giới tính: {(!!information && information.gender) || ''} </p>
      </div>
      <div className="row-infor">
        <p> Dân tộc: {(!!information && information.nation) || ''} </p>
        <p> Nhập ngũ: {(!!information && format(information?.dateOfEnlistment, 'MM/yyyy')) || ''} </p>
      </div>
      <p> Đơn vị: {(!!information && information.unit) || ''} </p>
      <div className="row-infor">
        <p> Cấp bậc: {(!!information && information.rank) || ''} </p>
        <p> Chức vụ: {(!!information && information.position) || ''} </p>
      </div>
    </Wrapper>
  );
};

export default QuestionHeader;
