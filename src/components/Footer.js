import styled from "styled-components";
import { Container } from "./Styles/GlobalStyle";

const Footer = () => {
  return (
    <StyledFooter>
        <Container>
            <a href="//www.nitinrai.dev">Designed & Built by <b>Nitin Rai</b></a>
        </Container>
    </StyledFooter>
  )
}

export default Footer;

const StyledFooter = styled.footer`
    background-color: ${({ theme }) => theme.accent1};
    padding-block: 1rem;
    margin-top: 3rem;
    & a {
        display: block;
        text-align: center;
        color: ${({ theme }) => theme.accent2};
    }
`