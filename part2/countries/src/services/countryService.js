import axios from 'axios'
const countryBaseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = async () => {
    const result = await axios.get(`${countryBaseUrl}/all`)
    return result.data
}


const countryService = {
    getAll: getAll
}
export default countryService 