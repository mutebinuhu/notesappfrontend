import React,{useState} from 'react';
import countries from '../services/countries';
import Loader from './Loader';
import axios from 'axios';
const {getSingleCountry} = countries

const Button = ({clickHandler}) =>{
    return(
        <button onClick={clickHandler}>show</button>
    )
}

const Countrydetails = ({details}) =>{
   

    if(!details){
        return null
    }
    console.log("single cr details", details)
    const languages = {...details[0].languages}
    const {png, alt} = details[0].flags
return(
    <div>
            <h2>{details[0].name.common}</h2>
                <p>Capital: {details[0].capital[0]}</p>
                <p>area:{details[0].area} </p>
                <h3>languages</h3>
                {Object.values(languages).map(lang=><li>{lang}</li>)}
                <h3>Flag:</h3>
                <img src={png} alt={alt}/>



            </div>
)
}
const Countries = ({countries}) => {
    const [searchedCountry, setSearchedCountry] = useState('');
    const [countryResult, setCountryResult] = useState([]);
    const [loading, setLoading] = useState(false)
    const [singleCountryDetails, setSingleCountryDetails] = useState(null)
    const handleSubmit = (e) =>{
        e.preventDefault()
        //const resp = countries[0].name.common
      

    }
    const list = []
    const handleSearch = (e) =>{
        setSearchedCountry(e.target.value)
        const searchedCountryToArray = searchedCountry.toUpperCase()
        //console.log("serached country", searchedCountryToArray)
     
      countries.map(country=>{
        
            if(country.name.common.toUpperCase().indexOf(searchedCountryToArray) > -1)
            {
                list.push(country)
                setCountryResult(list)
            }
          
           return list
        })
        console.log("results",countryResult )
     
    }
    const CountryResults = ({countryResult}) =>{
            
    if(countryResult.length > 10){
        return(
            <p>Too many matches, specify another filter</p>
        )

    }else if (countryResult.length  == 1) {
        const languages = {...countryResult[0].languages}
        const {png, alt} = countryResult[0].flags
        
        const capitalWeather = async () =>{
            //const details = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${countryResult[0].capitalInfo.latlng[0]}&lon=${countryResult[0].capitalInfo.latlng[1]}&appid=68f08912115e7b9b78c4bf5a24542e33`)
            const details = await axios.get("https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=68f08912115e7b9b78c4bf5a24542e33")
            console.log("weather res", details)
        }
        capitalWeather()
        return(
            <div>
                <h2>{countryResult[0].name.common}</h2>
                <p>Capital: {countryResult[0].capital[0]}</p>
                <p>area:{countryResult[0].area} </p>
                <h3>languages</h3>
                {Object.values(languages).map(lang=><li>{lang}</li>)}
                <h3>Flag:</h3>
                <img src={png} alt={alt}/>

            </div>
        )

    }else{
        const singleCountryDetails = async (country) =>{
            setLoading(true)
            const details = await getSingleCountry(country)
            console.log("searched single country", details)
            setSingleCountryDetails(details)
            setLoading(false)
            }
        return(
            <ul>
            {countryResult  && countryResult.map((item, key)=>{
                return(
                    <li key={key}> countryName: {item.name.common} <Button clickHandler={()=>singleCountryDetails(item.name.common)}/></li>
                )
            })}
        </ul>
           )
    }
      
        
    }
   // {countryResult.length > 10 ? "Too many matches, specify another filter" :

    return (
        <div>
            <h2>Country List</h2>
            <h3>Find country:</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" value={searchedCountry} onChange={handleSearch} />
                <button type="submit">Search</button>
            </form>
            <h3>Results:</h3>
                <CountryResults countryResult={countryResult}/>
                <h3>Country details</h3>
                {loading && <Loader/>}
                <Countrydetails details={singleCountryDetails}/>
            
            <p></p>
        </div>
    );
}

export default Countries;
