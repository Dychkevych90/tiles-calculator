import styled from "styled-components";
import {backgroundColor} from "../styles/constants.js";

const MainHeader = () => {
  return (
    <Header>
      <div className="logo">LOGO</div>
      <div className="caption">Tile Calculator</div>
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

    .logo {
        border-radius: 16px;
        background-color: ${backgroundColor};
        padding: 12px 0;
        min-width: 250px;
        font-size: 24px;
        font-weight: 700;
    }
    
    .caption {
        font-size: 24px;
        font-weight: 700;
    }
`