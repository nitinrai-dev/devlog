import { useState } from "react";
import { ThemeProvider } from "styled-components";
import {
  GlobalStyle,
  lightTheme,
  darkTheme,
} from "./Styles/GlobalStyle";
import Header from "./Header";

const Layout = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Header theme={theme} themeToggler={themeToggler} />
      <main>{children}</main>
    </ThemeProvider>
  );
};

export default Layout;