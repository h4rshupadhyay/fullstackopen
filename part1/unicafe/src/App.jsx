import { useState } from 'react'

const Button = ({onClick,text}) =>{
    console.log(onClick);
    return <button onClick={onClick}>{text}</button>
}

const StatisticLine = ({statistic,text}) => {
  if(text==="positive") return (
   <tr>
    <td>{text}</td>
    <td>{statistic} %</td>
  </tr>)
  return (
  <tr>
    <td>{text}</td>
    <td>{statistic}</td>
  </tr>)
}

const Statistics = ({good,neutral,bad}) => {
  const total = good+neutral+bad;
  const average = (good - bad)/total;
  const positive = good/total;
  if(good === 0 && neutral === 0 && bad === 0){
    return (
    <>
    <h1>Statistics</h1>
    <p>No feedback given</p>
    </>
    )
  }
  return (
    <table>
    <caption>Statistics</caption>
    <tbody>
    <StatisticLine text="good" statistic={good}/>
    <StatisticLine text="neutral" statistic={neutral} />
    <StatisticLine text="bad" statistic={bad} />
    <StatisticLine text="all" statistic={good+neutral+bad} />
    <StatisticLine text="average" statistic={average} />
    <StatisticLine text="positive" statistic={positive} />
    </tbody>
    </table>
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