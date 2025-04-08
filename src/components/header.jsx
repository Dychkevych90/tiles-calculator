import React from "react";
import styled from "styled-components";
import close from "../../public/close.svg";
import logo from '../../public/newLogo.jpg';

const MainHeader = ({setIsMobile, isMobile}) => {
  return (
    <Header>
      <div className="logo">
        <img src={logo} alt="logo"/>
      </div>
      <div className="caption">Floor Designer</div>

      {
        isMobile && (
          <button onClick={() => setIsMobile(!isMobile)} className='toggle-menu'>
            <img src={close} alt="icon"/>
          </button>
        )
      }
    </Header>
  )
}

export default MainHeader;

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(205, 205, 205, 1);
    max-height: 100px;
    padding: 20px 10px;
    margin: 0 auto 32px;
    max-width: 1640px;

    @media (max-width: 900px) {
        padding: 32px 16px 8px;
        margin: 0 auto 16px;
    }

    .logo {
        border-radius: 16px;
        max-width: 250px;
        padding: 12px 0;
        min-width: 250px;
        font-size: 24px;
        line-height: 28px;
        font-weight: 700;
        
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        @media (max-width: 900px) {
            padding: 10.5px 0;
            font-size: 16px;
            line-height: 22px;
            min-width: 114px;
            border-radius: 8px;
            max-width: 114px;
        }
    }
    
    .caption {
        font-size: 24px;
        font-weight: 700;

        @media (max-width: 900px) {
            font-size: 18px;
        }
    }

    .toggle-menu {
        background: #F4F4F4;
        border: none;
        cursor: pointer;
        padding: 8px;
        margin-left: 35px;
        border-radius: 8px;
        display: none;

        @media (max-width: 900px) {
            display: flex;
        }

        img {
            width: 24px;
            height: 24px;
            object-fit: contain;
        }
    }
`