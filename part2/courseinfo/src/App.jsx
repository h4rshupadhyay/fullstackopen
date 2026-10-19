const Header = ({course}) => <h1>{course.name}</h1>

const Content = ({course}) => (
  <>
    {course.parts.map((x) => <Part key = {x.id} part={x} />)}
  </>
)

const Part = ({part}) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({course}) => <p>Number of exercises {course.parts.reduce((sum,x) => (sum + x.exercises),0)}</p>

const Course = ({course}) => {
  return <>
    <Header course={course} />
    <Content course={course} />
    <Total course={course}/>
  </>
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App
