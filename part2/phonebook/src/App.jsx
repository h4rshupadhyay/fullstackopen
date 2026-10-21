import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleInput = (event) => {
    setNewName(event.target.value)
  }
  const addPerson = (event) => {
    event.preventDefault();
    let newNameObj = {name : newName};
    let isDuplicate = persons.some(person => person.name === newName);

    if(!isDuplicate){
      setPersons(persons.concat(newNameObj));
      setNewName('')
    }
    else{
      alert(`${newName} is already added to phonebook`)
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleInput}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((x) => <p key={x.name} >{x.name}</p>)}
      </ul>
    </div>
  )
}

export default App