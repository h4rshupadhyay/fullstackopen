import Country from "./Country";

const Body = ({setSearchQuery,searchQuery,dataSet}) => {
    const handleClick =(event) => {
        setSearchQuery(event.target.value);
    }

    if(dataSet.length > 0){
    const nameOfCountries = dataSet.map(x => x.name.common);
    const d = nameOfCountries.filter(x => x.toLowerCase().includes(searchQuery.toLowerCase()));
    console.log(d)
    if(d.length > 10) return <p>Too many matches, specify another filter</p>
    else if(d.length > 1) return d.map((x) => <p id={x}>{x} <button value={x} onClick={handleClick}>Show</button> </p>) 
    else if(d.length == 1 || toggle){
        return <Country countryName = {d} dataSet={dataSet}/>
    }
    }
    else {
        return <p>No matching country</p>
    }
    return null;
}
export default Body