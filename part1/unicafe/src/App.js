import './App.css';
import { useState } from 'react'

const Button = ({clickHandler, text}) => {
  return(
    <button onClick={clickHandler}>{text}</button>
  )
}

const StatisticsLine = ({text, value}) => {

  return(
    <tr>
      <td>{text} </td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, total, weightings}) => {
  let displayStatistics = false;
  let content = '';
  if(good !== 0 || neutral !==0 || bad !==0){
    displayStatistics = true;
  }

  content = displayStatistics ?
    <table>
      <tbody>
        <StatisticsLine text={'good'} value={good}/>
        <StatisticsLine text={'neutral'} value={neutral}/>
        <StatisticsLine text={'bad'} value={bad}/>
        <StatisticsLine text={'all'} value={total}/>
        <StatisticsLine text={'average'} value={calculateAverage(good,neutral,bad,weightings)}/>
        <StatisticsLine text={'positive'} value={calculatePositive(good,total)+'%'}/>
      </tbody>
    </table>
    : 
    <>
      <div>No Feedback Given</div>
    </>;

  return(
    <>
      <h1>Statistics</h1>
      {content}
    </>
  )
}

const calculateAverage = (good, neutral, bad, weightings) => {
  let total = good+neutral+bad;
  const { good:w_good, neutral:w_neutral, bad:w_bad } = weightings;

  return(
    ((good*w_good)+(neutral*w_neutral)+(bad*w_bad))/total
  )
}

const calculatePositive = (good, total) => {
  return (
    (good/total)*100
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good+bad+neutral; //tentative
  const weightings = {good:1, neutral:0, bad:-1}

  const handleBad = (e) => {
    setBad(bad+1)
  }
  const handleNeutral = (e) => {
    setNeutral(neutral+1)
  }
  const handleGood = (e) => {
    setGood(good+1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button 
        clickHandler={handleBad} 
        text={'bad'}
      />
      <Button 
        clickHandler={handleNeutral} 
        text={'neutral'}
      />
      <Button 
        clickHandler={handleGood} 
        text={'good'}
      />
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad} 
        total={total} 
        weightings={weightings}
      />
    </div>
  )
}
export default App;
