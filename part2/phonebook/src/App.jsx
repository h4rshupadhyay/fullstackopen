import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '1234-5678',
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const handleName = (event) => {
    setNewName(event.target.value)
  }
  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const addPerson = (event) => {
    event.preventDefault();
    let newNameObj = {
      name : newName,
      number: newNumber,
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
      setPersons(persons.concat(newNameObj));
      setNewName('')
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleName}/></div>
        <div>number: <input value={newNumber} onChange={handleNumber}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((x) => <p key={x.name} >{x.name}:{x.number}</p>)}
      </ul>
    </div>
  )
}

export default App