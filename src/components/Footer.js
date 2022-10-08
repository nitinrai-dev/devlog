import styled from "styled-components";
import { Container } from "./Styles/GlobalStyle";

const Footer = () => {
  return (
    <StyledFooter>
        <Container>
            <small>Built with ReactJS · Dev.to API · OpenWeather API · Styled Components and more!</small>
        </Container>
    </StyledFooter>
  )
}

export default Footer;

const StyledFooter = styled.footer`
    background-color: ${({ theme }) => theme.light};
    padding-block: 1rem;
    & small {
        display: block;
        text-align: center;
        word-spacing: 2px;
        color: ${({ theme }) => theme.text};
    }
`