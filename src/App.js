import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Note from "./components/Note";
import notesService from "./services/notes"
import countriesService from './services/countries';
import Notes from './components/Notes';

import Countries from './components/Countries';

const Hello = (props) =>{
  const bornYear = () => new Date().getFullYear() - props.age
  return(
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
      <p>So you were probably born {bornYear()}</p>
    </div>
  )
}
const App = () =>{
let [counter, setCounter] = useState(0)
let [clicks, setClicks] = useState({
  left:0,
  right:0
})
const [notes, setNotes] = useState(null)
const [left, setLeft] = useState(0)
const [right, setRight] = useState(0)
const [allClicks, setAllClicks] = useState([])
const [total, setTotal] = useState(0)
const [countriesList, setCountryList] = useState([])

const AllCountriesList = async () =>{
  const list = await countriesService.getCountries()
  setCountryList(list)
} 
const singleCountry = async () =>{
  const country = await countriesService.getSingleCountry("Uganda")
  console.log("country", country)
}
const leftClick = ()=>{
  setAllClicks( allClicks.concat("L"))
  const updatedLeft = left + 1
  setLeft(updatedLeft)
  setTotal(updatedLeft + right)
}
const rightClick = () =>{
 setAllClicks(allClicks.concat("R"))
 const updatedRight = right + 1
 setRight(updatedRight)
 setTotal(updatedRight + left)

}

const increaseByOne = () =>{
  setCounter(counter + 1)
}
const decreaseByOne = () => { 
  setCounter(counter - 1)
}
const reset = () => setCounter(0)
const Button = ({text, handleClick}) =>{
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const History = (props) =>{
  if(props.allClicks.length === 0){
    return(
      <div>
        <p>Press button to see Clicks</p>
      </div>
    )
    }else{
      return(
        <div>
          <p>Total Counts: {props.allClicks.length}</p>
        </div>
      )
    }
  }
const hello = () => {
  const handler = () => console.log("hello")
  return handler;
}
 

 useEffect(() => {
 notesService.getAll()
  .then(response=>{
    setNotes(response)
  })
  AllCountriesList()
 }, []);

const [newNote, setNewNote] = useState("")
const addNote = (e) =>{
  e.preventDefault()
  notesService.create({
    "content": "HTML is no easy",
    "important":false

  }).then(response=>{
    console.log("response", response)
    setNotes([notes,...response.data])
  })

}
const [rates, setRates] = useState({})
const [currency, setCurrency] = useState(null)
const [value, setValue] = useState("")
//countries

const handleChange = (event) =>{
  setValue(event.target.value)
}
useEffect(() => {
  console.log('effect run, currency is now', currency)
  if(currency){
    axios.get(`https://open.er-api.com/v6/latest/${currency}`)
    .then(response=>{
      console.log("response", response.data.rates)
      setRates(response.data.rates)
    })
  }

}, [currency]);
const handleSearch = (event) =>{
event.preventDefault()
setCurrency(value)
//setValue("")
}
return(
  <div>
    <Countries countries={countriesList}/>
    {counter}

    <p>Left:{left}</p>
    <Button text="left click" handleClick={leftClick}/>
    <Button text="right click" handleClick={rightClick}/>
    <p>Right:{right}</p>
    <p>All clicks : {allClicks}</p>
    <History allClicks={allClicks}/>
    <button onClick={hello()}>button</button>
    <div>
      <h1>Notes</h1>
      <Notes notes={notes}/>
      <form onSubmit={addNote}>
        <input type="text" name="" value={newNote} id="" onChange={(e)=>setNewNote(e.target.value)} />
        <button>Add Note</button>
      </form>
      <pre>
      {JSON.stringify(rates, null, 2)}
      </pre>
    </div>
    <h2>Currencey Converter</h2>
    <form onSubmit={handleSearch}>
      Currencey: <input type="text" value={value} onChange={handleChange} />
      <button name='submit'>Submit</button>
    </form>

  </div>
)
  
}

export default App;
