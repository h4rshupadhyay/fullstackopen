import { useState,useEffect } from 'react'
import phonebookServices from './services/phonebook'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'



const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber,setNewNumber] = useState('');
  const [searchValue,setSearchValue] = useState('');
  const [errorMessage,setErrorMessage] = useState(null);
  const [errorStyle,setErrorStyle] = useState({
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  });


  const handleName = (event) => {
    setNewName(event.target.value);
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
          setErrorMessage(`changed phone number for ${returnedObject.name} to ${returnedObject.number}`)
          setErrorStyle({...errorStyle, color:"red"});
          setTimeout(() =>{
          setErrorMessage(null);
        },5000)
        }
        )
        .catch((error) => {
          setErrorMessage(`Information of ${newName} has already been removed from server`);
          setErrorStyle({...errorStyle,color:"red"})
          setTimeout(() =>{
          setErrorMessage(null);
        },5000)
          setPersons(persons.filter((person)=> person.name != newName))
          setNewName('');
          setNewNumber('');
        })
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
        setErrorMessage(`Added ${returnedData.name}`)
        setTimeout(() =>{
          setErrorMessage(null);
        },5000)
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
      <Notification message={errorMessage} style={errorStyle}/>
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