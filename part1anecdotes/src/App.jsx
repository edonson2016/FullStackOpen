import { useState } from 'react'

const Button = ({selected, onClick, text}) => {
  return(
    <button >
      {text}
    </button>

  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0, 0])
  const [maxSelected, setMaxSelected] = useState(0)

  const onClick = () => {
    console.log("Button Click")
    const randInd = Math.floor(Math.random() * anecdotes.length)
    console.log(randInd)
    setSelected(randInd)
  }

  const onVote = () => {
    const copyArr = [...points]
    copyArr[selected] += 1
    if (copyArr[selected]>copyArr[maxSelected]) {
      setMaxSelected(selected)
    }
    setPoints(copyArr)
  }

  return (
    <>
     <div>
      <h1>
        Anecdote of the day
      </h1>
      {anecdotes[selected]}
      <p>
        has {points[selected]} votes
      </p>
    </div>
    <div>
      <button onClick={onVote}>
        vote
      </button>
      <button onClick={onClick}>
        next anecdote
      </button>
    </div>
    <div>
      <h1>
        Anecdote of the day
      </h1>
      <p>
        {anecdotes[maxSelected]}
      </p>
      <p>
        has {points[maxSelected]} votes
      </p>
    </div>
    </>
  )
}

export default App