import { useState } from 'react'

const Button = ({onClick,text}) =>{
    console.log(onClick);
    return <button onClick={onClick}>{text}</button>
}

const Statistics = ({good,neutral,bad}) => {
  return (
    <>
    <h1>Statistics</h1>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    <p>all {good+neutral+bad}</p>
    <p>average {(good*1 + neutral*0 + bad*-1)/(good+neutral+bad)}</p>
    <p>positive {good/(good+neutral+bad)} %</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const props = {good,neutral,bad}
  const handleClick = (setX,X) =>  () => setX(X+1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleClick(setGood,good)} text="good" />
      <Button onClick={handleClick(setNeutral,neutral)} text="neutral" />
      <Button onClick={handleClick(setBad,bad)} text = "bad" />
      <Statistics {...{good,neutral,bad}} />
    </div>
  )
}

export default App