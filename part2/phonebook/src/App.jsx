import { useState,useEffect } from 'react'
import axios from 'axios'

const Filter = ({value,onChange}) =>{
  return (
    <div>
      filter shown with: <input value={value} onChange={onChange} />
    </div>
  )
}  

const PersonForm = ({addPerson,newName,handleName,handleNumber,newNumber}) => {
  return (
    <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleName}/></div>
        <div>number: <input value={newNumber} onChange={handleNumber}/></div>
        <div><button type="submit">add</button></div>
    </form>
  )
}

const Persons = ({persons,searchValue}) => {
  return (
    <div>
      {persons.filter((x) => x.name.toLowerCase().includes(searchValue.toLowerCase())).map((x) => <p key={x.id}>{x.name}:{x.number}</p>)}
    </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [searchValue,setSearchValue] = useState('')

  const handleName = (event) => {
    setNewName(event.target.value)
  }
  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearch = (event) => {
    setSearchValue(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault();
    let newNameObj = {
      name : newName,
      number: newNumber,
      id: persons.length+1
    };
    let isDuplicateName = persons.some(person => person.name === newName);
    let isDuplicateNumber = persons.some(person => person.number === newNumber);
    
    if(isDuplicateName){
      alert(`${newName} is already added to phonebook`)
    }
    else if(isDuplicateNumber){
      alert(`${newNumber} is already added to phonebook`)
    }
    else{
      axios
      .post("http://localhost:3001/persons",newNameObj)
      .then(response => {
      console.log('Object added to server');
      setPersons(persons.concat(newNameObj));
      setNewName('')
      setNewNumber('')
      })

    }
  };

  useEffect(()=>{
    console.log("effect");
    axios
    .get("http://localhost:3001/persons")
    .then(response => {
      console.log('promise fulfilled');
      setPersons(response.data);
    })
  },[])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchValue} onChange={handleSearch}/> 
      <h3>Add a new</h3>
      <PersonForm 
        addPerson={addPerson}
        newName = {newName} handleName={handleName}
        newNumber = {newNumber} handleNumber={handleNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} searchValue={searchValue}/>
    </div>
  )
}

export default App