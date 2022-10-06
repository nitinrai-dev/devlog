import styled from "styled-components";
import { Flex } from "./Styles/Flexbox";
import { Container } from "./Styles/GlobalStyle";

const Weather = () => {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();
  const date = `${currentDate.getDate()} ${
    month[currentDate.getMonth()]
  }, ${currentDate.getFullYear()}`;

  return (
    <StyledWeather>
      <Container>
        <Flex alignCenter spaceBetween>
          <div>
            <h3>Your briefing</h3>
            <p>{date}</p>
          </div>

          <div>Weather Stats</div>
        </Flex>
      </Container>
    </StyledWeather>
  );
};

export default Weather;

const StyledWeather = styled.section`
  padding-block: 1.5rem;
`;