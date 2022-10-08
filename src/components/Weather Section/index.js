import { useState } from "react";
import { BiCurrentLocation,BiChevronLeft } from "react-icons/bi";
import styled from "styled-components";
import { Flex } from "../Styles/Flexbox";
import { Container } from "../Styles/GlobalStyle";
import Weather from "./Weather";

const Index = () => {
  const [lat, setLat] = useState("28.6139");
  const [lng, setLng] = useState("77.2090");
  const [status, setStatus] = useState(null);
  const [openMore, setOpenMore] = useState(false);

  const handleOpen = () => {
    setOpenMore(!openMore);
  }

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus(null);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Error");
        }
      );
    }
  };

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
    <StyledIndex>
      <Container>
        <Flex alignCenter spaceBetween>
          <div>
            <h3>Your briefing</h3>
            <p>{date}</p>
          </div>

          <StyledWeather>

            <button onClick={getLocation} title='From your device'><BiCurrentLocation /></button>
            {status && <p>{status}</p>}
            <Weather lat={lat} lng={lng} openMore={openMore} />
            <button className={`openDrawer ${openMore ? 'active' : ''}`} onClick={handleOpen}><BiChevronLeft /></button>

          </StyledWeather>
        </Flex>
      </Container>
    </StyledIndex>
  );
};

export default Index;

const StyledIndex = styled.section`
  padding-block: 1.5rem;
  & > div > div {
    overflow: hidden;
    border-radius: 8px;
  }
`;

const StyledWeather = styled.div`
  position: relative;
  z-index: 1;
  & > button {
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    display: grid;
    place-items: center;
    opacity: 0.5;
    color: ${({ theme }) => theme.text};
    &:hover {
      opacity: 1;
    }
  }
  & > div > div > div {
    background: ${({ theme }) => theme.light};
    padding: 0.5rem 2rem 0.5rem 1.5rem;
    border-radius: 8px;
    & img {
      width: 80px;
      height: auto;
    }
    & small {
      display: block;
      font-weight: 300;
    }
    & a {
      color: ${({ theme }) => theme.accent3};
      font-weight: 400;
      letter-spacing: 0;
    }
  }
  & .moreWeather {
    position: absolute;
    inset: 0;
    z-index: -1;
    width: max-content;
    padding: 1rem 1.5rem;
    transition: transform 0.3s ease-in-out;
    &.active {
      transform: translateX(calc(-100% + 16px));
    }
  }
  & .openDrawer {
    right: unset;
    left: 0;
    top: calc(50% - 20px);
    width: 36px;
    height: 40px;
    & svg {
      width: 24px;
      height: 24px;
      transition: 0.3s ease-in-out;
      color: ${({ theme }) => theme.text};
    }
    &.active svg {
      transform: scale(-1);
    }
  }
  & .mobMain {
    display: none;
    @media (max-width: 768px) {
      display: flex;
      align-items: center;
      padding: 0 1rem;
      border-radius: 8px;
      background: ${({ theme }) => theme.light};
      cursor: pointer;
      & img {
        width: 60px;
      }
      & + div, + div + .openDrawer {
        display: none;
      }
      & + div.active {
        display: grid;
        place-items: center;
        position: fixed;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 99;
        background: rgba(0,0,0,0.3);
        & > span {
          position: absolute;
          inset: 0;
          z-index: 1;
          cursor: pointer;
        }
        & > div {
          position: relative;
          z-index: 2;
          background-color: ${({ theme }) => theme.light};
          border-radius: 8px;
          overflow: hidden;
          & .moreWeather {
            position: static;
            border-radius: 0;
            background: ${({ theme }) => theme.background};
          }
        }
      }
    }
  }
`