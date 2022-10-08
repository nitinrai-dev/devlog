import styled from "styled-components";
import { BiMoon, BiSun } from "react-icons/bi";
import { Container } from "../Styles/GlobalStyle";
import { Flex } from "../Styles/Flexbox";

const Header = ({ theme, themeToggler }) => {
  return (
    <StyledHeader>
      <Container>
        <Flex alignCenter spaceBetween>
          <h2><a href="/">DEVLOG</a></h2>
          <div className="header-nav">
          <button onClick={themeToggler} title='Change theme'>
            {theme === "light" ? <BiMoon/> : <BiSun/>}
          </button>
          <a href="//www.nitinrai.dev/" target="_blank" rel="noreferrer">Code by <b>Nitin Rai</b></a>
          </div>
        </Flex>
      </Container>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  position: relative;
  width: 100%;
  padding-block: 1.5rem;
  background-color: ${({ theme }) => theme.accent1};
  color: ${({ theme }) => theme.accent2};
  & a {
    color: ${({ theme }) => theme.accent2};
  }
  & .header-nav {
    display: inline-flex;
    align-items: center;
    & a {
      color: ${({ theme }) => theme.white};
    }
    & button {
      width: 24px;
      height: 30px;
      display: flex;
      align-items: center;
      margin-right: 20px;
      & svg {
        width: 24px;
        height: 24px;
        color: ${({ theme }) => theme.white};
      }
    }
  }
  @media (max-width: 540px) {
    padding-block: 1rem;
    & .header-nav {
      & button {
        margin-right: 10px;
      }
    }
  }
`;
