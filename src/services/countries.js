import axios from "axios";
const baseUrl = `https://restcountries.com/v3.1/all`;
//const searchByCountry = `https://restcountries.com/v3.1/all/name=${name}`

const getCountries = async () => {
    const response = await axios.get(baseUrl);
    console.log("res", response.data)
   return response.data

}
const getSingleCountry = async (country) =>{
    const response = await axios.get(`https://restcountries.com/v3.1/name/${country}?fullText=true`);
 
    console.log("res", response.data)
   return response.data
}

export default{
    getCountries,
    getSingleCountry
}