import React from 'react';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Information.scss';
import vi from 'date-fns/locale/vi';
import InformationForm from 'domain/guest/components/InformationForm/InformationForm';
import { format } from 'date-fns';
import { Form, Button } from 'react-bootstrap';

registerLocale('vi', vi);
const Information = ({ values, setFieldValue, handleSubmit, errors, touched }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <div className="root-info-form">
        <div className="wrap-form">
          <div className="row">
            <div className="col-12">
              <InformationForm
                className={`input-control ${touched.name && errors.name ? 'has-error' : ''}`}
                value={values?.name}
                label={'Họ và tên quân nhân'}
                onChange={(event) => setFieldValue('name', event.target.value)}
              />
              {touched.name && errors.name && <p className="error-text">{errors.name}</p>}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div>Năm sinh</div>
              <DatePicker
                className={touched.yearOfBirth && errors.yearOfBirth ? 'has-error' : ''}
                value={(!!values?.yearOfBirth && values?.yearOfBirth) || null}
                onChange={(date) => setFieldValue('yearOfBirth', format(date, 'dd/MM/yyyy'))}
                dataFormat="dd/MM/yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                locale="vi"
              ></DatePicker>
              {touched.yearOfBirth && errors.yearOfBirth && <p className="error-text">{errors.yearOfBirth}</p>}
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
                        setFieldValue('gender', 'male');
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
                        setFieldValue('gender', 'female');
                      }
                    }}
                  />
                  <label htmlFor="cbkFemale">Nữ</label>
                </div>
              </div>
              {touched.gender && errors.gender && <p className="error-text">{errors.gender}</p>}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <InformationForm
                className={`input-control ${touched.nation && errors.nation ? 'has-error' : ''}`}
                value={values?.nation}
                label={'Dân tộc'}
                onChange={(event) => setFieldValue('nation', event.target.value)}
              />
              {touched.nation && errors.nation && <p className="error-text">{errors.nation}</p>}
            </div>
            <div className="col join-army">
              <div>Nhập ngũ</div>
              <DatePicker
                className={touched.dateOfEnlistment && errors.dateOfEnlistment ? 'has-error' : ''}
                value={(!!values?.dateOfEnlistment && values?.dateOfEnlistment) || null}
                onChange={(date) => setFieldValue('dateOfEnlistment', format(date, 'MM/yyyy'))}
                dataFormat="mm/yyyy"
                showMonthDropdown
                showYearDropdown
                showMonthYearPicker
                dropdownMode="select"
                locale="vi"
              ></DatePicker>
              {touched.dateOfEnlistment && errors.dateOfEnlistment && (
                <p className="error-text">{errors.dateOfEnlistment}</p>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <InformationForm
                className={`input-control ${touched.unit && errors.unit ? 'has-error' : ''}`}
                value={values?.unit}
                label={'Đơn vị'}
                onChange={(event) => setFieldValue('unit', event.target.value)}
              />
              {touched.unit && errors.unit && <p className="error-text">{errors.unit}</p>}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <InformationForm
                className={`input-control ${touched.rank && errors.rank ? 'has-error' : ''}`}
                value={values?.rank}
                label={'Cấp bậc'}
                onChange={(event) => setFieldValue('rank', event.target.value)}
              />
              {touched.rank && errors.rank && <p className="error-text">{errors.rank}</p>}
            </div>
            <div className="col">
              <InformationForm
                className={`input-control ${touched.position && errors.position ? 'has-error' : ''}`}
                value={values?.position}
                label={'Chức vụ'}
                onChange={(event) => setFieldValue('position', event.target.value)}
              />
              {touched.position && errors.position && <p className="error-text">{errors.position}</p>}
            </div>
          </div>
          <div className="row">
            <div className="col-12" style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="outline-success" className="justify-content-center buttonTest" type="submit">
                Vào test
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Information;
