import React from 'react';
import { Container } from 'react-bootstrap';
import Wrapper from './Home.styles';

const Home = () => {
  return (
    <Wrapper>
      <Container>
        <div className="filter">
          <div className="group-filter">
            <div className="group-item-filter">
              <div className="title">Đợt kiểm tra</div>
              <select>
                <option>Tất cả</option>
                <option>Đợt 1 năm 2021</option>
                <option>Đợt 2 năm 2021</option>
              </select>
            </div>
            <div className="group-item-filter">
              <div className="title">Tên quân nhân</div>
              <input type="text" />
            </div>
          </div>
          <div className="group-filter">
            <div className="group-item-filter">
              <div className="title">Mã quân nhân</div>
              <input type="number" />
            </div>
            <div className="group-item-filter">
              <div className="title">Mức độ trung thực</div>
              <select>
                <option>Tất cả</option>
                <option>Trung thực</option>
                <option>Chưa trung thực</option>
              </select>
            </div>
            <div className="group-item-filter">
              <div className="title">Mức độ vấn đề </div>
              <select>
                <option>Tất cả</option>
                <option>Bình thường</option>
                <option>Có vấn đề</option>
                <option>Nghiêm trọng</option>
              </select>
            </div>
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

export default Home;
