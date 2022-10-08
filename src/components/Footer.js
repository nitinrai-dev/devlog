import styled from "styled-components";
import { Container } from "./Styles/GlobalStyle";

const Footer = () => {
  return (
    <StyledFooter>
        <Container>
            <small>Built with <b>ReactJS</b> · <b>Dev.to API</b> · <b>OpenWeather API</b> · <b>Styled Components</b> and more!</small>
        </Container>
    </StyledFooter>
  )
}

export default Footer;

const StyledFooter = styled.footer`
    background-color: ${({ theme }) => theme.accent1};
    padding-block: 1rem;
    margin-top: 3rem;
    & small {
        display: block;
        text-align: center;
        word-spacing: 2px;
        color: ${({ theme }) => theme.text};
        & b {
          color: ${({ theme }) => theme.accent2};
        }
    }
`