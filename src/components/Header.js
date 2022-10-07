import styled from "styled-components";
import { Flex } from "./Styles/Flexbox";
import { Container } from "./Styles/GlobalStyle";

const Header = ({ theme, themeToggler }) => {
  return (
    <StyledHeader>
      <Container>
        <Flex alignCenter spaceBetween>
          <h2>DEVLOG</h2>
          <button onClick={themeToggler} title='Change theme'>
            {theme === "light" ? <p>Dark</p> : <p>Light</p>}
          </button>
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
`;
