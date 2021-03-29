// import { format } from 'date-fns';
import React from 'react';
import Wrapper from './QuestionHeader.styles';

const QuestionHeader = ({ information }) => {
  return (
    <Wrapper>
      <p> Họ và tên: {(!!information && information.name) || '-'} </p>
      <div className="row">
        <p className="col">Năm sinh: {(!!information?.yearOfBirth && information?.yearOfBirth) || '-'} </p>
        <p className="col"> Giới tính: {(!!information && information.gender) || '-'} </p>
      </div>
      <div className="row">
        <p className="col"> Dân tộc: {(!!information && information.nation) || '-'} </p>
        <p className="col">Nhập ngũ: {(!!information?.dateOfEnlistment && information?.dateOfEnlistment) || '-'} </p>
      </div>
      <p> Đơn vị: {(!!information && information.unit) || '-'} </p>
      <div className="row">
        <p className="col"> Cấp bậc: {(!!information && information.rank) || '-'} </p>
        <p className="col"> Chức vụ: {(!!information && information.position) || '-'} </p>
      </div>
    </Wrapper>
  );
};

export default QuestionHeader;
