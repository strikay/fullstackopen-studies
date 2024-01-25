import { useState } from "react"
import Country from "./Country"

const CountryList = ({countries}) => {
    let [shownCountry, setShownCountry] = useState("")

    if(!countries || countries.length === 0){
      return <div>None found</div>
    }

    if(countries.length > 10){
      return <div>Too many matches, specify another filter</div>
    }

    if(countries.length === 1){
      const country = countries[0]
      return <Country country={country}/>
    }

    const toggleShowCountry = (countryToShow) => {
      if(!shownCountry || shownCountry !== countryToShow){
        setShownCountry(countryToShow)
      }else{
        setShownCountry("")
      }
    }

    return (
      <div>
          {countries.map((country) => {
            const countryName = country.name.common
            return (
              <div key={countryName}>
                {countryName} {" "}
                <button onClick={() => toggleShowCountry(countryName)}>show</button>
                {shownCountry === countryName && <Country country={country}/> }
              </div>)
            })
          }    
      </div>

    )
  }

  export default CountryList