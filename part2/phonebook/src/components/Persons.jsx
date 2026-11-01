const Persons = ({persons,searchValue,onclick}) => {
  console.log("inside Persons",searchValue)
  return (
    <div>
      {persons.filter((x) => x.name.toLowerCase().includes(searchValue.toLowerCase())).map((x) => 
        <p key={x.id}>{x.name}:{x.number} <button onClick={() => onclick(x.id)}>delete</button></p>)}
    </div>
  )
}

export default Persons;