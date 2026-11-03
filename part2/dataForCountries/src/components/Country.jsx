import {useState, useEffect} from 'react' 
import axios from 'axios'
const API_KEY = import.meta.env.VITE_API_KEY
const Country = ({countryName,dataSet}) => {
    console.log("KEY",API_KEY)
    const dataSetForCountry = dataSet.find((x) => x.name.common == countryName)
    const [weather,setWeather] = useState([])
    
    console.log("inside country: ",dataSetForCountry)
    console.log(`${dataSetForCountry.latlng[0]}&lon=${dataSetForCountry.latlng[1]}`)
    

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${dataSetForCountry.latlng[0]}&lon=${dataSetForCountry.latlng[1]}&appid=${API_KEY}&units=metric`)
        .then(response => {
            console.log(response.data);
            setWeather(response.data);
            return response.data;
        })
    },[]);

    if(weather.length === 0) return null;

    return <div>
        <h1>{countryName}</h1>
        <p>Capital {dataSetForCountry.capital}</p>
        <p>Area {dataSetForCountry.area}</p>
        <h2>Languages</h2>
        <ul>
        {Object.entries(dataSetForCountry.languages).map(([key,value]) => <li key={key}>{value}</li>)}
        </ul>
        <img src={dataSetForCountry.flags.png} />
        <h2>Weather in {countryName}</h2>
        <p>Temperature {weather.main.temp} Celsius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="cloud image" />
        <p>Wind {weather.wind.speed} m/s</p>
    </div>
}

export default Country