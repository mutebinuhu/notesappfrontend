import React, {useState} from 'react';

const Button = ({handleClick, text}) =>{
return(
    <button onClick={handleClick}>{text}</button>
)
}

const Statebyarray = () => {
const [right, setRight] = useState(0);
const [left, setLeft] = useState(0);
const [allClicks, setAllClicks] = useState([])
const [total, setTotal] = useState(0)
const handleRightClick = () =>{
    console.log("right before", right)
    const updatedVar = right + 1
   setRight(updatedVar)
   console.log("right after", right)
   setAllClicks(allClicks.concat('R'))
   setTotal(updatedVar + left)
}
const handleLeftClick = () =>{
 
    const updatedVar = left + 1
    setLeft(updatedVar)
    debugger;
    setAllClicks(allClicks.concat('L'))
   setTotal(updatedVar + left)

 }
 const Hello = (who) => () => console.log("Hello", who)

 const userData = (data) =>{
    
    const getInfo = () =>{
        console.log("user data", data)
        const {name, age} = data;
        console.log("name", name);
        console.log("age", age);

    }
    return getInfo;

 }
  
 

    return (
        <div>
            <h2>State by Array</h2>
            <h3>All clicks {allClicks.join(" ")}</h3>
            <h3>Total Clicks {total}</h3>
            <p>Right:{right}</p>
            <Button text="right" handleClick={()=>handleRightClick()} />
            <p>Left:{left}</p>
            <Button text="left" handleClick={()=>handleLeftClick()} />

          <button onClick={Hello("Matovu")}>Click me</button>
          <button onClick={Hello("Jonnah")}>Click me</button>

          <button onClick={userData({name:"Muteb", age:7})}>Click me</button>


        </div>
    );
}

export default Statebyarray;
