import { useState,useEffect } from 'react'
import axios from 'axios'
import Body from './components/Body';

const App = () => {
  const [searchQuery,setSearchQuery] = useState("");
  const [dataSet,setDataSet] = useState([]);

  const onChange = (event) => {
    setSearchQuery(event.target.value);
  }

  useEffect(()=>{
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then( response => setDataSet(response.data));
  },[]);
  return (
    <div>
      <div>
        <p>find countries <input value={searchQuery} onChange={onChange}></input></p>
        <Body searchQuery={searchQuery} dataSet={dataSet}/>

      </div>
    </div>
  )
}

export default App
