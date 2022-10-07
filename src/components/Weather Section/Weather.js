import { useEffect, useState } from "react";
import axios from "axios";
import { Flex } from "../Styles/Flexbox";

const Weather = ({ lat, lng, openMore }) => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`
        );
        setWeatherData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [lat, lng]);

  return (
    <>
      <Flex alignCenter>
        {weatherData.weather && (
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt=""
          />
        )}

        <div>
          <small>{weatherData.name}</small>
          <h5>
            {weatherData.main && <>{weatherData.main.temp.toFixed()}°C</>}
          </h5>
          <a
            href="https://www.weather.com/wx/today/?lat=26.73&amp;lon=80.89&amp;locale=en_IN&amp;par=google"
            target="_blank"
            rel="noopener noreferrer"
          >
            More on weather.com
          </a>
        </div>
      </Flex>

      <Flex alignCenter justifyBetween className={`moreWeather ${openMore ? 'active' : ''}`} gap="2rem">
        <h5>
          {weatherData.main && <>{weatherData.main.feels_like.toFixed()}°C <small>Feels Like</small></>}
        </h5>
        <h5>{weatherData.main && <>{weatherData.main.humidity}%</>} <small>Humidity</small></h5>
        <h5>
          {weatherData.wind && <>{weatherData.wind.speed.toFixed()}MPH <small>Wind Speed</small></>}
        </h5>
      </Flex>
    </>
  );
};

export default Weather;
