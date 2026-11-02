const Country = ({countryName,dataSet}) => {
    const dataSetForCountry = dataSet.find((x) => x.name.common == countryName)
    console.log("inside country: ",dataSetForCountry)
    console.log()
    return <div>
        <h1>{countryName}</h1>
        <p>Capital {dataSetForCountry.capital}</p>
        <p>Area {dataSetForCountry.area}</p>
        <h2>Languages</h2>
        <ul>
        {Object.entries(dataSetForCountry.languages).map(([key,value]) => <li key={key}>{value}</li>)}
        </ul>
        <img src={dataSetForCountry.flags.png} />
    </div>
}

export default Country