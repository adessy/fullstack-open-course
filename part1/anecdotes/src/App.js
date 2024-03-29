import {useState} from 'react'

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
];

const App = () => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  return (
    <div>
      <TodayAnecdote selected={selected} setSelected={setSelected} votes={votes} setVotes={setVotes}/>
      <MostVotedAnecdote votes={votes}/>
    </div>
  )
}

const TodayAnecdote = ({selected, setSelected, votes, setVotes}) => {

  const vote = () => {
    setVotes(votes => {
      const newVotes = [...votes];
      newVotes[selected] += 1;
      return newVotes;
    })
  }

  return <div>
    <h1> Anecdote of the day </h1>
    <div>{anecdotes[selected]}</div>
    <div>has {votes[selected]} votes</div>
    <button onClick={vote}> vote</button>
    <RefreshButton setSelected={setSelected}/>
  </div>;
}

const RefreshButton = ({setSelected}) => {
  const refresh = () => setSelected(random(anecdotes.length));
  return <button onClick={refresh}> next anecdote</button>;
}

const random = (n) => Math.floor(Math.random() * n);

const MostVotedAnecdote = ({votes}) => {
  const maxVotes = Math.max(...votes)
  const mostVoted = anecdotes[votes.indexOf(maxVotes)]

  return <div>
    <h1>Anecdote with most votes</h1>
    <div>{mostVoted}</div>
    <div>has {maxVotes} votes</div>
  </div>;
}

export default App