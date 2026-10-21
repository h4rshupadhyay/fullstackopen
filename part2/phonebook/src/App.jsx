import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

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
      setPersons(persons.concat(newNameObj));
      setNewName('')
      setNewNumber('')
    }
  };


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter shown with: <input value={searchValue} onChange={handleSearch}/>
      </div>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleName}/></div>
        <div>number: <input value={newNumber} onChange={handleNumber}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.filter((x) => {
          if(searchValue === '') return true
          else {
            return x.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
          }
        }).map((x) => <p key={x.name} >{x.name}:{x.number}</p>)}
      </ul>
    </div>
  )
}

export default App