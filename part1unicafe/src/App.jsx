import { useState } from 'react'

const Button = ({onClick, text}) => {
  return(
  <button onClick={onClick}>
    {text}
  </button>
  )
  
}

const StatisticLine = ({text, stat, percent=""}) => {
  return(
    <tr>
      <td>
        {text}
      </td> 
      <td>
        {stat} {percent}
      </td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good == 0 && neutral == 0 && bad == 0) {
    return (
      <p>
        No Feedback Given
      </p> 
    )
  }
  console.log("Feedback was given")
  const all = good + bad + neutral
  return(
    <table>
    <StatisticLine text="good" stat={good}/>
    <StatisticLine text="neutral" stat={neutral}/>
    <StatisticLine text="bad" stat={bad}/>
    <StatisticLine text="all" stat={all}/>
    <StatisticLine text="average" stat={(good-bad)/all}/>
    <StatisticLine text="positive" stat={((good)/all)*100} percent='%'/>
    </table>

  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const onGood = () => {
    console.log("incrementing good ", good)
    setGood(good+1)
    setAll(all+1)
  }

  const onNeutral = () => {
    console.log("incrementing neutral ", neutral)
    setNeutral(neutral+1)
    setAll(all+1)
  }

  const onBad = () => {
    console.log("incrementing bad ", bad)
    setBad(bad+1)
    setAll(all+1)
  }

  return (
    <>
      <h1>
        give feedback
      </h1>
      <Button onClick={onGood} text = "good"/>
      <Button onClick={onNeutral} text = "neutral"/>
      <Button onClick={onBad} text = "bad"/>
      <h1>
        statistics
      </h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App