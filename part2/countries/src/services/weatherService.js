import axios from 'axios'
const weatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const api_key = process.env.REACT_APP_API_KEY

const getCountryWeather = async (country) => {
    const result = await axios.get(`${weatherBaseUrl}?q=${country}&APPID=${api_key}`)
    console.log(result)
    return result.data
}

const weatherService = {
    getCountryWeather: getCountryWeather
}

export default weatherService

