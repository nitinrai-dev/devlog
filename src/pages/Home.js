import styled from "styled-components";
import Articles from "../components/Articles";
import Layout from "../components/Layout";
import { Container } from "../components/Styles/GlobalStyle";
import ToDo from "../components/TODO Section/ToDo";
import Index from "../components/Weather Section";

const Home = () => {
  return (
    <Layout>
      <Index />
      <StyledWrapper>
        <Container>
          <Articles />
          <ToDo />
        </Container>
      </StyledWrapper>
    </Layout>
  );
};

export default Home;

const StyledWrapper = styled.section`
  padding-bottom: 2rem;
  & > div {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    grid-gap: 2rem;
    align-items: flex-start;
  }
`;
