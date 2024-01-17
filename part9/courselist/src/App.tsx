const App = () => {

  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  
  interface CoursePartDescription extends CoursePartBase {
    description: string;
  }

  interface CoursePartBasic extends CoursePartDescription {
    kind: "basic"
  }
  
  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }
  
  interface CoursePartBackground extends CoursePartDescription {
    backgroundMaterial: string;
    kind: "background"
  }

  interface CoursePartsRequirements extends CoursePartDescription {
    requirements: string[]
    kind: "special"
  }
  
  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartsRequirements;
  
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  const courseName = "Half Stack application development";

  interface HeaderProps {
    courseName: string;
  }

  interface ContentProps {
    courseParts: CoursePart[]
  }

  interface TotalProps {
    courseParts: CoursePart[]
  }

  interface PartProps {
    coursePart: CoursePart
  }

  const Header = (props: HeaderProps) => {
    return <h1>{props.courseName}</h1>
  }

  const Part = (props: PartProps) => {

    const assertNever = (value: never): never => {
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
      );
    };

    const coursePart:CoursePart = props.coursePart;
    switch(coursePart.kind){
      case 'basic':
        return (
        <div>
          <div>
            <b>{coursePart.name} {coursePart.exerciseCount}</b>
          </div>
          <div>
            <i>{coursePart.description}</i>
          </div>
          <br/>
        </div>)
      case 'group':
        return (
        <div>
          <div>
            <b>{coursePart.name} {coursePart.exerciseCount}</b>
          </div>
          <div>project exercises{coursePart.groupProjectCount}</div>
          <br/>
        </div>)
      case 'background':
        return (
        <div>
          <div>
            <b>{coursePart.name} {coursePart.exerciseCount}</b>
          </div>          
          <i>{coursePart.description}</i>
          <div>{coursePart.backgroundMaterial}</div>
          <br/>
        </div>)
      case 'special':
        return (
          <div>
            <div>
              <b>{coursePart.name} {coursePart.exerciseCount}</b>
            </div>          
            <div><i>{coursePart.description}</i></div>
            <div>required skills: {coursePart.requirements.map((skill) => `${skill}, `)}</div>
            <br/>
          </div>)
      default:
        return assertNever(coursePart);
      }
  }

  const Content = (props: ContentProps) =>{
    const courseParts = props.courseParts;
    return (
      <div>
        {courseParts.map((part: CoursePart) => {
          return (
            <Part key={Math.random()*1000} coursePart={part}/>
          )
        })}
        
      </div>
    )
  }

  const Total = (props: TotalProps) => {
    const courseParts = props.courseParts;
    return (
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    )
  }

  return (
    <div>
      <Header courseName={courseName}/>
      <Content courseParts={courseParts}/>
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
