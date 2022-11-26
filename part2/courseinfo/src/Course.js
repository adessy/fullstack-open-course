const Course = ({course}) => {
  const nbExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);

  return (<div>
    <Header courseName={course.name}/>
    <Content parts={course.parts}/>
    <Total nbExercises={nbExercises}/>
  </div>);
}

const Header = ({courseName}) => <h2>{courseName}</h2>

const Content = (props) => (
  <div>
    {
      props.parts.map((part) => (
        <Part key={part.name} part={part.name} exercise={part.exercises}/>
      ))
    }
  </div>
)

const Part = (props) => (
  <p>{props.part} {props.exercise}</p>
)

const Total = (props) => (
  <p><b>Total of {props.nbExercises} exercises.</b></p>
)

export default Course;