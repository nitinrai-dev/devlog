import styled, { createGlobalStyle, css } from "styled-components";

export const lightTheme = {
  accent1: '#22331d',
  accent2: '#dded5f',
  accent3: '#8b561f',
  background: '#f1ede7',
  text: '#1f2c1b',
  textLight: '#2b3f27',
  light: '#fff',
  border: '#f1ede7',
  boxShadow: '0 10px 2rem 0 rgba(74,64,250,.04)',
  transition: 'all .5s cubic-bezier(.7, 0, .3, 1)',
}

export const darkTheme = {
  accent1: '#18191b',
  accent2: '#dded5f',
  accent3: '#a76825',
  background: "#121316",
  text: '#E1D8CC',
  textLight: '#D2C4B1',
  light: '#18191b',
  border: '#25262b',
  boxShadow: '0 10px 2rem 0 rgba(74,64,250,.04)',
  transition: 'all .5s cubic-bezier(.7, 0, .3, 1)',
}

export const GlobalStyle = createGlobalStyle`

*, ::before, ::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
:focus-visible {
    outline-offset: 2px;
    outline: 1px solid ${({ theme }) => theme.accent2} !important;
}
html {
    scroll-behavior: smooth;
    font-size: 100%; /* 16px */
}
body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textLight};
    font-family: 'Oswald', sans-serif;
    font-weight: 300;
    letter-spacing: 0.03em;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
}
a {
    color: ${({ theme }) => theme.text};
    text-decoration: none;
    cursor: pointer;
}
button {
  background: transparent;
  border: 0;
  cursor: pointer;
}
h1 {font-size: 3.052rem;}

h2 {font-size: 2.074rem;}

h3 {font-size: 1.728rem;}

h4 {font-size: 1.44rem;}

h5 {font-size: 1.2rem;}

small {font-size: 0.9rem;}

h1, h2, h3, h4, h5 {
    line-height: 1.3;
    font-weight: 400;
    color: ${({ theme }) => theme.text};
}

@media (max-width: 600px) {
h1 {font-size: 2.2rem}
h2 {font-size: 1.8rem}
h3 {font-size: 1.5rem}
h4 {font-size: 1.3rem}
}
`;

export const Container = styled.div`
  margin-inline: auto;
  width: calc(100vw - 6rem);
  height: 100%;

  ${(props) =>
    props.fluid &&
    css`
      width: 100vw;
    `}
  @media (max-width: 540px) {
    ${(props) =>
      props.mobFluid &&
      css`
        padding-inline: 0;
      `}
  }

  @media (max-width: 540px) {
    width: calc(100vw - 3rem);
  }
`;
