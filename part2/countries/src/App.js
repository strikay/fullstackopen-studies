import { useEffect, useState } from "react"
import countryService from "./services/countryService"
import CountryList from "./components/CountryList"

const App = () => {
  const [country, setCountry] = useState('')
  const [countryList, setCountryList] = useState([])
  const [queriedCountries, setQueriedCountries] = useState([])

  const loadCountries = async () => {
    const countriesData = await countryService.getAll()
    setCountryList(countriesData);
  }
  useEffect(()=>{
      
      if(countryList.length === 0){
        loadCountries()
      }else{
        let search = `${country}`;
        let regex = new RegExp(search,"i");
        const countries = countryList.filter(c => c.name.common.search(regex) !== -1)
        setQueriedCountries(countries);
      }
  },[country, countryList])

  return(
    <div>
      <form>
        find countries <input value={country} onChange={e => setCountry(e.target.value)}/>
      </form>
      <CountryList countries={queriedCountries}/>
    </div>
  )
}

export default App