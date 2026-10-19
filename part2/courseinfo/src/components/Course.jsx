const Header = ({course}) => <h2>{course.name}</h2>

const Content = ({course}) => (
  <>
    {course.parts.map((x) => <Part key = {x.id} part={x} />)}
  </>
)

const Part = ({part}) => (<p>{part.name} {part.exercises}</p>)

const Total = ({course}) => <p><strong>Total of {course.parts.reduce((sum,x)  => (sum + x.exercises),0)} exercises </strong></p>

const Course = ({course}) => {
  return <>
    <Header course={course} />
    <Content course={course} />
    <Total course={course}/>
  </>
}
export default Course