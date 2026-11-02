import Country from "./Country";

const Body = ({searchQuery,dataSet}) => {
    if(dataSet.length > 0){
    const nameOfCountries = dataSet.map(x => x.name.common);
    const d = nameOfCountries.filter(x => x.toLowerCase().includes(searchQuery.toLowerCase()));
    console.log(d)
    if(d.length > 10) return <p>Too many matches, specify another filter</p>
    else if(d.length > 1) return d.map((x) => <li id={x}>{x}</li>)
    else {
        return <Country countryName = {d} dataSet={dataSet}/>
    };
    }
    return null;
}
export default Body