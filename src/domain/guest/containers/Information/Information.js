import { useState } from 'react';
import InformationForm from '../../components/InformationForm/InformationForm';
import DatePicker from "react-datepicker";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import './Information.scss';

import Enumration from '../../../../common/util/enum';
const rootSelector = "root-info-form";

const fieldModel = ['UserName',]
const attrField = 'field';

const Information = () => {
  const [userName, setUserName] = useState('');
  const [yearOfBirth, setYearOfBirth] = useState(null);
  const [sex, setSex] = useState(Enumration.Sex.Male);
  const [dateOfEnlistment, setDateOfEnlistment] = useState(null);
  const [userCode, setUserCode] = useState('');
  const [orgName, setOrgName] = useState('');
  const [homeTown, setHomeTown] = useState('');

  return (
    <div className='root-info-form'>
      <div className="wrap-form">
        <div className='row'>
          <div className='col-12'>
            <InformationForm label={"Họ và tên quân nhân"} onChange={setUserName} />
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <InformationForm label={"Năm sinh"} onChange={setYearOfBirth} />
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <InformationForm label={"Giới tính"} onChange={setSex} />
          </div>
        </div>
        <div className='row'>
          <div className='col-4'>
            <div>Nhập ngũ</div>
            <DatePicker selected={dateOfEnlistment} onChange={date => setDateOfEnlistment(date)}
            dataFormat='mm/yyyy'
            ></DatePicker>
          </div>
          <div className='col-8' >
            <div style={{ marginBottom: '8px' }}>Giới tính</div>
            <div className='d-flex'>
              <div style={{ marginRight: '8px' }}>
                <input type='radio' name='sexChoose' id='cbkMale' style={{ marginRight: '4px' }}
                  onChange={e => {
                    if (e.currentTarget.checked) {
                      setSex(Enumration.Sex.Male);
                    }
                  }}
                />
                <label htmlFor='cbkMale'>Nam</label>
              </div>
              <div >
                <input type='radio' name='sexChoose' id='cbkFemale' style={{ marginRight: '4px' }}
                  onChange={e => {
                    if (e.currentTarget.checked) {
                      setSex(Enumration.Sex.Famale);
                    }
                  }}
                />
                <label htmlFor='cbkFemale' >Nữ</label>
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-12'></div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <InformationForm label={"Cấp bậc"} onChange={setHomeTown} />
          </div>
        </div>
        <div className='row'>
          <div className='col-12' style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className='btn-control' onClick={async e => {
              console.log({ userName, userCode, orgName, homeTown, yearOfBirth, sex, dateOfEnlistment });
            }}> Vào test</button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Information
