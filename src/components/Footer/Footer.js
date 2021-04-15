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
        <div className="d-flex justify-content-between">
          <div>
            <Image src={hmi} height={30} className="mx-1" />
            <Image src={blife} height={30} />
            <Image src={hvqy} height={30} className="mx-1" />
          </div>
          <div>
            <div>Copyright © HMILab 2021</div>
            <div>Trường Đại học Công nghệ, DHQGHN.</div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Footer;
