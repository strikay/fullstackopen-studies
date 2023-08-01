const Heading = ({coursename}) => {
    return (
      <h1>{coursename}</h1>
    )
  }
  
  const Content = ({content}) => {
    return (
      <>
        {content.map(part => 
          <Part 
            key={part.id}
            part={part.name} 
            exercises={part.exercises}
          />
        )}
      </>
    )
  }
  
  const Total = ({parts}) => {
    const exercises = parts.map(part => part.exercises)
    const total = exercises.reduce((sum,current) => sum+current)
    return(
      <p>
        <b>
           total of {total} exercises
        </b>
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
  
  const Course = ({course}) => {
    return(
      <div>
        <Heading coursename={course.name}/>
        <Content content={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }

  export default Course