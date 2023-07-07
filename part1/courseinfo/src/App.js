
import './App.css';

const Heading = (props) => {
  //  console.log(props.course.name);
  return (
    <h1>{props.coursename}</h1>
  )
}

const Content = (props) => {
  console.log(props);
  return (
    <>
      <Part part={props.content[0].name} exercises={props.content[0].exercises}/>
      <Part part={props.content[1].name} exercises={props.content[1].exercises}/>
      <Part part={props.content[2].name} exercises={props.content[2].exercises}/>
    </>
  )
}

const Total = (props) => {
  const totalExercises = props.total[0].exercises + props.total[1].exercises + props.total[2].exercises

  return(
    <p>Number of exercises {totalExercises}
    </p>
  )
}

const Part = ({part, exercises}) => {

  return(
    <p>
      {part} {exercises}
    </p>
  )
}

const App = () => {
  //const course = 'Half Stack application development'

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name:'Fundamentals of React',
        exercises:10
      },
      {
        name:'Using props to pass data',
        exercises:7
      },
      {
        name:'State of a component',
        exercises:14
      }
    ]
  }

  return (
    <div>
      <Heading coursename={course.name}/>
      <Content content={course.parts}/>
      <Total total={course.parts}/>
    </div>
  )
}

export default App;
