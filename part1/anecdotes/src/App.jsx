import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const Button = ({ handleClick, text }) => {
  return (<button onClick={handleClick}>{text}</button>)
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
  const points = new Array(anecdotes.length).fill(0)
  const [votes, setVotes] = useState(points)

  const updatePoints = () => {
    const copy = [...votes]
    copy[selected] += 1
    console.log('copy', copy)
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdots of the day</h1>

      {anecdotes[selected]}
      <br />
      has {votes[selected]} votes
      <div>
        <Button handleClick={updatePoints} text={'Vote'} />
        <Button handleClick={() => setSelected(getRandomInt(anecdotes.length))} text={'Next anecdotes'} />
      </div>

      <h1>Anecdots with the most votes</h1>
      {anecdotes[votes.indexOf(Math.max(...votes))]}
      <br />
      has {Math.max(...votes)} votes

    </div>
  )
}


export default App
