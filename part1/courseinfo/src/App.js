const App = () => {
  const course = 'Half Stack application development'
  const exercises = [10, 7, 14]
  const parts = [
    'Fundamentals of React',
    'Using props to pass data',
    'State of a component',
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} exercises={exercises} />
      <Total nbExercises={exercises.reduce((a, b) => a + b, 0)} />
    </div>
  )
}

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Content = (props) => (
  <div> {
    props.parts.map((part, i) => (
      <Part key={i} part={part} exercise={props.exercises[i]} />
    ))
  } </div>
)

const Part = (props) => (
  <p>{props.part} {props.exercise}</p>
)

const Total = (props) => (
  <p>Number of exercises {props.nbExercises}</p>
)

export default App