import { ThemeProvider } from "styled-components";
import { useDarkMode } from "./useDarkMode";
import {
  GlobalStyle,
  lightTheme,
  darkTheme,
} from "../Styles/GlobalStyle";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  if(!mountedComponent) return <div/>

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      <Header theme={theme} themeToggler={themeToggler} />
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;