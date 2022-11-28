import {useEffect, useState} from "react";
import axios from "axios";

const Country = ({details}) => {
  const capital = details.capital[0];

  return <div>
    <h2>{details.name.common}</h2>
    <p> Capital: {capital}</p>
    <p> Area: {details.area}</p>

    <h3>Languages</h3>
    <ul>
      {Object.values(details.languages).map(language => <li key={language}>{language}</li>)}
    </ul>

    <img src={details.flags.png} alt="Flag of the country" height='50px'/>

    <h3>Weather in {capital} </h3>
    <Weather lat={details.capitalInfo.latlng[0]} lon={details.capitalInfo.latlng[1]}/>
  </div>;
};

const Weather = ({lat, lon}) => {
  const [show, setShow] = useState(false);
  const [temp, setTemp] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [iconCode, setIconCode] = useState(null);

  useEffect(() => {
    let apiKey = process.env.REACT_APP_API_KEY

    axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {params: {lat: lat, lon: lon, units: 'metric', appid: apiKey}}
    ).then(response => {
      setTemp(response.data.main.temp);
      setWindSpeed(response.data.wind.speed);
      setIconCode(response.data.weather[0].icon);
      setShow(true);
    }).catch(error => console.log(error));

  }, [])

  return show && <div>
    <p>Temperature: {temp} C°</p>
    <p>Wind speed: {windSpeed} m/s</p>
    <img src={`http://openweathermap.org/img/wn/${iconCode}.png`} alt='weather icon'/>
  </div>;
}

export default Country;
