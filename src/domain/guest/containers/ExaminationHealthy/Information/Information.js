import React from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Information.scss';

import InformationForm from 'domain/guest/components/InformationForm/InformationForm';
import { format } from 'date-fns';

const Information = ({ information, setInformation, onClick }) => {
  console.log(information);
  return (
    <div className="root-info-form">
      <div className="wrap-form">
        <div className="row">
          <div className="col-12">
            <InformationForm
              label={'Họ và tên quân nhân'}
              onChange={(event) => setInformation({ ...information, name: event.target.value })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div>Năm sinh</div>
            <DatePicker
              value={(!!information?.yearOfBirth && format(information?.yearOfBirth, 'dd/MM/yyyy')) || null}
              onChange={(date) => setInformation({ ...information, yearOfBirth: date })}
              dataFormat="dd/MM/yyyy"
            ></DatePicker>
          </div>
          <div className="col">
            <div style={{ marginBottom: '8px' }}>Giới tính</div>
            <div className="d-flex">
              <div style={{ marginRight: '8px' }}>
                <input
                  type="radio"
                  name="sexChoose"
                  id="cbkMale"
                  style={{ marginRight: '4px' }}
                  onChange={(e) => {
                    if (e.currentTarget.checked) {
                      setInformation({ ...information, gender: 'male' });
                    }
                  }}
                />
                <label htmlFor="cbkMale">Nam</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="sexChoose"
                  id="cbkFemale"
                  style={{ marginRight: '4px' }}
                  onChange={(e) => {
                    if (e.currentTarget.checked) {
                      setInformation({ ...information, gender: 'female' });
                    }
                  }}
                />
                <label htmlFor="cbkFemale">Nữ</label>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <InformationForm
              label={'Dân tộc'}
              onChange={(event) => setInformation({ ...information, nation: event.target.value })}
            />
          </div>
          <div className="col">
            <div>Nhập ngũ</div>
            <DatePicker
              value={(!!information?.dateOfEnlistment && format(information?.dateOfEnlistment, 'MM/yyyy')) || null}
              onChange={(date) => setInformation({ ...information, dateOfEnlistment: date })}
              dataFormat="mm/yyyy"
            ></DatePicker>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <InformationForm
              label={'Đơn vị'}
              onChange={(event) => setInformation({ ...information, unit: event.target.value })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <InformationForm
              label={'Cấp bậc'}
              onChange={(event) => setInformation({ ...information, rank: event.target.value })}
            />
          </div>
          <div className="col">
            <InformationForm
              label={'Chức vụ'}
              onChange={(event) => setInformation({ ...information, position: event.target.value })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-control" onClick={onClick}>
              Vào test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
