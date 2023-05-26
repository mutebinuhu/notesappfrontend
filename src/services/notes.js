import axios from "axios";

const baseUrl = 'https://mynotesapi.fly.dev/api/notes'

const getAll = () =>{
    const response = axios.get(baseUrl)
    console.log("response", response)
    return response.then(response=>response.data)
}
const create = (data) =>{
    return axios.post(baseUrl, data)
}

export default{
    getAll:getAll,
    create:create
}