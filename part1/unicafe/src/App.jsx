import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

const Button = ({ btnName, handleClick }) => {
  return (
    <button onClick={handleClick} >{btnName}</button>
  )

}

const Display = ({ tag, value }) => {
  return (

    <tr>
      <td>{tag}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + bad + neutral

  if (total > 0) {
    const postive = ((good / total) * 100) + ' %'
    const average = (good - bad) / total
    console.log(average)
    return (
      <div>
        <table>
          <tbody>
            <Display tag={"Good"} value={good} />
            <Display tag={"Neutral"} value={neutral} />
            <Display tag={"Bad"} value={bad} />
            <Display tag={'all'} value={total} />
            <Display tag={'average'} value={average} />
            <Display tag={'postive'} value={postive} />
          </tbody>
        </table>
      </div>
    )
  } else { return (<p>No feedback given</p>) }

}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <>
      <div>
        <h1>Give feedback</h1>
        <Button handleClick={handleGoodClick} btnName="Good" />
        <Button handleClick={handleNeutralClick} btnName="Neutral" />
        <Button handleClick={handleBadClick} btnName="Bad" />

        <h1>Statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
      </div>


    </>
  )
}

export default App
