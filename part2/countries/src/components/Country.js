import { useEffect, useState } from "react"
import weatherService from "../services/weatherService"

const Country = ({country}) => {
    const [temperature, setTemperature] = useState('')
    const [windSpeed, setWindSpeed] = useState('')
    const [weatherIcon, setWeatherIcon] = useState('')
    
    useEffect(()=>{
      const loadWeather = async () => {
        const weatherData = await weatherService.getCountryWeather(country.name.common)
        const currentTemperature = Number(weatherData.main.temp - 273).toFixed(1)
        const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
        setWeatherIcon(weatherIconUrl)
        setTemperature(currentTemperature)
        setWindSpeed(weatherData.wind.speed)
      }
      loadWeather();
    },[country]) 

    return(
      <div>
        <h2>{country.name.common}</h2>
        <div>capital {country.capital[0]}</div>
        <div>area {country.area}</div>
        <br></br>
        <h4>languages</h4>
        <ul>
          {
            Object.values(country.languages).map((language) => {
              return <li key={language}>{language}</li>
            })
          }
        </ul>
        <img src={country.flags.svg} alt={country.flags.alt} style={{width:"150px"}}/>
        <h3>Weather in {country.name.common}</h3>
        <div>temperature {temperature} Celcius</div>
        <img src={weatherIcon} style={{width:70}} alt="weather icon"></img>
        <div>wind {windSpeed} m/s</div>
      </div>
    )
  }

  export default Country