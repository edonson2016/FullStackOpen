import Header from "./Header" 
import Content from "./Content"

const Course = ({ courses }) => {

   console.log(courses)
   return(
      <>
      <h1>Web Development Curriculum</h1>
      <Header course={courses[0].name}/>
      <Content parts={courses[0].parts}/>
      <Header course={courses[1].name}/>
      <Content parts={courses[1].parts}/>
      </>
   ) 
}

export default Course