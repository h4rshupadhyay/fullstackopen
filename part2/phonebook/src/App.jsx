import { useState,useEffect } from 'react'
import phonebookServices from './services/phonebook'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'


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
    };
    let isDuplicateName = persons.some(person => person.name === newName);
    let isDuplicateNumber = persons.some(person => person.number === newNumber);
    
    if(isDuplicateName){
      let confirmation = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if(confirmation){
        phonebookServices
        .update(persons.find((person) => person.name == newName).id,newNameObj)
        .then((returnedObject) => {
          setPersons(persons.filter((person)=> person.name != newName).concat(returnedObject));
        }
        )
      }
    }
    else if(isDuplicateNumber){
      alert(`${newNumber} is already added to phonebook`)
    }
    else{
      phonebookServices
      .create(newNameObj)
      .then((returnedData) =>  {
        console.log("Object added to server");
        console.log(returnedData);
        setPersons(persons.concat(returnedData));
        setNewName('');
        setNewNumber('');
      })
    }
  };

  const deletePerson = (id) => {
    let confirmation = window.confirm(`Delete ${persons.find(person => person.id == id).name}?`);
    if(confirmation){
      phonebookServices
      .deletePerson(id)
      .then(() => {
        console.log("succesful deletion");
        setPersons(persons.filter((person) => person.id != id))
      })
    }
  }

  useEffect(()=>{
    console.log("effect");
    phonebookServices.
    getAll()
    .then((initialData) => {
      console.log("Initial data fetched from the server");
      console.log(initialData);
      setPersons(initialData);
    });
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
      <Persons persons={persons} searchValue={searchValue} onclick={deletePerson}/>
    </div>
  )
}

export default App