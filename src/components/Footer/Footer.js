import React from 'react';
import Wrapper from './Footer.styles';
import { Image } from 'react-bootstrap';
import hmi from 'assets/img/hmi.png';
import blife from 'assets/img/blife2.png';
import hvqy from 'assets/img/Hoc_vien_Quan_y.jpg';

const Footer = () => {
  return (
    <Wrapper>
      <div className="position-footer">
        <div className="d-flex">
          <div>
            <Image src={hmi} height={18} className="mx-1" />
            <Image src={blife} height={18} />
            <Image src={hvqy} height={18} className="mx-1" />
          </div>
          <div>Copyright © HMILab 2021</div>
        </div>
        <p>Trường Đại học Công nghệ, Đại học Quốc gia Hà Nội.</p>
      </div>
    </Wrapper>
  );
};

export default Footer;
