import {useState} from 'react'

const StatsLine = ({text, value, unit}) => (<tr>
  <td> {text} </td>
  <td> {value} {unit} </td>
</tr>);

const StatsTable = ({bad, neutral, good}) => {
  const nbVotes = good + neutral + bad;
  const average = (good - bad) / nbVotes;
  const positiveRatio = good / nbVotes;

  return (<table>
    <tbody>
    <StatsLine text='good' value={good}/>
    <StatsLine text='neutral' value={neutral}/>
    <StatsLine text='bad' value={bad}/>
    <StatsLine text='nbVotes' value={nbVotes}/>
    <StatsLine text='average' value={average}/>
    <StatsLine text='positive' value={positiveRatio * 100}/>
    <StatsLine text='good' value={good} unit={'%'}/>
    </tbody>
  </table>);
}

const Statistics = ({bad, neutral, good}) => (<div>
  <h1> Statistics </h1>

  {(bad + neutral + good) === 0 ? "No feedback given" : <StatsTable good={good} neutral={neutral} bad={bad}/>}
</div>);

const Button = ({text, onClick}) => <button onClick={onClick}> {text}</button>;

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const inc = n => n + 1
  const incGood = () => {
    setGood(inc)
  }
  const incNeutral = () => {
    setNeutral(inc)
  }
  const incBad = () => {
    setBad(inc)
  }

  return (<div>
    <div>
      <h1> Give feedback </h1>

      <div>
        <Button onClick={incGood} text='good'/>
        <Button onClick={incNeutral} text='neutral'/>
        <Button onClick={incBad} text='bad'/>
      </div>
    </div>

    <Statistics good={good} neutral={neutral} bad={bad}/>
  </div>)
}

export default App